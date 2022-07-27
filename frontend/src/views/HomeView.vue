<template>
  <div class="home">
    <v-container class="wrap d-flex flex-column align-center justify-center">
      <div class="d-flex justify-center">
        <img src="@/assets/logo.png" alt="logo">
      </div>

      <div class="d-flex flex-column">
        <div class="d-flex justify-center">
          <router-link to="/login">
            <v-btn color="primary" elevation="0" class="routing-btn black--text" style="font-weight:bold" width="25vw">로그인</v-btn>
          </router-link>
        </div>
        <div class="d-flex justify-center">
          <router-link to="/waiting">
            <v-btn color="primary" elevation="0" class="routing-btn black--text" style="font-weight:bold" width="2vw">대기방</v-btn>
          </router-link>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  components: {

  },
};
</script>

<style scoped>
img {
  width: 45%
}
.routing-btn{
  margin-bottom: 5%;
}
.wrap {
  padding-top: 5%;
}
</style>
