<template>
  <ion-app>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>ConquerGPT - rules</ion-title>
          <button @click="showChat=!showChat">{{ showChat ? 'Hide chat' : 'Show chat'}}</button>
        </ion-toolbar>
      </ion-header>
      <div class="page-layout" :class="{'no-chat': !showChat}">
        <div class="chat" v-if="showChat">
          <span class="scroll-start-at-top"></span>
          <div>
            <ion-toggle style="margin-bottom: 0.25rem" :checked="animateText" @ionChange="toggleAnimation">
              Show text animation
            </ion-toggle>
            <SpeechBubble
                v-for="(item, i) in log"
                :key="i"
                :index="i"
                :color="item.color"
                :user-name="item.userName"
                :message="item.message"
                :animate="animateText"
            />
          </div>
        </div>
        <div class="content">
          <RollDice v-if="showDiceRoll" />
          <ion-router-outlet style="position: relative" v-else />
        </div>
      </div>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonMenuToggle, IonMenu} from '@ionic/vue';
import RollDice from "@/components/RollDice.vue";
import {storeToRefs} from "pinia";
import {useBattleStore} from "@/store/battle";
import SpeechBubble from "@/components/SpeechBubble.vue";
import {ref} from "vue";
import {useGameStore} from "@/store/game";

const animateText = ref(false);
const toggleAnimation = ($e) => {
  animateText.value = $e.detail.checked;
};

const showChat = ref(true);

const gameStore = useGameStore();
const battleStore = useBattleStore();

const showDiceRoll = storeToRefs(battleStore).isOnGoing;

const log = gameStore.messages;
</script>
<style scoped lang="scss">
.page-layout {
  display: grid;
  grid-template-columns: 300px auto;
  height: 100%;
  width: 100%;
  .chat {
    background-color: #000;
    z-index: 1000;
    padding: 1rem;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    .scroll-start-at-top {
      flex: 1 1 0%;
    }
  }
  .content {

  }
}
.no-chat {
  grid-template-columns: auto;
}
</style>
