<template>
  <div id="login-form">
    <form @submit.prevent="login(credentials)">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "LoginForm",
  components: { PrimaryInput },
  data() {
    return {
      credentials: {
        id: "",
        password: ""
      },

    }
  },

  computed: {
    ...mapGetters(['authError','getUser', 'isLoggedIn']),
  },

  created() {
    if (this.IsLoggedIn) {
      this.$router.push('/waiting');
    }
  },
  methods: {
    IdListened(id){
      this.credentials.id = id 
    },
    PWListened(PW){
      this.credentials.password = PW
    },

    ...mapActions(['login'])
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
