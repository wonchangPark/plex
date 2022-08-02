<template>
  <div
    id="login-page"
    class="d-flex flex-column justify-center align-center align-self-center"
  >
    <ContentBox :height="30" :width="40">
      <div
        class="flex-grow-1 d-flex flex-row justify-center align-center">
        <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold login-box-logo">LOGIN</div>
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

    doCancel() {
      this.$router.push("/");
    },
  },
  components: { ContentBox, LoginForm },
};
</script>

<style scoped>
#login-page {
  height: 100%;
  width: 100%;
}
.login-box-logo{
    font-size: 4vw;
}
</style>
