import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {GameStatuses, PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {usePlayerStore} from "@/store/player";
import {BattleResult} from "@/store/battle";
import {alertController} from "@ionic/vue";
import {findFirstNeighbour} from "@/country-neighbours";

export const usePlayerChatGPTStore = defineStore('playerChatGPT', {
    state: () => ({
        countries: [] as Country[],
        baseCountry: null as Country | null,
    }),
    actions: {
        async chooseBaseCountry() {
            const gameStore = useGameStore();
            const playerStore = usePlayerStore();

            const playerCountry = playerStore.countries.find(country => country.isBaseCountry).name;

            const json = await this.getAnswerFromChatGPT(`country?playerCountry=${playerCountry}`);

            const countryName = json.country;
            const { reasoning } = json;
            const country: Country = {
                name: countryName,
                army: gameStore.chooseRandomArmyComponent(),
                isBaseCountry: true,
            };
            this.baseCountry = country;
            await this.addCountry(country, reasoning);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.chatGPT});

            await gameStore.startGame();
        },
        async chooseNextCountry(countryNameWhichWasCheating?: string): Promise<void> {
            const gameStore = useGameStore();
            const playerStore = usePlayerStore();

            const countries = this.countries.map(country => country.name).join(',');
            const opponentCountries = playerStore.countries.map(country => country.name).join(',');

            const json = await this.getAnswerFromChatGPT(
                `next-country?countries=${countries}&opponentCountries=${opponentCountries}&countryWhichWasCheating=${countryNameWhichWasCheating}`
            );

            const countryName = json.country;
            if (await this.checkForCheating(countryName)) {
                return await this.chooseNextCountry(countryName);
            }

            let { reasoning } = json;

            if (gameStore.willNeedToBattleForCountry(countryName)) {
                const playerStore = usePlayerStore();

                const playerCountriesLeft = playerStore.countries.length;
                const confirmBattleJson = await this.getAnswerFromChatGPT(`confirm-battle?country=${countryName}&countriesLeft=${playerCountriesLeft}`);

                if (!confirmBattleJson.confirm) {
                    await gameStore.addMessage({
                        userName: WhoseTurn.chatGPT,
                        color: PlayerColors[WhoseTurn.chatGPT],
                        message: confirmBattleJson.reasoning,
                    })
                    return await this.chooseNextCountry();
                }

                await gameStore.addMessage({
                    userName: WhoseTurn.chatGPT,
                    color: PlayerColors[WhoseTurn.chatGPT],
                    message: confirmBattleJson.reasoning,
                });
                gameStore.setStatus(GameStatuses.playing);
                const battle = await gameStore.battleForCountry(countryName);

                const {comment} = await this.getAnswerFromChatGPT(`comment-on-battle?country=${countryName}&battleResult=${battle.result}&attackReasoning=${encodeURI(confirmBattleJson.reasoning)}`);

                if (battle.result === BattleResult.lost){
                    console.log('lost battle');
                    await gameStore.battleLost(battle, comment);
                    return;
                }

                // Moderator telling about winning the battle.
                await gameStore.addMessage({
                    userName: WhoseTurn.moderator,
                    color: PlayerColors[WhoseTurn.moderator],
                    message: `So, player's best roll was ${battle.diceResults.defender} and GPT's was ${battle.diceResults.attacker}. GPT won the battle for ${battle.forCountry}.`,
                });
                // Show the victory comment instead of why to conquer the country.
                reasoning = comment;

                playerStore.removeCountry(battle.forCountry);
                if (playerStore.countries.length === 0) {
                    return gameStore.setGameOver();
                }
            }

            const country: Country = {
                name: countryName,
                army: gameStore.chooseRandomArmyComponent(),
                isBaseCountry: true,
            };
            await this.addCountry(country, reasoning);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.chatGPT});

            await gameStore.changeTurnBetweenPlayers();
        },
        async addCountry(country: Country, reasoning: string) {
            const gameStore = useGameStore();
            await gameStore.addMessage({
                userName: WhoseTurn.chatGPT,
                color: PlayerColors[WhoseTurn.chatGPT],
                message: reasoning,
                finishedAnimating: false,
            })
            this.countries.push(country);
        },
        removeCountry(countryName: string) {
            this.countries = this.countries.filter(c => c.name !== countryName);
        },
        async getAnswerFromChatGPT(answerAbout: string) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}chatgpt/${answerAbout}`);
                const json = await response.json();
                return json;
            } catch (e) {
                console.error(`Unable to reach (or our server) chatGPT: ${e}`);
                const alert = await alertController.create({
                    header: 'Alert',
                    subHeader: 'Oh no',
                    message: 'Game was unable to reach chatGPT. No idea what happens now tbh.',
                    buttons: ['Let us see'],
                });

                await alert.present();
                return {};
            }
        },
        async checkForCheating(countryName: string) {
            const gameStore = useGameStore();
            if (
                gameStore.allowGptToCheat !== true
                && !findFirstNeighbour(countryName, this.countries.map(country => country.name))
            ) {
                const noCheatingMessage = `GPT tried to cheat by making a move on ${countryName} but it's not a neighbour of any of its countries.`;

                if (gameStore.allowGptToCheat === false) {
                    await gameStore.addMessage({
                        userName: WhoseTurn.moderator,
                        color: PlayerColors[WhoseTurn.moderator],
                        message: noCheatingMessage,
                    });
                    // The player has already been asked if they want to allow GPT to cheat.
                    return true;
                }

                const alert = await alertController.create({
                    header: 'Alert',
                    subHeader: `GPT tried to cheat, it tried to make a move on ${countryName} but it's not a neighbour of any of its countries.`,
                    message: `How do you want GPT to behave in this game?`,
                    buttons: [
                        {text: 'Piss off GPT, no more cheating', role: 'cancel'},
                        {text: 'Cheating is part of being able to think and gain an advantage', role: 'confirm'}
                    ],
                });

                await alert.present();
                const {role} = await alert.onDidDismiss();

                if (role === 'cancel') {
                    gameStore.setAllowGptToCheat(false);
                    await gameStore.addMessage({
                        userName: WhoseTurn.moderator,
                        color: PlayerColors[WhoseTurn.moderator],
                        message: noCheatingMessage,
                    });

                    // Allow GPT to try again.
                    return true;
                }
                gameStore.setAllowGptToCheat(true);
            }

            return false;
        }
    }
})