<template>
  <div id="login-form">
    <div class="d-flex flox-row">
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
  </div>
</template>

<script>
import PrimaryInput from "../common/PrimaryInput.vue";
export default {
  name: "LoginForm",
  components: { PrimaryInput },
};
</script>

<style>
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
