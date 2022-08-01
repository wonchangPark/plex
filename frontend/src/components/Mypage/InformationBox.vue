<template>
  <div class="information-box">
    <ContentBox :height="80" :width="40">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="10">
            <label class="primary--text" for="nickname">닉네임</label>
          </v-col>
          <v-col cols="5">
            <input id="nickname" :placeholder="user.nickname"/>
          </v-col>
          <v-col cols="3">
            <div class="overlap d-flex align-center secondary--text"> 중복이 아닙니다 </div>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" elevation="0" class="submit black--text">수정</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="10">
            <label class="primary--text" for="introducing">자기소개</label>
          </v-col>
          <v-col cols="8">
            <v-textarea/>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" elevation="0" class="submit black--text">저장</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="2">
            <label class="primary--text" for="introducing">랭킹</label>
          </v-col>
          <v-col cols="5" justify="center" align="center" class="my-ranking secondary--text">
            <v-card color="#28363F" flat>
              <div class="secondary--text">#1 2300</div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-btn text>
            <router-link to="/rank">전체랭킹보기</router-link>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"

export default {
  name: "InformationBox",
  component: {
  },
  components: {
    ContentBox
  },
  data () {
    return {
      user: {
        nickname: '병아리뿅뿅',
        rank: "#1",
        score: "2305"
      }
    }
  },
}
</script>

<style>
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
  font-size: 1rem;
}
.information-box textarea{
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 1rem;
  resize: none;
}
.my-ranking div{
  font-weight: bold;
}
</style>