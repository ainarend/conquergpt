<template>
  <ion-loading :isOpen="loading" />
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
        :clickable-icons="false"
        :styles="mapStyles"
        version="beta"
        ref="mapRef"
    >
      <Army
          v-for="(army, key) in armies"
          :key="`${key}${army.component}`"
          :component="army.component"
          :position="army.position"
      />
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import {GoogleMap} from "vue3-google-map";
import {IonLoading} from '@ionic/vue';
import {computed, ref, watch} from "vue";
import {useGameStore} from "@/store/game";
import {storeToRefs} from "pinia";
import Army from "@/components/Army.vue";
import {useMapStore} from "@/store/map";
import {usePlayerStore} from "@/store/player";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {Country} from "@/types/country";

const mapRef = ref(null);

const gameStore = useGameStore();
const mapStore = useMapStore();
const playerStore = usePlayerStore();
const playerChatGPTStore = usePlayerChatGPTStore();

const loading = storeToRefs(gameStore).isLoading;

watch(() => mapRef.value?.ready, async (ready) => {
  if (!ready) return;

  gameStore.setupGame({
    mapData: {
      map: mapRef.value.map,
      api: mapRef.value.api,
    },
  });
});


const armies = computed(() => {
  const armies: any[] = [];
  const pushArmies = (country: Country) => {
    if (!mapStore.countryPlaceMap[country.name]) {
      return;
    }
    armies.push(
        {
          position: mapStore.countryPlaceMap[country.name].location,
          component: country.army,
        }
    );
  };
  playerStore.countries.forEach(pushArmies);
  playerChatGPTStore.countries.forEach(pushArmies);
  return armies;
})

// @todo: get the defaults from the store.
const center = { lat: 58.2, lng: 25.044502 };
const zoom = 4;
const mapStyles = [
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
</script>

<style scoped>
#container {
  width: 100%; height: 100%;
}
</style>
