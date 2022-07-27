<template>
  <div
    id="login-page"
    class="d-flex flex-column justify-center align-center align-self-center"
  >
  <div class="signup-logo">회원가입</div>
    <ContentBox :height="50" :width="40">
      <div
        class="flex-grow-1 d-flex flex-row justify-center align-center">
        <div class="flex-grow-1 d-flex flex-row justify-center">
          <div class="d-flex flex-column">
            <SignupForm></SignupForm>
          </div>
        </div>
      </div>
    </ContentBox>
  </div>
</template>

<script>
import SignupForm from "@/components/Signup/SignupForm.vue"
import ContentBox from "@/components/common/ContentBox.vue";


export default {
    name: "SignupPage",
    components: {
        SignupForm,
        ContentBox
    },
    data(){
        return {
            email: '',
            nickname: '',
            password: '',
            checkPassword: '',
        }
    },
    methods: {

    }
}
</script>

<style>
.signup-logo{
    font-weight: bold;
    font-size: 4vw;
    margin-bottom: 5%;
}
</style>