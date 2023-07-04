<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button v-if="isPlayerAttacking" color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Start Battle</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    {{ attacker }} is attacking {{ defender }} in {{ countryUnderAttack.name }}
  </ion-content>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import {defineComponent, PropType} from 'vue';
import {Country} from "@/types/country";
import {WhoseTurn} from "@/store/game";

export default defineComponent({
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonInput },
  props: {
    attacker: String as PropType<WhoseTurn.chatGPT> | PropType<WhoseTurn.player>,
    defender: String as PropType<WhoseTurn.chatGPT> | PropType<WhoseTurn.player>,
    countryUnderAttack: Object as PropType<Country>,
  },
  computed: {
    isPlayerAttacking() {
      return this.attacker === WhoseTurn.player;
    },
  },
  methods: {
    cancel() {
      if (this.isPlayerAttacking) {
        return;
      }
      return modalController.dismiss(null, 'cancel');
    },
    confirm() {
      return modalController.dismiss(this.name, 'confirm');
    },
  },
});
</script>