<template>
  <v-app>
    <v-main>
      <div id="v-app" class="no-scrollbars">
        <navbar></navbar>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'

export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
#v-app {
  background-image: url(./assets/background.jpg);
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  /* font-size: 10vw; */
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}
</style>
