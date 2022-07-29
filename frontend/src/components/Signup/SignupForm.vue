<template>
  <div id="signup-form">
    <form action="" method="">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="ID">아이디</label>
          </v-col>
          <v-col cols="5">
            <input id="ID"/>
          </v-col>
          <v-col cols="5">
          <div class="overlap d-flex align-center secondary--text"> 중복이 아닙니다 </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <label class="primary--text" for="nickname">닉네임</label>
          </v-col>
          <v-col cols="5">
            <input id="nickname"/>
          </v-col>
          <v-col cols="5">
          <div class="overlap d-flex align-center secondary--text"> 중복이 아닙니다 </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            <label class="primary--text" for="PW">PW</label>
          </v-col>
          <v-col cols="5">
            <input id="PW"/>
          </v-col>
          <v-col cols="1">
            <label class="primary--text" for="checkPW">PW확인</label>
          </v-col>
          <v-col cols="5">
            <input id="checkPW"/>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-center align-center">
        <v-btn color="primary" elevation="0" class="submit black--text">가입</v-btn>
      </div>    
    </form>
  </div>
</template>

<script>

export default {
  name: "LoginForm",
  components: {
  }
};
</script>

<style scoped>
#signup-form .submit {
  width: 20rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
#overlap{
  font-size: .9rem;
  font-weight: 400;
  line-height: 1.6;
  margin-left: 5%;
}
label{
  font-weight: bold;
  font-size: 16px;
}
input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 12px;
}
</style>
