<template>
  <div class="home">
    <div class="d-flex flex-column justify-center align-center align-self-center">
      <div class="d-flex justify-center align-self-center">
        <img src="@/assets/plex.png" alt="logo">
      </div>

      <div class="d-flex flex-column">
        <div class="d-flex justify-center">
          <router-link to="/login">
            <v-btn color="primary" elevation="0" class="routing-btn black--text" style="font-weight:bold" width="10vw">로그인</v-btn>
          </router-link>
        </div>
      </div>
    </div>
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
.home {
  height: 90vh;
  width: 100vw;
  padding-top: 10vh;
}
.home img {
  width: 45%
}
.routing-btn{
  margin-bottom: 5%;
}
.wrap {
  padding-top: 5%;
}
</style>
