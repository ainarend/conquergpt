import {defineStore} from "pinia";
import {Country} from "@/types/country";
import {useMapStore} from "@/store/map";
import {PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import {areCountriesNeighbours} from "@/country-neighbours";
import {alertController} from "@ionic/vue";
import {BattleResult} from "@/store/battle";
import {randomNumberFromARande} from "@/utils";

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
        }
    }
})