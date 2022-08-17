<template>
  <ContentBox class="chatting-list" :height="90" :width="100">
    <div
      class="d-flex flex-column pt-1 chatting_list"
      style="height: 100%; width: 100%"
    >
      <div class="d-flex flex-column" style="height: 87%; width: 100%">
        <div class="d-flex flex-column chatting-list-box" ref="chattingListBox">
          <div v-if="isAll">
            <ChattingItem
              v-for="(item, index) in recvList"
              :key="index"
              :name="item.userName"
              :content="item.content"
              :img="item.img"
            ></ChattingItem>
          </div>
          <div v-if="!isAll">
            <ChattingItem
              v-for="(item, index) in roomRecvList"
              :key="index"
              :name="item.userName"
              :content="item.content"
              :img="item.img"
            ></ChattingItem>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-row align-center"
        style="height: 13%; width: 100%"
      >
        <button class="mx-2 chatting-sub text--primary" @click="toggle">
          {{ isAll ? "전체" : "방" }}
        </button>
        <input
          class="chatting-input white"
          v-model="message"
          @keyup.enter="sendEvent"
          type="text"
        />
        <button class="mx-2 chatting-submit primary" @click="sendEvent">
          전송
        </button>
      </div>
    </div>
  </ContentBox>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import ChattingItem from "./Item/ChattingItem.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
const RoomStore = "roomStore";
const SocketStore = "socketStore";
const Room = "room";
export default {
  name: "ChattingList",
  components: { ContentBox, ChattingItem },
  data() {
    return {
      userName: "",
      message: "",
      recvList: [],
      prevScrollHeight: 0,
    };
  },
  created: function () {
    this.userName = this.getUser.nick;
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe("/send", (res) => {
        this.receive(JSON.parse(res.body));
      });
      window.addEventListener("beforeunload", this.exit);
      this.send("enter", this.getUser.nick, "", this.getUser.img);
    }
    // this.prevScrollHeight = this.$refs.chattingListBox.scrollHeight - this.$refs.chattingListBox.clientHeight;
  },
  mounted: function () {
    this.prevScrollHeight =
      this.$refs.chattingListBox.scrollHeight -
      this.$refs.chattingListBox.clientHeight;
  },
  beforeDestroy: function () {
    window.removeEventListener("beforeunload", this.exit);
    this.exit();
  },
  methods: {
    ...mapMutations(RoomStore, ["ADD_CONNECT_USER", "REMOVE_CONNECT_USER"]),
    ...mapActions(RoomStore, ["getConnectUsers"]),
    ...mapMutations(Room, ["sendAll"]),
    toggle() {
      this.isAll = this.isAll ? false : true;
    },
    receive({ type, content, userName, img }) {
      if (type === "message") this.recvList.push({ userName, content, img });
      else if (type === "enter") {
        this.getConnectUsers();
      } else if (type === "exit") {
        this.getConnectUsers();
      }
    },
    sendEvent() {
      const msg = {
        type: "message",
        userName: this.getUser.nick,
        content: this.message,
        img: this.getUser.img,
      };
      this.sendAll(msg);
      this.message = "";
      this.getConnectUsers();
    },
    exit() {
      this.send("exit", this.getUser.nick, "", this.getUser.img);
    },
  },
  computed: {
    ...mapState(["token", "auth"]),
    ...mapGetters(["getUser", "authHeader"]),
    ...mapState(SocketStore, ["stompClient", "connected"]),
    ...mapState(Room, ["room", "allRecvList", "roomRecvList", "isAll"]),
  },
  updated() {
    if (
      Math.abs(this.prevScrollHeight - this.$refs.chattingListBox.scrollTop) < 5
    ) {
      this.$refs.chattingListBox.scrollTop =
        this.$refs.chattingListBox.scrollHeight -
        this.$refs.chattingListBox.clientHeight;
    }
    this.prevScrollHeight =
      this.$refs.chattingListBox.scrollHeight -
      this.$refs.chattingListBox.clientHeight;
  },
};
</script>
<style scoped>
.chatting-list-box {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

.chatting-list-box::-webkit-scrollbar {
  display: none;
}

.chatting-list .chatting-input {
  height: 80%;
  width: 90%;
  border-radius: 5px;
}

.chatting-list .chatting-submit {
  height: 80%;
  width: 5%;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8vw;
}

.chatting-list .chatting-sub {
  height: 80%;
  width: 5%;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8vw;
}
</style>
