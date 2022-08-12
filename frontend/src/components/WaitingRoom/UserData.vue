<template>
  <ContentBox :height="90" :width="80">
  <v-container >
    <v-row>
      <v-col>
        <DataBox :number="userGameInfo.totalCnt ? userGameInfo.totalCnt : 0" string="게임"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userGameInfo.winCnt ? userGameInfo.winCnt : 0" string="승"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userGameInfo.loseCnt ? userGameInfo.loseCnt : 0" string="패"></DataBox>
      </v-col>
    </v-row>
    <v-row v-if="userExercise.length">
      <v-col>
        <DataBox :number="userExercise[0].cnt + userExercise[1].cnt" string="운동"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userExercise[0].cnt" string="스쿼트"></DataBox>
      </v-col>
      <v-col>
        <DataBox :number="userExercise[1].cnt" string="달리기"></DataBox>
      </v-col>
    </v-row>
  </v-container>
  </ContentBox>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import DataBox from "@/components/WaitingRoom/Item/Data.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  name: "UserList",
  components: { ContentBox, DataBox },
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