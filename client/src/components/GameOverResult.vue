<template>
  <ion-modal :isOpen="confettiDone" ref="modal" :enter-animation="enterAnimation" @willDismiss="playAgain">
    <div class="modal">
      <template v-if="playerWon">
        <h3>Congrats!</h3>
        <h1>You won!</h1>
      </template>
      <template v-else>
        <h3>Oh no!</h3>
        <h1>You lost!</h1>
        <img src="https://i.giphy.com/media/9Y5BbDSkSTiY8/giphy.webp" alt="You lost!" />
      </template>
      <SpeechBubble
          v-if="gptMessage.message"
          style="width: 300px"
          :message="gptMessage.message"
          :user-name="gptMessage.userName"
          :color="gptMessage.color"
          :index="gptMessage.index"
          :animate="gptMessage.animate"
      />
      <template v-if="playerWon">
        <p style="text-align: center">You managed to beat GPT in <strong>{{ turnNumber }}</strong> turns!<br /> Think you can do better?</p>
      </template>
      <template v-else>
        <p style="text-align: center">GPT out maneuvered you in <strong>{{ turnNumber }}</strong> turns!<br /> Think you can do better?</p>
      </template>
      <ion-button @click="playAgain">Play Again</ion-button>
    </div>
  </ion-modal>
</template>

<script>
import confetti from 'canvas-confetti';
import {
  createAnimation,
  IonModal,
} from '@ionic/vue';
import {PlayerColors, useGameStore, WhoseTurn} from "@/store/game";
import SpeechBubble from "@/components/SpeechBubble.vue";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {mapWritableState} from "pinia";

const confettiLengthInSeconds = 3;
export default {
  components: {
    IonModal,
    SpeechBubble,
  },
  props: {
    playerWon: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      confettiDone: false,
      gptMessage: {
        message: null,
        userName: WhoseTurn.chatGPT,
        color: PlayerColors.chatGPT,
        animate: true,
        index: 0,
      }
    }
  },
  async mounted() {
    if (this.playerWon) {
      this.showConfetti();
    } else {
      this.confettiDone = true;
    }
    
    const resultForGpt = this.playerWon ? 'lost' : 'won';
    
    const playerGptStore = usePlayerChatGPTStore();
    const json = await playerGptStore.getAnswerFromChatGPT(`comment-on-game?result=${resultForGpt}`);
    if (json) {
      this.gptMessage.message = json.message;
    }
  },
  computed: {
    ...mapWritableState(useGameStore, ['turnNumber']),
  },
  methods: {
    showConfetti() {
      // do this for 30 seconds
      const duration = confettiLengthInSeconds * 1000;
      const end = Date.now() + duration;
      const that = this;

      (function frame() {
        // launch a few confetti from the left edge
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
        // and launch a few from the top edge
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { y: 0 }
        });
        // and launch a few from the bottom edge
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { y: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          that.confettiDone = true;
        }
      }());
    },
    enterAnimation(baseEl) {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
          .addElement(root.querySelector('ion-backdrop'))
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
          .addElement(root.querySelector('.modal-wrapper'))
          .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
          ]);

      return createAnimation()
          .addElement(baseEl)
          .easing('ease-in')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
    },
    playAgain() {
      useGameStore().restart();
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>