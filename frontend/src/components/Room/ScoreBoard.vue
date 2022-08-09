<template>
  <div class="d-flex justify-center align-center primary--text" style="width:100%; height:100%; font-size: 3vw;">
    {{score1}}:{{score2}}
  </div>
</template>

<script>
export default {
    name: "ScoreBoard",
    props:["score1","score2"]
}
</script>

<style>

</style>