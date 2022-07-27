<template>
  <div id="login-form">
    <div class="d-flex flex-row">
      <v-container class="d-flex flex-column">
        <div>
          <PrimaryInput :label-col="2" :input-col="10" :label="ID" labelText="ID"></PrimaryInput>
        </div>
        <div>
          <PrimaryInput :label-col="2" :input-col="10" :label="PW" labelText="PW"></PrimaryInput>
        </div>
      </v-container>
      <div class="d-flex justify-center align-center">
        <button class="submit primary">확인</button>
      </div>
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
  height: 70%;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>
