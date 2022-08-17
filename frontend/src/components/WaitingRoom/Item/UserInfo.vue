<template>
  <div class="d-flex user-info flex-row justify-left align-center">
      <v-avatar color="white" size="45" class="info-box">
        <img v-if="this.img" :src="require(`@/assets/profile/${img}.png`)" alt="profile">
      </v-avatar>
      <div class="white--text font" >{{nick}}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "UserInfo",
    props:["nick","img"],
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

.info-box {
  margin-left: 0.5vw;
}
.user-info .font {
  font-weight: bold;
  font-size: 1.2vw;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1 1 auto;
  margin-left: 0.2vw;
}
</style>
