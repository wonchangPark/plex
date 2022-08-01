<template>
  <v-toolbar class="navbar" dense height="10vh" elevation="0" color="transparent">
    <div class="d-flex align-end">
      <v-toolbar-title>
          <router-link to="/">LOGO</router-link>
      </v-toolbar-title>
    </div>
    <v-spacer></v-spacer>

    <div class="d-flex align-end">
    <v-menu bottom rounded offset-y>
      <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
              <v-avatar color="brown" size="40"> </v-avatar>
          </v-btn>
      </template>

      <v-card color="brown" width="15vw">
          <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                  <v-avatar color="white" size="62"> </v-avatar>
                  <v-divider class="my-3"></v-divider>
                  <h4>{{ user.nickname }}</h4>
                  <v-divider class="my-3"></v-divider>
                  <router-link to="/mypage">
                      <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight: bold" width="12vw"> 마이페이지 </v-btn>
                  </router-link>
                  <a href @click.prevent="logOut">
                    <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight: bold" width="12vw"> 로그아웃 </v-btn>
                  </a>
              </div>
          </v-list-item-content>
      </v-card>
    </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  components: {
    },
  data () {
      return {
        dialog: false,
        user: {
          nickname: '병아리뿅뿅'
        }
      }
    },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.page-btn {
    margin-top: 2%;
    margin-bottom: 2%;
}

#router-logo {
  width: 200%;
}
</style>
