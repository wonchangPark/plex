<template>
  <div class="d-flex user-info flex-row justify-left align-center">
    <v-avatar class="mr-4 ml-4" color="white" size="45" @keydown="fetchimg(nick)">
      <img
        v-if="currentUserImage.userImage === undefined || currentUserImage.userImage === null"
        src="@/assets/profile/test.png"
        alt="chick">
      <img
          v-else
        :src="require(`@/assets/profile/${currentUserImage.userImage}.png`)"
        alt="profile">
    </v-avatar>
    <div class="white--text font">{{nick}}</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UserInfo",
    props:["nick"],
    computed: {
      ...mapGetters(['currentUserImage'])
    },
    methods: {
      ...mapActions(['fetchImg'])
    },
    created(){
      this.fetchImg(this.nick)
    },
};
</script>

<style scoped>
.user-info {
  width: 90%;
  height: 72px;
  margin: 5px 0;
  border-radius: 15px;
  background: #4a3e33;
  flex: 0 0 auto;
}

.user-info .font {
  font-weight: bold;
  font-size: 1.6vw;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1 1 auto;
}
</style>
