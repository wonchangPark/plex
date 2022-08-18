<template>
  <div
    id="signup-page"
    class="d-flex flex-column justify-center align-center align-self-center"
  >
  <div class="signup-logo">회원가입</div>
    <ContentBox :height="70" :width="50">
      <div
        class="d-flex flex-grow-1 flex-row justify-center align-center">
            <SignupForm></SignupForm>
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

<style scoped>
#signup-page {
  height: 90vh;
  width: 100vw;
}
.signup-logo{
    font-weight: bold;
    font-size: 5vw;
    margin-bottom: 2rem;
}
</style>