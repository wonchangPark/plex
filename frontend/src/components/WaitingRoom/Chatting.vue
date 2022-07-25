<template>
  <div id="chatting">
    <h2>Vue.js WebSocket Tutorial</h2>
    <div style="width: 800px; height: 700px; padding: 10px; border: solid 1px">
      <div id="divChatData">{{ text }}</div>
    </div>
    <div style="width: 100%; height: 10%; padding: 10px">
      <input
        v-model="message"
        type="text"
        id="message"
        size="110"
        v-on:keyup.enter="sendMessage"
      />
      <button v-on:click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChattingStage',
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
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://localhost:8080/ws/chat")

    this.connection.onmessage = (event)=> {
      console.log(event);
      this.text += event.data;
      this.text += "\n";
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>