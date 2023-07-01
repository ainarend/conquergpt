import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {CONSTANTS} from "@/main";
import {usePlayerStore} from "@/store/player";


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

            const countryName = await this.getAnswerFromChatGPT(`country?playerCountry=${playerCountry}`);
            const country: Country = {
                name: countryName,
                army: gameStore.chooseRandomArmyComponent(),
                isBaseCountry: true,
            };
            this.baseCountry = country;
            await this.addCountry(country);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.chatGPT});

            await gameStore.startGame();
        },
        async addCountry(country: Country) {
            const gameStore = useGameStore();
            await gameStore.addMessage({
                userName: WhoseTurn.chatGPT,
                color: PlayerColors[WhoseTurn.chatGPT],
                message: `I choose ${country.name} as my country.`,
                finishedAnimating: false,
            })
            this.countries.push(country);
        },
        async getAnswerFromChatGPT(answerAbout: string) {
            const response = await fetch(`http://localhost:3000/chatgpt/${answerAbout}`);
            const data = await response.text();
            return data;
        }
    }
})