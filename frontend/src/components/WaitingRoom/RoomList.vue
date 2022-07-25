<template>
  <div class="room-list">
    <room-list-item></room-list-item>
  </div>
</template>

<script>
import RoomListItem from '@/components/WaitingRoom/RoomListItem.vue'

export default {
  name : 'RoomList',
  components: { 
    RoomListItem
    },

}
</script>

<style>

</style>