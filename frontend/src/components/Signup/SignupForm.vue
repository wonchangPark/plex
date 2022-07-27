<template>
  <div id="signup-form">

      <div class="d-flex flex-column">
        <v-container>
        <div class="d-flex flex-row">
          <PrimaryInput :label-col="3" :input-col="9" label="ID" labelText="아이디"></PrimaryInput>
        </div>
        <div>
          <PrimaryInput :label-col="3" :input-col="9" label="NickName" labelText="닉네임"></PrimaryInput>
        </div>
        <div>
          <PrimaryInput :label-col="3" :input-col="9" label="PW" labelText="PW"></PrimaryInput>
        </div>
        <div>
          <PrimaryInput :label-col="3" :input-col="9" label="CheckPW" labelText="PW확인"></PrimaryInput>
        </div>
      </v-container>
      </div>
      <div class="d-flex justify-center align-center">
        <v-btn color="primary" elevation="0" class="submit black--text" style="font-weight:bold" width="20vw">가입</v-btn>
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

</style>
