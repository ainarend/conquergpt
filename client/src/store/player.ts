import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {GameStatuses, PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {CONSTANTS} from "@/main";


export const usePlayerStore = defineStore('player', {
    state: () => ({
        countries: [] as Country[],
        baseCountry: null as Country | null,
    }),
    actions: {
        async chooseBaseCountry(countryName: string) {
            const country: Country = {
                name: countryName,
                armies: CONSTANTS.DEFAULT_NUMBER_OF_ARMIES,
                isBaseCountry: true,
            };
            this.baseCountry = country;
            await this.addCountry(country);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.player});

            const gameStore = useGameStore();
            await gameStore.playerHasChosenBaseCountry();
        },
        async clickedOnCountry(countryName: string) {
            const country: Country = {
                name: countryName,
                armies: CONSTANTS.DEFAULT_NUMBER_OF_ARMIES,
                isBaseCountry: false,
            };
            await this.addCountry(country);

            const mapStore = useMapStore();
            await mapStore.updateMapAfterCountryChoice({country: countryName, color: PlayerColors.player});
        },
        async addCountry(country: Country) {
            const gameStore = useGameStore();
            await gameStore.addMessage({
                userName: WhoseTurn.player,
                color: PlayerColors[WhoseTurn.player],
                message: `I choose ${country.name} as my country.`,
                finishedAnimating: false,
            })
            gameStore.setStatus(GameStatuses.choosingCountries);
            this.countries.push(country);
        }
    }
})