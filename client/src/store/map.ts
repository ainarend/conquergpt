import {defineStore} from "pinia";
import {useGameStore} from "@/store/game";

declare let google: any;

export const useMapStore = defineStore('map', {
    state: () => ({
        isReady: false,
        map: null,
        api: null,
        placeApi: null,
        featureLayer: null,
        countryPlaceMap: {} as any,
        placeIdToColorMap: {} as any,
    }),
    actions: {
        async init(payload: {map: any, api: any}) {
            this.map = payload.map;
            this.api = payload.api;

            this.map.addListener("click", async (mapsMouseEvent: any) => {
                const gameStore = useGameStore();
                if (gameStore.isLoading) {
                    return;
                }
                const geocoder = new this.api.Geocoder;

                const data =  await geocoder.geocode({location: mapsMouseEvent.latLng});

                const result = data.results && data.results[0];
                if (result) {
                    const addresses = result.address_components;
                    const address = addresses.find((address: any) => address.types.includes('country'));

                    const country = address.long_name || false;

                    await gameStore.clickedOnCountry(country);
                }
            });

            this.featureLayer = this.map.getFeatureLayer('COUNTRY')

            const {Place} = await google.maps.importLibrary("places");
            this.placeApi = Place;

            this.isReady = true;
        },
        async updateMapAfterCountryChoice(payload: {country: string, color: string}) {
            const {country, color} = payload;

            this.countryPlaceMap[country] = {};

            const countryInfo = await this.findBoundary(country);

            this.countryPlaceMap[country].placeId = countryInfo.placeId;
            this.countryPlaceMap[country].color = color;
            this.countryPlaceMap[country].location = countryInfo.location;

            this.moveMapToCountry(countryInfo.location);

            Object.keys(this.countryPlaceMap).forEach(countryName => {
              const countryPlaceInfo = this.countryPlaceMap[countryName];
              this.placeIdToColorMap[countryPlaceInfo.placeId] = countryPlaceInfo.color;
            })

            this.styleBoundary();
        },
        moveMapToCountry(countryNameOrLocation: any) {
            let location = countryNameOrLocation;
            if (typeof countryNameOrLocation === 'string') {
                location = this.countryPlaceMap[countryNameOrLocation].location;
            }
            this.map.setCenter(location);
        },
        async findBoundary(country: string): Promise<any> {
          const request = {
            query: country,
            fields: ['id', 'location'],
            includedType: 'country',
          };

          const { places } = await this.placeApi.searchByText(request);

          if (places.length) {
            const place = places[0];
            return {placeId: place.id, location: place.location};
          } else {
            console.log('No results');
            return false;
          }
        },
        styleBoundary() {
          // Define a style of transparent purple with opaque stroke.
          const styleFill = /** @type {!google.maps.FeatureStyleOptions} */({
            strokeOpacity: 1.0,
            strokeWeight: 3.0,
            fillOpacity: 0.5
          });

          // Define the feature style function.
          this.featureLayer.style = (params: any) => {
            if (this.placeIdToColorMap[params.feature.placeId]) {
              const color = this.placeIdToColorMap[params.feature.placeId];
              return {
                ...styleFill,
                strokeColor: color,
                fillColor: color,
              };
            }
          };
        }
    },
})