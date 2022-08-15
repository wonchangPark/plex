<template>
  <div class="rank-item d-flex flex-row justify-center align-center deepblue">
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-avatar class="ml-5" color="white" size="50">
          <img :src="require(`@/assets/profile/${rankerImg}.png`)" alt="profile">
        </v-avatar>
      </v-col>
      <v-col cols="4">
        <div class="white--text ranker-info">{{rankerNick}}</div>
      </v-col>
      <v-col cols="2">
        <div class="white--text ranker-info">{{rankerTotalScore}}</div>
      </v-col>
      <v-col cols="2">
        <div class="mr-5 white--text ranker-info">{{rankerRanking}}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'RankItem',
  components: {
  },
  props: ["rankerNick", "rankerTotalScore", "rankerRanking", "rankerImg"],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['rankingList'])
  }
}
</script>

<style>
.rank-item{
  width: 90%;
  height: 95px;
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.ranker-info{
  font-weight: bold;
  font-size: 1.5vw;
}
</style>