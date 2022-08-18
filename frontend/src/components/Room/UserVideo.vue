<template>
  <div
    class="d-flex justify-center"
    v-if="streamManager"
    style="height: 100%; width: 100%"
  >
    <div :style="styleBound(pose1)" :class="{ light: lightSignal }"></div>
    <ov-video :stream-manager="streamManager" />
    <div :style="styleBound(pose2)" :class="{ light: lightSignal }"></div>
  </div>
</template>

<script>
import OvVideo from "./OvVideo";

export default {
  name: "UserVideo",

  components: {
    OvVideo,
  },
  data() {
    return {
      lightSignal: false,
    };
  },

  props: {
    streamManager: Object,
    pose1: Number,
    pose2: Number,
    signal: Number,
  },

  computed: {
    clientData() {
      const { clientData } = this.getConnectionData();
      return clientData;
    },
  },
  watch: {
    signal() {
      this.lightSignal = true;
      setTimeout(() => {
        this.lightSignal = false;
      }, 500);
    },
  },
  methods: {
    getConnectionData() {
      const { connection } = this.streamManager.stream;
      return JSON.parse(connection.data.split("%/%")[0]);
    },
    styleBound(opacity) {
      return {
        width: "50%",
        height: "100%",
        background: `rgba(255, 255, 255, ${opacity})`,
      };
    },
  },
};
</script>
<style scoped>
.light {
  width: "50%";
  height: "100%";
  background: rgba(255, 255, 255, 1);
}
</style>
