<template>
  <div id="chatting">
    <content-box>
      <div class="chattingSpace d-flex flex-column">
        <div id="divChatData">{{ text }}</div>
        <input
          v-model="message"
          type="text"
          id="message"
          v-on:keyup.enter="sendMessage"
        />
          <v-btn v-on:click="sendMessage"
          color="primary" elevation="0" class="black--text" style="font-weight"
          >
          Send
          </v-btn>
      </div>
    </content-box>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"

export default {
  name: 'ChattingStage',
  components: {
    ContentBox
  },
  data: function() {
    return {
      message: "",
      text: "hello",
    }
  },
  methods: {
    sendMessage: function (event) {
      console.log(event);
      this.message = this.connection.send(this.message);
    },
  },
}
</script>

<style scoped>
#chatting .background{
  display: flex;
  justify-content: center;
  height: 50vh;
  width: 80vw;
  overflow: hidden;
  margin:0;
  background-image: url("@/assets/box.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

#divChatData {
  margin: 2%;
  text-decoration-color: #D6910B;
}
</style>
