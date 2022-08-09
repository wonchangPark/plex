<template>
  <div
    class="d-flex justify-center"
    v-if="streamManager"
    style="height: 100%; width: 100%"
  >
    <div
      :style="styleBound(pose1)"
    ></div>
    <ov-video :stream-manager="streamManager" />
    <div
      :style="styleBound(pose2)"
    ></div>
  </div>
</template>

<script>
import OvVideo from "./OvVideo";

export default {
  name: "UserVideo",

  components: {
    OvVideo,
  },

  props: {
    streamManager: Object,
    pose1: Number,
    pose2: Number,
  },

  computed: {
    clientData() {
      const { clientData } = this.getConnectionData();
      return clientData;
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
