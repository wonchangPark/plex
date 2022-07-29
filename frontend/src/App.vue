<template>
  <v-app>
    <v-main>
      <div id="v-app" class="no-scrollbars">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
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
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}

</style>
