<template>
  <div class="d-flex justify-center align-center primary--text" style="width:100%; height:100%; font-size: 2vw;">
    {{nameList[0]}}:{{scoreList[nameList[0]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[1]}}:{{scoreList[nameList[1]]}}
    <br>
    {{nameList[2]}}:{{scoreList[nameList[2]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[3]}}:{{scoreList[nameList[3]]}}
    <br>
    {{nameList[4]}}:{{scoreList[nameList[4]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[5]}}:{{scoreList[nameList[5]]}}
  </div>
</template>

<script>
export default {
    name: "ScoreBoard",
    props:["nameList", "scoreList"]
}
</script>

<style>

</style>