<template>
    <div class="navbar d-flex flex-row justify-space-between align-end">
        <div class="router-logo d-flex">
            <router-link to="/">
                <img class="nav-img" src="@/assets/plex_nav.png" alt="로고" />
            </router-link>
        </div>

    <div class="d-flex"  v-if="isLoggedIn">
    <v-menu bottom rounded offset-y>
      <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="fetchUserInfo">
              <v-avatar color="white" size="35">
                <img v-if="getUser.img" :src="require(`@/assets/profile/${getUser.img}.png`)" alt="profile">
                <img v-else :src="require(`@/assets/profile/gummybear.png`)" alt="chick">
              </v-avatar>
          </v-btn>
      </template>

      <v-card color="brown" width="15vw">
          <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="white" size="50">
                  <img v-if="this.getUser.img" :src="require(`@/assets/profile/${getUser.img}.png`)" alt="profile">
                  <img v-else :src="require(`@/assets/profile/gummybear.png`)" alt="chick">
                </v-avatar>
                  <br>
                  <div class="menu-name">
                    <h4 class="white--text">{{ getUser.nick }}</h4>
                  </div>
                  <br>
                  <router-link to="/mypage">
                      <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight: bold" width="12vw"> 마이페이지 </v-btn>
                  </router-link>
                  <a href @click.prevent="logout">
                    <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight: bold" width="12vw"> 로그아웃 </v-btn>
                  </a>
              </div>
          </v-list-item-content>
      </v-card>
    </v-menu>
    </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
const SocketStore = "socketStore";
export default {
    name: "NavBar",
    components: {},
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        ...mapActions(["logout", "fetchUserInfo"]),
        logoutEvent() {
            this.logout();
        },
    },
    computed: {
        ...mapGetters(["isLoggedIn", "getUser"]),
        ...mapState(SocketStore, ["stompClient", "connected"]),
    },
    created() {
        this.fetchUserInfo();
    },
};
</script>
<style>
.nav-img {
    height: 30px;
}
.navbar {
    width: 100%;
    height: 100%;
}
.page-btn {
    margin-top: 2%;
    margin-bottom: 2%;
}
.menu-name {
    margin-top: 10%;
}
.router-logo {
    text-decoration: none;
}
</style>
