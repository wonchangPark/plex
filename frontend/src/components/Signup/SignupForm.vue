<template>
  <div id="signup-form" class="d-flex flex-column" style="flex: 1">
    <form @submit.prevent="handleRegister">
      <v-container >
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="ID">아이디</label>
          </v-col>
          <v-col cols="4">
            <input id="ID" type="text" v-model="user.id" v-validate="'required'" />
          </v-col>
          <v-col cols="4">
            <div class="overlap d-flex align-center secondary--text"> 중복이 아닙니다 </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="nickname">닉네임</label>
          </v-col>
          <v-col cols="4">
            <input id="nickname" v-model="user.nick" type="text" v-validate="'required'" />
          </v-col>
          <v-col cols="4">
            <div class="overlap d-flex align-center secondary--text"> 중복이 아닙니다 </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            <label class="primary--text" for="PW">PW</label>
          </v-col>
          <v-col cols="3">
            <input id="PW" type="password" v-model="user.password" v-validate="'required'"/>
          </v-col>
          <v-col cols="2">
            <label class="primary--text" for="checkPW">PW 확인</label>
          </v-col>
          <v-col cols="3">
            <input id="checkPW" type="password"/>
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
export default {
  name: "SignupForm",
  components: {
  },
  data() {
    return {
      user: {
        id: '',
        nickname: '',
        password: ''
      },
      submitted: false,
      succesful: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn){
      this.$router.push('/waiting')
    }
  },
  methods: {
    handleRegister(){
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              console.log(data)
              this.succesful = true;
            },
            error => {
              console.log(error)
              this.succesful = false
            }
          )
        }
      })
    }
  }

};
</script>

<style scoped>
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
