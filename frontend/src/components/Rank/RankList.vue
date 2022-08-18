<template>
  <v-container class="d-flex flex-column justify-center" style="flex: 1 1 100%; height:100%">
      <v-row class="rank-content d-flex align-self-center" justify="center" align="center" style="width:90%;">
        <v-col cols="4">
        </v-col>
        <v-col cols="4">
          <div class="primary--text rank-label">닉네임</div>
        </v-col>
        <v-col cols="2">
          <div class="primary--text rank-label">점수</div>
        </v-col>
        <v-col cols="2">
          <div class="primary--text rank-label">순위</div>
        </v-col>
      </v-row>

    <div class="rank-list-box d-flex flex-column" style="flex: 0 0 90%; width:100%; height: 90%;">
      <div v-for="ranker in rankingList"
      :key="ranker.userNo"
      :ranker = ranker
      >
      <div class="d-flex justify-center align-center">
        <RankItem :rankerNick="ranker.userNick" :rankerRanking="ranker.rank" :rankerTotalScore="ranker.score" :rankerImg="ranker.userImage"></RankItem>
      </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import RankItem from "@/components/Rank/RankItem.vue"
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'RankList',
  components: {
    RankItem
  },
  methods: {
    ...mapActions(['fetchRankingList'])
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'rankingList'])
  },
  created(){
    this.fetchRankingList()
  }
}
</script>

<style>
.rank-list{
  width:100%;
  height: 100%;
}
.rank-label{
  font-size: 1.5rem;
  font-weight: bold;
}
.rank-list-box{
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
}
.rank-list-box::-webkit-scrollbar{
  display: none;
}
</style>