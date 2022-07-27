<template>
  <div>
    <div id="phaser-div" class="phaser"></div>
  </div>
</template>

<script>
import Phaser from "phaser";
import Game from "../game/index";
export default {
  data() {
    return {
      game: null
    };
  },
  mounted() {
    console.log("start Phaser when mounted") ;
    window.Phaser = Phaser;

    this.game = new Game();
    console.log("this.game: ", this.game)
  },
  methods: {},
  watch: {},
  computed: {},
};
</script>

<style scoped>
.phaser {
  display: flex;
  background: grey;
}
</style>
