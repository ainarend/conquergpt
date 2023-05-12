<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>ConquerGPT</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-loading :isOpen="loading" />

      <ion-split-pane when="xs" contentId="main">
        <div class="ion-page" id="main">
          <div id="container">
            <GoogleMap
                api-key="AIzaSyDcqAkPYc4FjtgyjNSyEep8o7Z8N7uEOVo"
                mapId="de7ff59bf0c6379d"
                style="width: 100%; height: 100%"
                :center="center"
                :zoom="zoom"
                :fullscreen-control="false"
                :map-type-control="false"
                :street-view-control="false"
                version="beta"
                ref="mapRef"
            >
            </GoogleMap>
          </div>
        </div>

        <ion-menu contentId="main">
          <ion-header>
            <ion-toolbar color="tertiary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ul>
              <li v-for="(item, i) in log" :key="i">{{ item }}</li>
            </ul>
          </ion-content>
        </ion-menu>
      </ion-split-pane>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from "vue3-google-map";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/vue';
import {ref, watch} from "vue";

const loading = ref(true);
const mapRef = ref(null);
const log = ref(['Welcome, setting up game']);

watch(() => mapRef.value?.ready, async (ready) => {
  if (!ready) return;

  loading.value = false;

  const ref = mapRef.value;

  const map = ref.map;
  const api = ref.api;

  const myColor = 'green';
  const opponentColor = 'red';
  const countryPlaceMap: any = {};
  const placeIdToColorMap: any = {};

  const featureLayer = map.getFeatureLayer('COUNTRY');

  const {Place} = await google.maps.importLibrary("places");

  await delay(3000);

  const myChoice = 'Estonia';
  countryPlaceMap[myChoice] = {};
  countryPlaceMap[myChoice].placeId = await findBoundary(myChoice);
  countryPlaceMap[myChoice].color = myColor;
  pushToLog(`You chose: ${myChoice}`);

  Object.keys(countryPlaceMap).forEach(countryName => {
    const country = countryPlaceMap[countryName];
    placeIdToColorMap[country.placeId] = country.color;
  })

  styleBoundary();
  await delay(1300);
  pushToLog(`Asking ChatGPT to choose`);
  await delay(3000);
  loading.value = true;
  const opponentChoice = 'Lithuania';
  await delay(3000);
  loading.value = false;
  pushToLog(`ChatGPT chose: ${opponentChoice}`);

  countryPlaceMap[opponentChoice] = {};
  countryPlaceMap[opponentChoice].placeId = await findBoundary(opponentChoice);
  countryPlaceMap[opponentChoice].color = opponentColor;

  Object.keys(countryPlaceMap).forEach(countryName => {
    const country = countryPlaceMap[countryName];
    placeIdToColorMap[country.placeId] = country.color;
  })

  styleBoundary();

  async function findBoundary(country) {
    const request = {
      query: country,
      fields: ['id', 'location'],
      includedType: 'country',
    };

    const { places } = await Place.searchByText(request);

    if (places.length) {
      const place = places[0];
      return place.id;
    } else {
      console.log('No results');
      return false;
    }
  }

  function styleBoundary() {
    // Define a style of transparent purple with opaque stroke.
    const styleFill = /** @type {!google.maps.FeatureStyleOptions} */({
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillOpacity: 0.5
    });

    // Define the feature style function.
    featureLayer.style = (params) => {
      if (placeIdToColorMap[params.feature.placeId]) {
        const color = placeIdToColorMap[params.feature.placeId];
        return {
          ...styleFill,
          strokeColor: color,
          fillColor: color,
        };
      }
    };
  }

  function pushToLog(message) {
    log.value.push(message);
  }
  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});

const center = { lat: 58.2, lng: 25.044502 };
const zoom = 4;
</script>

<style scoped>
#container {
  width: 100%; height: 100%;
}
</style>
