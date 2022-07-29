<template>
  <v-app>
    <v-main>
      <div id="v-app" class="no-scrollbars">
        <v-container id="v-container">
          <router-view />
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
};
</script>
<style>
#v-app {
  background-image: url(./assets/background.jpg);
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-size: cover;
}

#v-container{
  height: 100%;
  width: 100%;
  min-width: 1440px;
  padding: 0px 15px;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}
</style>
