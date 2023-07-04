import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {usePlayerStore} from "@/store/player";
import {BattleResult} from "@/store/battle";

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
        async chooseNextCountry() {
            const gameStore = useGameStore();

            const countries = this.countries.map(country => country.name).join(',');

            const json = await this.getAnswerFromChatGPT(`next-country?countries=${countries}`);

            const countryName = json.country;
            const { reasoning } = json;

            if (gameStore.willNeedToBattleForCountry(countryName)) {
                if ((await gameStore.battleForCountry(countryName)) === BattleResult.lost) {
                    console.log('lost battle');
                    return;
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
        async getAnswerFromChatGPT(answerAbout: string) {
            const response = await fetch(`http://localhost:3000/chatgpt/${answerAbout}`);
            const json = await response.json();
            return json;
        }
    }
})