<template>
  <div class="home">
    <div class="wrap">
      
      <img src="@/assets/logo.png" alt="logo" class="item">
      <v-btn>
      <router-link to="/login" class="item">로그인</router-link>
      </v-btn>


      <v-btn>
      <router-link to="/waiting" class="item">대기방</router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HomeView',

    components: {
    },
  }
</script>

<style scoped>
img {
  width: 30%
}
.wrap {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
