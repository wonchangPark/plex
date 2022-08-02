<template>
  <div class="rank-item d-flex flex-row justify-space-between align-center deepblue">
    <v-avatar class="ml-5" color="white" size="50"></v-avatar>
    <div class="white--text ranker-info">병아리 뿅뿅</div>
    <div class="white--text ranker-info">1340</div>
    <div class="mr-5 white--text ranker-info">#1</div>
  </div>
</template>

<script>
export default {
  name: 'RankItem',
  components: {
  },
  data() {
    return {
      rankers: [
        { 
          nick: '병아리뿅뿅',
          score: 1340,
          ranking: '#1'
        },
        {
          nick: '하늘보리냠냠',
          score: 1330,
          ranking: '#2'
        }
          ]
    }
  }
}
</script>

<style>
.rank-item{
  width: 90%;
  height: 95px;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.ranker-info{
  font-weight: bold;
  font-size: 1.5vw;
}
</style>