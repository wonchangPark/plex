<template>
  <div class="signup">
    <h1>회원가입</h1>
    <form class="signupform">
        <p>
            <label for="emailInput">EMAIL</label>
            <input type="text" id="emailInput" class="input_text" v-model.trim="email" placeholder="email">
        </p>
        <p>
            <label for="nicknameInput">NICKNAME</label>
            <input type="text" id="nicknameInput" class="input_text" v-model.trim="nickname" placeholder="nickname">
        </p>
        <p>
            <label for="PWInput">PW</label>
            <input type="password" id="PWInput" class="input_text" v-model.trim="password" placeholder="password">
        </p>
        <p>
            <label for="PWCheckInput">PW 확인</label>
            <input type="password" id="PWCheckInput" class="input_text" v-model.trim="checkPassword" placeholder="password">
        </p>
        <p class="buttons">
            <button class="button">가입하기</button>
        </p>
    </form>
    <button>
        <router-link to="/login">로그인</router-link>
    </button>

  </div>
</template>

<script>
export default {
    name: "SignupPage",
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
.sign-up { width:800px; margin:20px auto; }
.signupform { width:400px; margin:auto; }
.signupform p > label { display:inline-block; width:100px; font-size:14px; padding-right:10px; }
.signupform p > .input_text { width:200px; font-size:14px; height:32px; }
.buttons { position:relative; height:32px; margin-top:20px; }
.buttons > .button { overflow:visible; cursor:pointer; min-width:125px; height:32px; margin:0 2px; padding:0 15px; line-height:32px; font-size:14px; border:1px solid #dfdfdf; background:#fff; border-radius:10px; }
.buttons > .button.blue { color:#fff; border-color:#0099d2 !important; background:#0099d2 !important; }

</style>