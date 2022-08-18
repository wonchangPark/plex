<template>
<div style="width:100%; height:95%;">
  <div style="width:100%; height:10%;">
    <v-progress-linear
      :value="progress"
      color="amber"
      height="25"
    ></v-progress-linear>
  </div>
  <div class="d-flex justify-center align-center primary--text" style="width:100%; height:80%; font-size: 3vw;">
    {{countDown}}
  </div>
  <div style="width:100%; height:10%;">
    <v-progress-linear
      :value="progress"
      color="amber"
      height="25"
    ></v-progress-linear>
  </div>
</div>
</template>

<script>
export default {
  name: "CountDown",
  props:["countDown"],
  computed: {
    progress() {
      return this.countDown * 20
    },
  },
}
</script>

<style>

</style>