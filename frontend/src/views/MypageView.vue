<template>
  <div class="mypage">
    <div class="d-flex flex-column align-self-center" style="flex: 1 1 100%">
      <div class="mypage-logo d-flex align-self-center">MY PAGE</div>
      <div class="d-flex flex-row">
        <div class="d-flex justify-center" style="flex: 1 1 30%">
          <div class="d-flex justify-center" style="flex: 1 1 80%">
          <CharaterBox></CharaterBox>
          </div>
        </div>
    
        <div class="d-flex justify-center" style="flex: 1 1 70%">
          <div class="d-flex justify-center" style="flex: 1 1 80%">
            <InformationBox></InformationBox>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import InformationBox from "@/components/Mypage/InformationBox.vue"
import CharaterBox from "@/components/Mypage/CharaterBox.vue"

export default {
  name: 'mypageView',
  data() {
    return {
      myPageMusic: require("../assets/audio/waitingAudio.mp3"),
      musicOn: undefined,
    }
  },
  components: {
    InformationBox,
    CharaterBox
  },
  mounted() {
    this.musicOn = new Audio(this.myPageMusic);
    this.musicOn.volume = 0.2;
    this.musicOn.loop = true;
    this.musicOn.play();
  },
  beforeRouteLeave(to, from, next) {
    if (this.musicOn != undefined)
      this.musicOn.pause();
    next();
  },
}
</script>

<style>
.mypage{
  height: 90vh;
  width: 100vw;
  display: flex;
}

.mypage-logo{
    font-weight: bold;
    font-size: 5vw;
    margin-bottom: 2rem;
}
</style>