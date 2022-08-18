<template>
  <div class="private-room-dialog">
    <v-dialog v-model="dialog" class="d-flex align-center" max-width="35vw">
      <template v-slot:activator="{ on, attrs }">
        <button
          style="width: 100%; height: 50px; font-weight: bold"
          v-bind="attrs"
          v-on="on"
        >
          코드 입력
        </button>
      </template>

      <v-card class="room-create align-center" color="brown" width="35vw">
        <v-list-item-content class="align-center justify-center">
          <v-container class="d-flex flex-column justify-center">
            <v-row class="d-flex mt-2 mb-2">
              <v-col class="text-center" cols="4">
                <div
                  class="primary--text"
                  style="font-size: 1.2rem; font-weight: bold"
                >
                  방 코드
                </div>
              </v-col>
              <v-col cols="7">
                <input id="room-title" type="text" v-model="roomCode" />
              </v-col>
            </v-row>
            <br />
            <v-btn
              @click="joinRoomEvent"
              color="primary"
              elevation="0"
              class="page-btn black--text align-self-center"
              style="
                width: 30vw;
                height: 40px;
                font-weight: bold;
                font-size: 1.1rem;
              "
            >
              입장
            </v-btn>
          </v-container>
        </v-list-item-content>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const room = "room";
export default {
  name: "PrivateRoomDialog",
  data() {
    return {
      dialog: false,
      roomCode: "",
    };
  },
  methods: {
    ...mapActions(room, ["joinRoom"]),

    joinRoomEvent() {
      this.joinRoom(this.roomCode);
    },
  },
  computed: {
  },
};
</script>

<style></style>
