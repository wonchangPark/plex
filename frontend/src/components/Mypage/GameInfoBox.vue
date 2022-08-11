<template>
  <div class="game-info-box">
    <v-card class="align-center" color="deepblue">
      <v-list-item-content class="align-center justify-center">
        <v-container class="d-flex flex-column justify-center">
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">게임</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">승</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">패</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{totalGameList.totalCnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{totalGameList.winCnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{totalGameList.loseCnt}}</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">운동</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">스쿼트</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">달리기</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{exerciseList[0].cnt + exerciseList[1].cnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{exerciseList[0].cnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{exerciseList[1].cnt}}</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-center" cols="3">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">랭킹</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">#{{myRanking.rank}}</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{myRanking.score}}</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <v-btn text>
                <router-link to="/rank">전체랭킹보기</router-link>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GameInfoBox',
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'authHeader',
      'exerciseList',
      'totalGameList',
      'getUser',
      'myRanking'
    ])
  },
  methods: {
    ...mapActions([
      'fetchExercise',
      'fetchTotalGame',
      'fetchMyRanking'
    ])
  },
  created(){
    this.fetchExercise(),
    this.fetchTotalGame(),
    this.fetchMyRanking(this.getUser.no)
  }
}
</script>

<style>

</style>