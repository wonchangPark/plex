<template>
  <div id="login-form">
    <div class="d-flex flex-column">
      <div style="visibility: hidden;">temp</div>
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <div>
            <PrimaryInput label="ID" labelText="ID"></PrimaryInput>
          </div>
          <div>
            <PrimaryInput label="PW" labelText="PW"></PrimaryInput>
          </div>
        </div>
        <div class="d-flex justify-center align-center">
          <button class="submit primary">확인</button>
        </div>
      </div>
      <router-link to="/signup" class="primary--text" style="font-weight: bold">회원가입 / 비밀번호 찾기</router-link>
    </div>
  </div>
</template>

<script>
import PrimaryInput from "../common/PrimaryInput.vue";
export default {
  name: "LoginForm",
  components: { PrimaryInput },
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
</style>
