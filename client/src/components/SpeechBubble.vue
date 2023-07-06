<template>
    <div class="speechbubble" :style="`border-color: ${color}`" :class="`speechbubble--${userName}`">
    <p :id="randomId"></p>
    <span class="username">{{ userName }}</span>
  </div>
</template>

<script>
import {useGameStore} from "@/store/game";

export default {
  props: {
    animate: {
      type: Boolean,
      required: true
    },
    index: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    randomId() {
      return this.userName + (Math.random() * 10000)
    }
  },
  setup() {
    const gameStore = useGameStore();
    return { gameStore };
  },
  data() {
    return {
      textIndex: 0
    }
  },
  mounted() {
    this.type();
  },
  methods: {
    type() {
      const typewriter = document.getElementById(this.randomId);
      const text = this.message;
      const longMessage = text.length > 75;
      const speedFactor = longMessage ? 15 : 30
      if (!this.animate) {
        typewriter.innerHTML = text;
        this.gameStore.setMessageAnimated(this.index);
        this.$emit('finished');
        return;
      }
      if (this.textIndex < text.length) {
        typewriter.innerHTML = text.slice(0, this.textIndex) + '<span class="blinking-cursor">|</span>';
        this.textIndex++;
        setTimeout(this.type, Math.random() * speedFactor + 50);
      } else {
        typewriter.innerHTML = text.slice(0, this.textIndex) + '<span class="blinking-cursor">|</span>';
        const cursor = typewriter.querySelector('.blinking-cursor');
        cursor.remove();
        this.$emit('finished');
        this.gameStore.setMessageAnimated(this.index);
      }
    }
  }
}
</script>

<style scoped lang="scss">
$color1 :     #161719;
$color2 :     #26272b;
$text : #ffffff;

.speechbubble {
  background-color: $color2;
  color: $text;
  font-size: .8em;
  line-height: 1;
  padding: 15px 25px;
  margin-bottom: 10px;
  cursor: default;
  &--player,
  &--chatGPT, {
    border-right: 5px solid;
  }
  &--moderator {
    border-left: 5px solid;
  }

  .username {
    display: inline;
    font-style: italic;
    float: right;
    &:before {
      content: '- ';
    }
  }
  .blinking-cursor {
    margin-left: 5px;
    background-color: #fff;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    50.1%, 100% {
      opacity: 0;
    }
  }
}
</style>