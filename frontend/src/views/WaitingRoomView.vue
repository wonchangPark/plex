<template>
  <div class="waiting-room">
    <chatting></chatting><br>
    <room-list></room-list><br>
    <user-list></user-list><br>
    <v-btn>방 만들기</v-btn>
    <router-link to="/rank">
      <v-btn>랭킹보기</v-btn>
    </router-link>
    <router-link to="/room">게임방 입장</router-link>
  </div>
</template>

<script>
import Chatting from '@/components/WaitingRoom/Chatting.vue'
import RoomList from '@/components/WaitingRoom/RoomList.vue'
import UserList from '@/components/WaitingRoom/UserList.vue'

export default {
  name: 'WaitingRoomView',
  components: {
    Chatting,
    RoomList,
    UserList

  }
}
</script>
