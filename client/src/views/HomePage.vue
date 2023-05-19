<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>ConquerGPT - rules</ion-title>
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
            <ion-toggle style="margin-bottom: 0.25rem" :checked="animateText" @ionChange="toggleAnimation">Show text animation</ion-toggle>
            <SpeechBubble
                v-for="(item, i) in log"
                :key="i"
                :index="i"
                :color="item.color"
                :user-name="item.userName"
                :message="item.message"
                :animate="animateText"
            />
          </ion-content>
        </ion-menu>
      </ion-split-pane>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {GoogleMap} from "vue3-google-map";
import {IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonToggle} from '@ionic/vue';
import {ref, watch} from "vue";
import SpeechBubble from "@/components/SpeechBubble.vue";
import {useGameStore} from "@/store/game";
import {storeToRefs} from "pinia";

const mapRef = ref(null);
const animateText = ref(true);

const gameStore = useGameStore();
const log = gameStore.messages;
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

const toggleAnimation = ($e) => {
  animateText.value = $e.detail.checked;
};

const center = { lat: 58.2, lng: 25.044502 };
const zoom = 4;
</script>

<style scoped>
#container {
  width: 100%; height: 100%;
}
</style>
