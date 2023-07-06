import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {GameStatuses, PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {areCountriesNeighbours} from "@/country-neighbours";
import {alertController} from "@ionic/vue";
import {BattleResult} from "@/store/battle";
import {randomNumberFromARande} from "@/utils";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";

export const usePlayerStore = defineStore('player', {
    state: () => ({
        countries: [] as Country[],
        baseCountry: null as Country | null,
    }),
    actions: {
        async chooseBaseCountry(countryName: string) {
            const gameStore = useGameStore();
            const country: Country = {
                name: countryName,
                army: gameStore.chooseRandomArmyComponent(),
                isBaseCountry: true,
            };
            this.baseCountry = country;
            await this.addCountry(country);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.player});

            await gameStore.playerHasChosenBaseCountry();
        },
        async clickedOnCountry(countryName: string) {
            const isNeighbour = this.countries.some(c => areCountriesNeighbours(c.name, countryName));

            if (!isNeighbour) {
                const alert = await alertController.create({
                    header: 'Alert',
                    subHeader: 'Wait, wait, wait',
                    message: `${countryName} is not a neighbour of any of your countries. Please choose a neighbour country.`,
                    buttons: ['Choose again'],
                });

                await alert.present();
                return false;
            }

            const gameStore = useGameStore();

            if (gameStore.willNeedToBattleForCountry(countryName)) {
                await gameStore.addMessage({
                    userName: WhoseTurn.player,
                    color: PlayerColors[WhoseTurn.player],
                    message: `Time to claim ${countryName} as my country, let's battle GPT!`,
                });
                gameStore.setStatus(GameStatuses.playing);

                const battle = await gameStore.battleForCountry(countryName);

                const playerGptStore = usePlayerChatGPTStore();
                const battleResultForGpt = battle.result === BattleResult.won ? BattleResult.lost : BattleResult.won;
                const {comment} = await playerGptStore.getAnswerFromChatGPT(
                    `comment-on-battle?country=${countryName}&battleResult=${battleResultForGpt}&attackReasoning=${encodeURI('Player attacked you')}`
                );

                if (battle.result === BattleResult.lost){
                    console.log('lost battle');
                    await gameStore.battleLost(battle, comment);
                    return;
                }

                // Moderator telling about winning the battle.
                await gameStore.addMessage({
                    userName: WhoseTurn.moderator,
                    color: PlayerColors[WhoseTurn.moderator],
                    message: `So, player rolled ${battle.diceResults.attacker} and GPT rolled ${battle.diceResults.defender}. You won the battle for ${battle.forCountry}.`,
                });
                // Add GPT comment on the loss of the country.
                await gameStore.addMessage({
                    userName: WhoseTurn.chatGPT,
                    color: PlayerColors[WhoseTurn.chatGPT],
                    message: comment,
                });

                playerGptStore.removeCountry(battle.forCountry);
                if (playerGptStore.countries.length === 0) {
                    return gameStore.setGameOver();
                }
            }

            const country: Country = {
                name: countryName,
                army: gameStore.chooseRandomArmyComponent(),
                isBaseCountry: false,
            };

            await this.addCountry(country);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.player});

            await gameStore.playerHasChosenACountry();
        },
        async addCountry(country: Country) {
            const messages = [
                'I selected',
                'I chose',
                'I picked',
                'I opted for',
                'I decided on',
                'I made my choice for',
                'I went with',
                'I settled on',
                'I elected to choose',
                'I determined to choose',
                'I singled out',
            ];
            const message = messages[randomNumberFromARande(0, messages.length - 1)];
            const gameStore = useGameStore();
            await gameStore.addMessage({
                userName: WhoseTurn.player,
                color: PlayerColors[WhoseTurn.player],
                message: `${message} ${country.name} as my country.`,
                finishedAnimating: false,
            })
            this.countries.push(country);
        },
        removeCountry(countryName: string) {
            this.countries = this.countries.filter(c => c.name !== countryName);
        },
    }
})