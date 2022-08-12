<template>
  <div id="waiting-room">
    <div class="d-flex flex-row" style="flex: 1 1 100%">
      <div class="d-flex flex-column" style="flex: 1 1 20%">
        <div
          class="d-flex flex-column align-center"
          style="flex: 0 0 20%; height: 20%; width: 100%"
        >
          <div
            class="d-flex flex-column justify-space-around align-center"
            style="width: 100%; height: 100%;"
          >
            <CreateRoomDialog class="primary"
            style="width: 70%; height: 45px; font-weight: bold">
            </CreateRoomDialog>
            <button
              class="primary"
              style="width: 70%; height: 45px; font-weight: bold"
              @click="rankBtn"
            >
              랭킹 보기
            </button>
          </div>
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
          <div
            class="d-flex justify-center align-center"
            style="flex: 1 1 45%; height: 90%"
          >
            <UserData></UserData>
          </div>
          <div
            class="d-flex justify-center align-center"
            style="flex: 1 1 45%; height: 90%"
          >
            <ChattingList></ChattingList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from "@/components/WaitingRoom/UserList.vue"
import RoomList from "@/components/WaitingRoom/RoomList.vue"
import ChattingList from "@/components/WaitingRoom/ChattingList.vue"
import CreateRoomDialog from "@/components/WaitingRoom/CreateRoomDialog.vue"
import UserData from "@/components/WaitingRoom/UserData.vue"

import { mapActions, mapGetters } from "vuex";

export default {
  name: "WaitingRoomView",
  components: { UserList, RoomList, ChattingList, CreateRoomDialog, UserData },
  methods: {
    ...mapActions(['setRoomCreate']),
    rankBtn() {
    this.$router.push('/rank');
    }
  },
  computed: {
        ...mapGetters(['roompage'])
    }
};
</script>
<style scoped>
#waiting-room {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
