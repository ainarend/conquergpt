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
          <ion-buttons slot="end">
            <ion-button @click="playAgain" :color="'medium'">
              Restart
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="page-layout" :class="{'no-chat': !chatIsShown}">
        <div class="sidebar" v-show="chatIsShown">
          <div class="chat">
            <span class="scroll-start-at-top"></span>
            <div class="unreverse-chat">
              <p style="font-size: 0.7rem">If you are new to the game, Game Rules can be found from the header.</p>
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
          <footer>
            <p>&copy; Ain Arend, 2023</p>
            <a target="_blank" href="https://github.com/ainarend/conquergpt">View code</a>
          </footer>
        </div>
        <div class="content">
          <GameOverResult v-if="isGameOver" :player-won="isGameWon" />
          <RollDice v-show="showDiceRoll" />
          <ion-router-outlet style="position: relative" />
        </div>
      </div>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonButtons,
  IonModal,
  alertController
} from '@ionic/vue';
import RollDice from "@/components/RollDice.vue";
import {storeToRefs} from "pinia";
import {useBattleStore} from "@/store/battle";
import SpeechBubble from "@/components/SpeechBubble.vue";
import {computed, ref} from "vue";
import {GameStatuses, useGameStore} from "@/store/game";
import GameRules from "@/components/GameRules.vue";
import GameOverResult from "@/components/GameOverResult.vue";

const animateText = ref(true);
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
const isGameWon = storeToRefs(gameStore).isGameWon;
const isGameLost = storeToRefs(gameStore).isGameLost;
const isGameOver = computed(() => {
  return isGameWon.value || isGameLost.value;
});

const log = gameStore.messages;

const rulesModalOpen = ref(false);
const setOpen = (isOpen: boolean) => {
  rulesModalOpen.value = isOpen;
}
const playAgain = async () => {
  const alert = await alertController.create({
    header: 'Alert',
    subHeader: 'Restart game',
    message: `Are you sure?`,
    buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'Restart', role: 'confirm'}],
  });

  await alert.present();
  const {role} = await alert.onDidDismiss();
  if (role === 'confirm') {
    gameStore.restart();
  }
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
  .sidebar {
    display: grid;
    grid-template-rows: auto 40px;
    background-color: #000;
    z-index: 1000;
    height: 100%;
    width: 100%;
    .chat {
      overflow-y: scroll;
      display: flex;
      flex-direction: column-reverse;
      padding: 0.5rem;
      .scroll-start-at-top {
        flex: 1 1 0%;
      }
    }
    footer {
      margin-top: auto;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      a {
        margin-left: 0.25rem;
        color: #fff;
      }
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
