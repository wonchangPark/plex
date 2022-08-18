<template>
  <div class="d-flex justify-center align-center primary--text" style="width:100%; height:100%; font-size: 1.5vw;">
    <!-- {{nameList[0]}}:{{scoreList[nameList[0]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[1]}}:{{scoreList[nameList[1]]}}
    <br>
    {{nameList[2]}}:{{scoreList[nameList[2]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[3]}}:{{scoreList[nameList[3]]}}
    <br>
    {{nameList[4]}}:{{scoreList[nameList[4]]}}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {{nameList[5]}}:{{scoreList[nameList[5]]}} -->
    <div class="d-flex flex-column">
        <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">
            <div class="d-flex flex-column align-center">
                <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="(player) in col1" v-bind:key="player">{{ player.name }} : {{player.score}}</div>
                <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-flex flex-column align-center">
                <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="(player) in col2" v-bind:key="player">{{ player.name }} : {{player.score}}</div>
                <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
            </div>
        </div>
    </div>
  </div>
  
</template>

<script>
export default {
    name: "ScoreBoard",
    props:["nameList", "scoreList"],
    computed: {
      col1 () {
        const column1 = []
        for (let i = 0; i < this.nameList.length; i++) {
          if (i % 2 === 0) {
            column1.push({name: this.nameList[i], score: this.scoreList[this.nameList[i]]})
          }
        }
        return column1
      },
      col2 () {
        const column2 = []
        for (let i = 0; i < this.nameList.length; i++) {
          if (i % 2 !== 0) {
            column2.push({name: this.nameList[i], score: this.scoreList[this.nameList[i]]})
          }
        }
        return column2
      }
    }
}
</script>

<style>

</style>