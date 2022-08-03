<template>
<<<<<<< HEAD
    <div id="waiting-room">
        <div class="d-flex flex-row" style="flex: 1 1 100%">
            <div class="d-flex flex-column" style="flex: 1 1 20%">
                <div class="d-flex" style="flex: 1 1 30%">
                    <v-btn @click="fetchWaitingRoomPage">test</v-btn>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 70%">
                    <UserList></UserList>
                </div>
            </div>
            <div class="d-flex flex-column" style="flex: 1 1 70%">
                <div class="d-flex justify-center align-center" style="flex: 1 1 60%">
                    <ContentBox :height="90" :width="90"></ContentBox>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 45%">
                    <ContentBox :height="90" :width="90"></ContentBox>
                </div>
            </div>
=======
  <div id="waiting-room">
    <div class="d-flex flex-row" style="flex: 1 1 100%">
      <div class="d-flex flex-column" style="flex: 1 1 20%">
        <div
          class="d-flex flex-column align-center"
          style="flex: 0 0 20%; height: 20%; width: 100%"
        >
          <div
            class="d-flex flex-column justify-space-around align-center"
            style="width: 100%; height: 100%"
          >
            <button
              class="primary"
              style="width: 70%; height: 40px; font-weight: bold"
              @click="createRoom"
            >
              방 만들기
            </button>

            <button
              class="primary"
              style="width: 70%; height: 40px; font-weight: bold"
            >
              랭킹 보기
            </button>
          </div>
>>>>>>> e5228bd103f10269127ccce8c22752c0934079eb
        </div>
        <div
          class="d-flex justify-center align-center"
          style="flex: 0 0 80%; height: 80%"
        >
          <UserList></UserList>
        </div>
      </div>
      <div class="d-flex flex-column" style="flex: 1 1 70%">
        <div
          class="d-flex justify-center align-center"
          style="flex: 1 1 55%; height: 55%"
        >
          <RoomList></RoomList>
        </div>
        <div
          class="d-flex justify-center align-center"
          style="flex: 1 1 45%; height: 45%"
        >
          <ChattingList></ChattingList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from "@/components/WaitingRoom/UserList.vue";
<<<<<<< HEAD
import ContentBox from "@/components/common/ContentBox.vue";

import { mapActions, mapGetters } from 'vuex'

export default {
    name: "WaitingRoomView",
    components: { UserList, ContentBox },
    computed: {
        ...mapGetters(['roompage'])
    },
    methods: {
        ...mapActions(['fetchWaitingRoomPage'])
    },
    created(){
        this.fetchWaitingRoomPage()
    }
=======
import RoomList from "@/components/WaitingRoom/RoomList.vue";
import ChattingList from "@/components/WaitingRoom/ChattingList.vue";
import { mapActions } from "vuex"

export default {
  name: "WaitingRoomView",
  components: { UserList, RoomList, ChattingList },
  methods: {
    ...mapActions(['setRoomCreate']),
    createRoom() {
        const roomInfo = {
            name: 'testRoom',
            host: 'test1',
            roomSize: 6,
            isPrivate: false,
            gameNo: 1
            }
        this.setRoomCreate(roomInfo)
        this.$router.push('/room')
    },
  }
>>>>>>> e5228bd103f10269127ccce8c22752c0934079eb
};
</script>
<style scoped>
#waiting-room {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
