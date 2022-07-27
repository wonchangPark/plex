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
          <div class="d-flex flex-column">
            <LoginForm></LoginForm>
            <div>
              <router-link to="signup">회원가입</router-link>
            </div>
          </div>
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
      memberId: "",
      memberPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    doLogin() {
      if (this.memberId == "") {
        alert("아이디를 입력하세요.");
        this.$refs.memberIdInput.focus();
        return;
      } else if (this.memberPassword == "") {
        alert("패스워드를 입력하세요.");
        this.$refs.memberPasswordInput.focus();
        return;
      }
    },
    doCancel() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.$refs.memberIdInput.focus();
  },
  components: { ContentBox, LoginForm },
};
</script>

<style scoped>
#login-page {
  margin-top: 15%;
}
.login-box-logo{
    font-size: 4vw;
}
</style>
