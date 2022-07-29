<template>
<<<<<<< HEAD
  <div id="waiting-room">
    <div class="d-flex flex-row">
      <div class="d-flex flex-column" style="flex: 1 0 30%">
        <div class="d-flex" style="flex: 1 1 35%">
          <ContentBox :height="50" :width="50"></ContentBox>
        </div>
        <div class="d-flex" style="flex: 1 1 65%">
          asdfnvie
        </div>
      </div>
      <div class="d-flex" style="flex: 1 0 70%">1234</div>
    </div>
=======
  <div class="waiting-room">
    <chatting></chatting><br>
    <room-list></room-list><br>
    <user-list></user-list><br>
    <v-btn>방 만들기</v-btn>
    <router-link to="/rank">
      <v-btn>랭킹보기</v-btn>
    </router-link>
    <router-link to="/room">게임방 입장</router-link>
>>>>>>> origin/jeongyewon
  </div>
</template>

<script>
import ContentBox from '@/components/common/ContentBox.vue';
export default {
<<<<<<< HEAD
    name: "WaitingRoomView",
    components: { ContentBox }
};
=======
  name: 'WaitingRoomView',
  components: {
    Chatting,
    RoomList,
    UserList

  }
}
>>>>>>> origin/jeongyewon
</script>
<style scoped>
#waiting-room {
  width: 100vw;
  height: 100vh;
}
</style>
