<template>
    <v-toolbar dense 
    height="50vh"
    elevation="0"
    color="transparent">
        <router-link to="/">
          <img id="router-logo" src="@/assets/llogo.png" alt="logo">
        </router-link>
      <v-spacer></v-spacer>
      
      
      <v-menu
        bottom
        rounded
        offset-y
      >

      <template v-slot:activator="{on}">
        <v-btn
        icon
        v-on="on"
      >
        <v-avatar
          color="brown"
          size="46"
        >
        </v-avatar>
        </v-btn>
      </template>


      <v-card
        color="brown"
        width=15vw
      >
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
              color="white"
              size="62"
            >
            </v-avatar>
            <v-divider class="my-3"></v-divider>
            <h4>{{ user.nickname }}</h4>
            <v-divider class="my-3"></v-divider>
            <router-link to="/mypage">
              <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight:bold" width="12vw">
                  마이페이지
              </v-btn>
            </router-link>

            <router-link to="/">
              <v-btn color="primary" elevation="0" class="page-btn black--text" style="font-weight:bold" width="12vw">
                로그아웃
              </v-btn>
            </router-link>
          </div>
        </v-list-item-content>
      </v-card>
      </v-menu>
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
}
</script>
<style scoped>
.page-btn{
  margin-top: 2%;
  margin-bottom: 2%;
}

#router-logo {
  width: 200%;
}
</style>
