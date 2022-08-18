<template>
  <div class="information-box d-flex" style="flex: 1">
    <ContentBox :height="100" :width="80">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <label class="primary--text" for="nickname">닉네임</label>
          </v-col>
          <v-col cols="11">
            <div class="nickname white--text">{{ getUser.nick }}</div>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <label class="primary--text" for="introducing">게임정보</label>
          </v-col>
          <v-col cols="11">
            <GameInfoBox></GameInfoBox>
          </v-col>
        </v-row>
      </v-container>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"
import GameInfoBox from "@/components/Mypage/GameInfoBox.vue"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "InformationBox",
  components: {
    ContentBox,
    GameInfoBox
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'getUser',
      'authHeader',
    ])
  },
  methods: {
    ...mapActions([
      'fetchUserInfo'
    ])
  },
  created(){
    this.fetchUserInfo()
  }
}
</script>

<style>
.nickname{
  font-weight: bold;
  font-size: 1.5rem;
}
.information-box .submit {
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
.information-box label{
  font-weight: bold;
  font-size: 1.5rem;
}
.information-box input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 1.2rem;
}
.information-box textarea{
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 1.2rem;
  resize: none;
}
.my-ranking div{
  font-weight: bold;
}
</style>