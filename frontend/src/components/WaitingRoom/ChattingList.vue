<template>
  <ContentBox class="chatting-list" :height="90" :width="90">
    <div
      class="d-flex flex-column pt-1 chatting_list"
      style="height: 100%; width: 100%"
    >
      <div class="d-flex flex-column" style="height: 87%; width: 100%">
        <div class="d-flex flex-column chatting-list-box" ref="chattingListBox">
          <ChattingItem
            v-for="(item, index) in recvList"
            :key="index"
            :name="item.userName"
            :content="item.content"
          ></ChattingItem>
        </div>
      </div>
      <div
        class="d-flex flex-row align-center"
        style="height: 13%; width: 100%"
      >
        <input
          class="ml-4 chatting-input white"
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
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { API_BASE_URL } from "@/config";
const RoomStore = "roomStore";
export default {
  name: "ChattingList",
  components: { ContentBox, ChattingItem },
  data() {
    return {
      stompClient: null,
      userName: "",
      message: "",
      recvList: [],
      connected: false,
      prevScrollHeight: 0,
    };
  },
  created: function () {
    this.connect();
    this.userName = this.getUser.nick;
    this.prevScrollHeight =
      this.$refs.chattingListBox.scrollHeight -
      this.$refs.chattingListBox.clientHeight;
  },
  mounted: function () {
    window.addEventListener("beforeunload", () => {
      this.send("exit", this.getUser.nick, "");
    });
  },
  beforeDestroy: function () {
    window.removeEventListener("beforeunload", () => {
      this.send("exit", this.getUser.nick, "");
    });
    this.send("exit", this.userName, "");
    this.stompClient.disconnect(() => {
      console.log("소켓 연결 해제");
    }, {});
  },
  methods: {
    ...mapMutations(RoomStore, ["ADD_CONNECT_USER", "REMOVE_CONNECT_USER"]),
    ...mapActions(RoomStore, ["getConnectUsers"]),
    connect() {
      const serverURL = API_BASE_URL + "/api/v1/ws";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", (res) => {
            console.log("구독으로 받은 메시지 입니다.", res.body);
            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.receive(JSON.parse(res.body));
          });
          this.send("enter", this.getUser.nick, "");
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },
    send(type, userName, content) {
      console.log("Send Message:" + content);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          type,
          userName,
          content,
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    receive({ type, content, userName }) {
      if (type === "message") this.recvList.push({ userName, content });
      else if (type === "enter") {
        this.getConnectUsers();
      } else if (type === "exit") {
        this.getConnectUsers();
      }
    },
    sendEvent() {
      this.send("message", this.getUser.nick, this.message);
      this.message = "";

      this.getConnectUsers();
    },
  },
  computed: {
    ...mapState(["token", "auth"]),
    ...mapGetters(["getUser"]),
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
  width: 95%;
  border-radius: 5px;
}

.chatting-list .chatting-submit {
  height: 80%;
  width: 5%;
  border-radius: 5px;
  font-weight: bold;
}
</style>
