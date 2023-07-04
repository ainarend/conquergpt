<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Game Rules</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="setOpen(false)">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h1>Goal: Conquer the countries of the chatGPT</h1>
    <h2>Rules:</h2>
    <ul style="line-height: 1.5rem">
      <li>Turn based game</li>
      <li>In your turn you can only conquer one country at a time</li>
      <li>Attacked countries have to be neighbours</li>
      <li>In a battle for countries, dice rolls will determine the winner</li>
      <li>Attacker will have 2 dices, defender 1</li>
      <li>If attacker has higher values, attacker wins & claims country</li>
      <li>If values are draw or lower, defender wins & keeps country</li>
      <li>Game is won by either player once all countries of opponent are conquered</li>
    </ul>
  </ion-content>
</template>

<script>
export default {
  methods: {
    setOpen(open) {
      this.$emit('update:rulesModalOpen', open);
    }
  }
}
</script>
