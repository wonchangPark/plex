<template>
  <div id="login-form">
    <form @submit.prevent="handleLogin">
      <div class="d-flex flex-column">
        <div style="visibility: hidden;">temp</div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column">
            <div id="primary-input">
              <v-row>
                  <v-col cols="2">
                    <label class="primary--text" for="ID">ID</label>
                  </v-col>
                  <v-col cols="10">
                    <input id="ID" v-model="user.id" type="text" v-validate="'required'"/>
                  </v-col>
              </v-row>
            </div>
            <div id="primary-input">
              <v-row>
                <v-col cols="2">
                  <label class="primary--text" for="PW">PW</label>
                </v-col>
                <v-col cols="10">
                  <input id="PW" v-model="user.password" type="password" v-validate="'required'"/>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="d-flex justify-center align-center">
            <button class="submit primary">확인</button>
          </div>
        </div>
        <router-link to="/signup" class="primary--text" style="font-weight: bold">회원가입 / 비밀번호 찾기</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      user: {
        id: "",
        password: ""
      },
      loading: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/waiting');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.id && this.user.password) {
          this.$store.dispatch('auth/login', this.user)
          .then(
            () => {
              this.$router.push('/waiting');
            },
            error => {
              this.loading = false;
              console.log(error)
            }
          )}
      });
    }
  }
};
</script>

<style scoped>
#login-form {
  font-size: 1rem;
}

#login-form .submit {
  width: 58.84px;
  height: 88%;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}

#primary-input {
  margin: 2% 0;
}
label{
    font-size: 16px;
}
input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 12px;
}
</style>
