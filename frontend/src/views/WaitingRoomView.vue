<template>
  <div class="waiting-room">
    <chatting></chatting><br>
    <room-list></room-list><br>
    <user-list></user-list><br>
    <router-link to="/room" >게임방 입장</router-link>
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
