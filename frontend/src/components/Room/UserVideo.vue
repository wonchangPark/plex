<template>
  <div
    class="d-flex justify-center"
    v-if="streamManager"
    style="height: 100%; width: 100%"
  >
<<<<<<< HEAD
    <div
      :style="styleBound(pose1)"
    ></div>
    <ov-video :stream-manager="streamManager" />
    <div
      :style="styleBound(pose2)"
    ></div>
=======
    <div :style="styleBound(pose1)" :class="{ light: lightSignal }"></div>
    <ov-video :stream-manager="streamManager" />
    <div :style="styleBound(pose2)" :class="{ light: lightSignal }"></div>
>>>>>>> 813c21c73d7bd94f58fabcfc1076e0e973834837
  </div>
</template>

<script>
import OvVideo from "./OvVideo";

export default {
  name: "UserVideo",

  components: {
    OvVideo,
  },
<<<<<<< HEAD
=======
  data() {
    return {
      lightSignal: false,
    };
  },
>>>>>>> 813c21c73d7bd94f58fabcfc1076e0e973834837

  props: {
    streamManager: Object,
    pose1: Number,
    pose2: Number,
<<<<<<< HEAD
=======
    signal: Number,
>>>>>>> 813c21c73d7bd94f58fabcfc1076e0e973834837
  },

  computed: {
    clientData() {
      const { clientData } = this.getConnectionData();
      return clientData;
    },
  },
<<<<<<< HEAD

=======
  watch: {
    signal() {
      this.lightSignal = true;
      setTimeout(() => {
        this.lightSignal = false;
      }, 500);
    },
  },
>>>>>>> 813c21c73d7bd94f58fabcfc1076e0e973834837
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
<<<<<<< HEAD
=======
<style scoped>
.light {
  width: "50%";
  height: "100%";
  background: rgba(255, 255, 255, 1);
}
</style>
>>>>>>> 813c21c73d7bd94f58fabcfc1076e0e973834837
