<template>
  <ion-app>
    <ion-page>
      <ion-header style="position: absolute; z-index: 10000">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button @click="showChat=!showChat" :auto-hide="false"></ion-menu-button>
          </ion-buttons>
          <ion-title>ConquerGPT | <span style="cursor: pointer" @click="setOpen(true)">Game Rules</span></ion-title>
          <ion-modal :is-open="rulesModalOpen">
            <GameRules @update:rulesModalOpen="setOpen" />
          </ion-modal>
        </ion-toolbar>
      </ion-header>
      <div class="page-layout" :class="{'no-chat': !chatIsShown}">
        <div class="chat" v-show="chatIsShown">
          <span class="scroll-start-at-top"></span>
          <div>
            <SpeechBubble
                v-for="(item, i) in log"
                :key="i"
                :index="i"
                :color="item.color"
                :user-name="item.userName"
                :message="item.message"
                :animate="!log.finishedAnimating && animateText"
            />
            <ion-toggle style="margin-top: 0.5rem" :checked="animateText" @ionChange="toggleAnimation">
              Show text animation
            </ion-toggle>
          </div>
        </div>
        <div class="content">
          <RollDice v-show="showDiceRoll" />
          <ion-router-outlet style="position: relative" />
        </div>
      </div>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToggle, IonToolbar, IonButtons, IonModal} from '@ionic/vue';
import RollDice from "@/components/RollDice.vue";
import {storeToRefs} from "pinia";
import {useBattleStore} from "@/store/battle";
import SpeechBubble from "@/components/SpeechBubble.vue";
import {computed, ref} from "vue";
import {GameStatuses, useGameStore} from "@/store/game";
import GameRules from "@/components/GameRules.vue";

const animateText = ref(false);
const toggleAnimation = ($e) => {
  animateText.value = $e.detail.checked;
};

const showChat = ref(window.innerWidth > 768);
const chatIsShown = computed(() => {
  if (showChat.value) {
    return true;
  }
  const windowWidth = window.innerWidth;
  const gameStatus = gameStore.status;
  if (windowWidth < 768) {
    if (gameStatus === GameStatuses.updatingLog ) {
      return true;
    }
    return false;
  }
  return showChat.value;
})

const gameStore = useGameStore();
const battleStore = useBattleStore();

const showDiceRoll = storeToRefs(battleStore).isOnGoing;

const log = gameStore.messages;

const rulesModalOpen = ref(false);
const setOpen = (isOpen: boolean) => {
  rulesModalOpen.value = isOpen;
}
</script>
<style scoped lang="scss">
$header-height: 56px;
.page-layout {
  display: grid;
  grid-template-columns: 300px auto;
  height: calc(100% - $header-height);
  margin-top: $header-height;
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
    position: relative;
  }
}
.no-chat {
  grid-template-columns: auto;
}
</style>
