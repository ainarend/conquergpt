<template>
  <div id="dice-box"></div>
</template>

<script setup lang="ts">
import {
  modalController,
} from '@ionic/vue';
import {onMounted, watch,} from "vue";
import {useBattleStore} from "@/store/battle";
import StartBattleModal from "@/components/StartBattleModal.vue";
import {storeToRefs} from "pinia";

const battleStore = useBattleStore();
const isOnGoingBattle = storeToRefs(battleStore).isOnGoing;

onMounted(async () => {
  battleStore.setReadyToRollDice();
});

watch(isOnGoingBattle, async (isOnGoingBattle) => {
  if (isOnGoingBattle) {
    const modal = await modalController.create({
      component: StartBattleModal,
      componentProps: {
        attacker: battleStore.attacker,
        defender: battleStore.defender,
        countryUnderAttack: battleStore.battlingForCountry,
      },
      keyboardClose: false,
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      battleStore.rollDice();
    }
  }
});
</script>

<style>
#dice-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-image: url(/assets/woodgrain2.jpg);
  background-size: cover;
}

#dice-box canvas {
  width: 100%;
  height: 100%;
}

#roll {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  cursor: pointer;
}
</style>