<template>
  <v-card
    class="Navbar"
    fluid
    height="10hv"
  >
    <v-toolbar dense
    opacity='0.5'>
      <v-toolbar-title>
        <router-link to="/">LOGO</router-link>
      </v-toolbar-title>
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
          size="40"
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
            >
            </v-avatar>
            <v-divider class="my-3"></v-divider>
            <h4>{{ user.nickname }}</h4>
            <v-divider class="my-3"></v-divider>
            <v-btn
              rounded
              text
            >
              <router-link to="mypage">마이페이지</router-link>
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn
              rounded
              text
            >
              로그아웃
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
      </v-menu>
    </v-toolbar>
  </v-card>
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
          nickname: '닉네임'
        }
      }
    },
}
</script>
<style scoped>

</style>