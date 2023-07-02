import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {GameStatuses, PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {CONSTANTS} from "@/main";
import {areCountriesNeighbours} from "@/country-neighbours";
import {alertController} from "@ionic/vue";
import {BattleResult} from "@/store/battle";


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
                if ((await gameStore.battleForCountry(countryName)) === BattleResult.lost){
                    return;
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
            const gameStore = useGameStore();
            await gameStore.addMessage({
                userName: WhoseTurn.player,
                color: PlayerColors[WhoseTurn.player],
                message: `I choose ${country.name} as my country.`,
                finishedAnimating: false,
            })
            this.countries.push(country);
        }
    }
})