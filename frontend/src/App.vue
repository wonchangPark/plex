<template>
    <v-app @click="check()">
        <v-main>
            <div id="v-app">
                <v-container id="v-container">
                    <div id="header">
                        <Navbar></Navbar>
                    </div>
                    <div id="content-body">
                        <router-view />
                    </div>
                </v-container>
            </div>
        </v-main>
    </v-app>
</template>

<script>
// import axios from 'axios';
import Navbar from "./components/Home/Navbar.vue";
// import { API_BASE_URL } from "@/config";
// import store from "@/store";
// import router from "@/router";


// const API_URL = API_BASE_URL + "/api/v1";


export default {
    name: "App",
    components: { Navbar },
    data: () => ({
        //
    }),
    
    
};
</script>
<style>
#v-app {
    background-image: url(./assets/castle.jpg);
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-size: cover;
}

#v-container {
    display: flex;
    height: 100%;
    width: 100%;
    min-width: 1440px;
    padding: 0px 15px;
    flex-direction: column;
}

body::-webkit-scrollbar { display:none; }

#content-body {
    display: flex;
    width: 100%;
    height: 95%;
    flex: 1 1 auto;
}

#header{
  display: flex;
  height: 5%;
  width: 100%;
}
.no-scrollbars::-webkit-scrollbar {
    display: none;
}
.v-application {
    font-family: 'DungGeunMo', sans-serif !important;
}
@font-face {
  font-family:'DungGeunMo';
  src: url('assets/fonts/DungGeunMo.ttf') format('truetype');
  font-weight: 400;
}
</style>
