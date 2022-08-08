<template>
  <div id="signup-form" class="d-flex flex-column" style="flex: 1">
    <form @submit.prevent="signupSubmit()">
      <v-container >
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="ID">아이디</label>
          </v-col>
          <v-col cols="4">
            <input id="ID" type="text" @blur="idCheck(credentials)" v-model="credentials.id" required
            maxlength="20"/>
          </v-col>
          <v-col cols="5">
            <span class="check error--text" v-if="!idFlag">사용 불가능한 아이디 입니다.</span>
            <span class="check secondary--text" v-if="idFlag">사용 가능 아이디 입니다.</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="PW">PW</label>
          </v-col>
          <v-col cols="9">
            <input id="PW" type="password" 
            v-model="credentials.password" 
            required
            minlength="6"/>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="checkPW">PW 확인</label>
          </v-col>
          <v-col cols="4">
            <input id="checkPW" type="password" 
            v-model="credentials.password2" 
            required
            @blur="passwordCheckValid"/>
          </v-col>
          <v-col cols="5">
            <span class="check error--text"
              v-if="!passwordCheckFlag">비밀번호를 확인해 주세요</span>
            <span class="check secondary--text" v-if="passwordCheckFlag">비밀번호가 확인되었습니다.</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="nickname">닉네임</label>
          </v-col>
          <v-col cols="4">
            <input id="nickname" @blur="nicknameCheck(credentials)" v-model="credentials.nick" type="text" required />
          </v-col>
          <v-col cols="5">
           <span class="check error--text" v-if="!nicknameFlag">사용 불가능한 닉네임 입니다.</span>
            <span class="check secondary--text" v-if="nicknameFlag">사용 가능한 닉네임 입니다.</span>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-center align-center">
        <v-btn color="primary" elevation="0" class="submit black--text" type="submit">가입</v-btn>
      </div>    
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "SignupForm",
  components: {
  },
  data() {
    return {
      credentials: {
        id: '',
        nick: '',
        password: '',
        password2: '',
      },
      passwordCheckFlag : false,
      pwShow: false,
      idCheckFlag: false,
      nicknameCheckFlag: false,
    }
  },
  computed: {
    ...mapGetters(['authError', 'passwordFlag', 'idFlag', 'nicknameFlag'])
  },
  methods: {
    ...mapActions(['passwordCheck', 'signup', 'nicknameCheck', 'idCheck']),
    passwordCheckValid() {
      if (this.credentials.password === this.credentials.password2) {
        this.passwordCheckFlag = true
      } else {
        this.passwordCheckFlag = false
      }
    },
    signupSubmit(){
      if (this.passwordCheckFlag === true && this.idFlag === true && this.nicknameFlag === true) {
        this.passwordCheck(this.credentials)
      } else {
        alert('회원가입 실패')
      }
    },
  }
  };
</script>

<style scoped>
.check {
  font-weight: bold;
}
.submit {
  width: 25rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 5%;
}
#overlap{
  font-size: .9rem;
  font-weight: 800;
  line-height: 1.6;
  margin-left: 5%;
}
label{
  font-weight: bold;
  font-size: 1.2rem;
}
input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 12px;
}
</style>
