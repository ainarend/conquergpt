<template>
  <div class="speechbubble" :class="`speechbubble--${color}`">
    <p :id="randomId"></p>
    <span class="username">{{ userName }}</span>
  </div>
</template>

<script>
export default {
  props: {
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
  data() {
    return {
      index: 0
    }
  },
  mounted() {
    this.type();
  },
  methods: {
    type() {
      const typewriter = document.getElementById(this.randomId);
      const text = this.message;
      if (this.index < text.length) {
        typewriter.innerHTML = text.slice(0, this.index) + '<span class="blinking-cursor">|</span>';
        this.index++;
        setTimeout(this.type, Math.random() * 50 + 50);
      } else {
        typewriter.innerHTML = text.slice(0, this.index) + '<span class="blinking-cursor">|</span>';
        this.$emit('finished');
      }
    }
  }
}
</script>

<style scoped lang="scss">
$color1 :     #161719;
$color2 :     #26272b;
$text :       #9fa2a7;
$highlight1 : #0b702b;
$highlight2 : #e00140;
$highlight3 : #ff8750;

.speechbubble {
  background-color: $color2;
  color: $text;
  font-size: .8em;
  line-height: 1;
  padding: 15px 25px;
  margin-bottom: 10px;
  cursor: default;
  &--green,
  &--red, {
    border-right: 5px solid;
  }

  &--green {
    border-color: $highlight1;
  }

  &--red {
    border-color: $highlight2;
  }

  &--orange {
    border-left: 5px solid;
    border-color: $highlight3;
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