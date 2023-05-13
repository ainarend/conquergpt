<template>
  <div class="speechbubble" :class="`speechbubble--${color}`">
    <p>
      <slot></slot>
    </p>
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
}
</style>