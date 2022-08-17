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
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{userGameInfo.totalCnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{userGameInfo.winCnt}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">{{userGameInfo.loseCnt}}</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">점수</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">스쿼트</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">런지</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-if="userExercise.length === 0">0</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else-if="userExercise.length === 1">{{userExercise[0].score}}</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else>{{userExercise[0].score + userExercise[1].score}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-if="userExercise.length === 0">0</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else-if="userExercise.length === 1 && userExercise[0].gamecategoryName === 'squat'">{{userExercise[0].score}}</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else-if="userExercise.length === 1 && userExercise[0].gamecategoryName === 'lunge'">0</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else>{{userExercise[0].score}}</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-if="userExercise.length === 0">0</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else-if="userExercise.length === 1 && userExercise[0].gamecategoryName === 'squat'">0</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else-if="userExercise.length === 1 && userExercise[0].gamecategoryName === 'lunge'">{{userExercise[0].cnt}}</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else>{{userExercise[1].score}}</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-center" cols="3">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">랭킹</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-if="myRanking.rank">#{{myRanking.rank}}</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else>unRanked</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-if="myRanking">{{myRanking.score}}</div>
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;" v-else></div>
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
      'userExercise',
      'userGameInfo',
      'getUser',
      'myRanking'
    ])
  },
  methods: {
    ...mapActions([
      'fetchExerciseInfo',
      'fetchGameInfo',
      'fetchMyRanking'
    ])
  },
  created(){
    this.fetchExerciseInfo(),
    this.fetchGameInfo(),
    this.fetchMyRanking(this.getUser.no)
  }
}
</script>

<style>

</style>