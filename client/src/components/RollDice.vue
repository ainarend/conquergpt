<template>
  <div id="dice-box"></div>
</template>

<script setup lang="ts">
import {
  modalController,
} from '@ionic/vue';
import { onMounted,} from "vue";
import DiceBox from "@3d-dice/dice-box";;

onMounted(()=> {
  const Box = new DiceBox("#dice-box", {
    assetPath: "/assets/",
    theme: "default",
    offscreen: true,
    scale: 6
  });

  Box.init().then(async () => {
    Box.roll([{
      sides: 6,
      themeColor: "#679b68",
      qty: 2,
    },{
      sides: 6,
      themeColor: "#ff0000",
      qty: 1,
    }]);
    Box.onRollComplete = (results) => {
      console.log(results);
    }
  });
});


const cancel = () => {
  modalController.dismiss('asdasd', 'cancel');
}
const confirm = () => {
  modalController.dismiss('asd', 'confirm');
}
</script>

<style>
#dice-box {
  position: relative;
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