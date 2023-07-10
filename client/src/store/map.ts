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
        zoomLevel: 4,
    }),
    actions: {
        async init(payload: {map: any, api: any}) {
            this.map = payload.map;
            this.api = payload.api;

            this.map.addListener("click", async (mapsMouseEvent: any) => {
                console.log('clicked on map');
                const gameStore = useGameStore();
                if (gameStore.isLoading) {
                    return;
                }
                const geocoder = new this.api.Geocoder;

                const data =  await geocoder.geocode({location: mapsMouseEvent.latLng});

                const hasData = data.results.length > 0;
                if (hasData) {
                    for (const result of data.results) {
                        const addresses = result.address_components;
                        const address = addresses.find((address: any) => address.types.includes('country'));

                        const country = address?.long_name || false;

                        if (!country) {
                            continue;
                        }

                        return await gameStore.clickedOnCountry(country);
                    }
                }
            });
            this.map.addListener('zoom_changed', () => {
                this.zoomLevel = this.map.getZoom();
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
        drawArmies() {
            // todo
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