<template>
  <div
    id="login-page"
    class="d-flex flex-column justify-center align-center align-self-center"
  >
    <ContentBox :height="40" :width="50">
      <div
        class="flex-grow-1 d-flex flex-row justify-space-around align-center">
        <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold login-box-logo">SIGN IN</div>
        <div class="flex-grow-1 d-flex flex-row justify-center">
            <LoginForm></LoginForm>
        </div>
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue";
import LoginForm from "@/components/Login/LoginForm.vue";
export default {
  name: "LoginPage",
  data: function () {
    return {
    };
  },
  methods: {

  },
  components: { ContentBox, LoginForm },
};
</script>

<style scoped>
#login-page {
  height: 90vh;
  width: 100vw;
}
.login-box-logo{
    font-size: 5vw;
}
</style>
