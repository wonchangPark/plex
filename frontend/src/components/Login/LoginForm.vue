<template>
  <div id="login-form">
    <form @submit.prevent="handleLogin">
      <div class="d-flex flex-column">
        <div style="visibility: hidden;">temp</div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column">
            <PrimaryInput label="ID" labelText="ID" inputType="text" @input="IdListened"></PrimaryInput>
            <PrimaryInput label="PW" labelText="PW" inputType="password" @input="PWListened"></PrimaryInput>
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
import PrimaryInput from '@/components/common/PrimaryInput.vue'
export default {
  name: "LoginForm",
  components: { PrimaryInput },
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
    IdListened(id){
      this.user.id = id 
    },
    PWListened(PW){
      this.user.password = PW
    },
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
