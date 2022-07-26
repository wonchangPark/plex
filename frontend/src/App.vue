<template>
    <v-app>
      <v-main>
        <div id="v-app">

        </div>
        <router-view />
      </v-main>
    </v-app>
</template>

<script>
export default {
  name: "App",

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
</style>
