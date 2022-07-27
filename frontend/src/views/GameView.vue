<template>
  <div id="gameview">

    <h1>Testing Vue2 Phaser3</h1>
    <start-phaser> </start-phaser>
    <h1>Footer</h1>
    Keys: {{keys}}<br>
    Last event: {{events}}<br>
    {{eventArray}}<br>
  </div>
</template>
<script>
import startPhaser from "../components/startPhaser.vue";
import PubSub from 'pubsub-js'

var TOPIC1 = "MOVE"
var TOPIC2 = "EVENT"

export default {
  name: "gameview",
  components: {
    startPhaser,
  },
  data() {
    return {
      keys: {},
      events: {},
      eventArray: []
    } 
  },
  methods: {
    saveKey(msg,data) {
        this.keys = msg + ": " + data.key
    },
    saveEvent(msg, data) {
      this.events = msg + ": " + data.event
      this.eventArray.push(this.events)
    }

  }, 
  mounted() {
  PubSub.subscribe(TOPIC1, (msg,data) => {
    console.log(msg, data)
    this.saveKey(msg,data);
  });

  PubSub.subscribe(TOPIC2, (msg,data) => {
    console.log(msg, data)
    this.saveEvent(msg, data);
  });
  }
  
}


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
