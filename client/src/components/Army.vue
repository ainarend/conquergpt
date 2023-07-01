<template>
  <CustomMarker :options="{ position, anchorPoint: 'BOTTOM_CENTER' }">
    <component :style='`width: ${markerSize}px; height: ${markerSize}px`' :is="component" />
  </CustomMarker>
</template>

<script>
import {CustomMarker} from "vue3-google-map";
import Army1 from './armies/Army1.vue';
import Army2 from './armies/Army2.vue';
import Army3 from './armies/Army3.vue';
import Army4 from './armies/Army4.vue';
import Army5 from './armies/Army5.vue';
import {useMapStore} from "@/store/map";
import {mapState} from "pinia";
export default {
  components: {
    CustomMarker,
    Army1,
    Army2,
    Army3,
    Army4,
    Army5,
  },
  props: {
    position: {
      type: Object,
      required: true,
    },
    component: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapState(useMapStore, {
      zoomLevel: 'zoomLevel',
    }),
    markerSize() {
      // return (60 / this.zoomLevel) * 10;
      return 50;
    },
  },
}
</script>