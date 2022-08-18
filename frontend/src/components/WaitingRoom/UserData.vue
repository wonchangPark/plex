<template>
  <!-- <ContentBox :height="90" :width="100"> -->
    <div class="d-flex justify-center align-center" style="height:100%">

  <v-container style="width: 100%">
    <v-row>
      <v-col>
        <DataBox :number="userGameInfo ? userGameInfo.totalCnt : 0" string="게임"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userGameInfo ? userGameInfo.winCnt : 0" string="승"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userGameInfo ? userGameInfo.loseCnt : 0" string="패"></DataBox>
      </v-col>
    </v-row>
    <v-row v-if="userExercise.length !== 0">
      <v-col>
        <DataBox :number="userExercise.length === 2 ? userExercise[0].score + userExercise[1].score : userExercise[0].score" string="점수"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userExercise.length === 2 ?userExercise[0].score: (userExercise[0].gamecategoryName === 'squat' ? userExercise[0].score: 0)" string="스쿼트"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userExercise.length === 2 ? userExercise[1].score: (userExercise[0].gamecategoryName === 'lunge' ? userExercise[0].score: 0)" string="런지"></DataBox>
      </v-col>
    </v-row>
    <v-row v-if="userExercise.length === 0">
      <v-col>
        <DataBox :number="0" string="점수"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="0" string="스쿼트"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="0" string="런지"></DataBox>
      </v-col>
    </v-row>
  </v-container>
  <!-- </ContentBox> -->
    </div>
</template>

<script>
// import ContentBox from "../common/ContentBox.vue";
import DataBox from "@/components/WaitingRoom/Item/Data.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  name: "UserList",
  components: { DataBox },
  methods: {
    ...mapActions(['fetchExerciseInfo', 'fetchGameInfo'])
  },
  computed: {
    ...mapGetters(['userExercise', 'userGameInfo'])
  },
  created () {
    this.fetchExerciseInfo()
    this.fetchGameInfo()
  }
}
</script>

<style>

</style>