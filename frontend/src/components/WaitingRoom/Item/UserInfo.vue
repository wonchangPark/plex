<template>
  <div class="d-flex user-info flex-row justify-left align-center">
    <v-avatar class="mr-4 ml-4" color="white" size="45">
      <img
        :src="require(`@/assets/profile/${getUser.img}.png`)"
        alt="profile">
    </v-avatar>
    <div class="white--text font">{{nick}}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "UserInfo",
    props:["nick"],
    computed: {
      ...mapGetters(['getUser'])
    }
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
