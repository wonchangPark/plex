<template>
  <div class="rank">
    <div class="d-flex flex-column justify-center align-center" style="flex:1 1 100%">
      <div class="rank-logo d-flex align-self-center">Ranking</div>
        <ContentBox :height="70" :width="70">
          <div class="d-flex flex-column align-center" style="height: 100%; width: 100%">
            <RankList></RankList>
          </div>
        </ContentBox>
    </div>
  </div>
</template>

<script>
import RankList from "@/components/Rank/RankList.vue"
import ContentBox from "@/components/common/ContentBox.vue"

export default {
  name: 'RankView',
  components: { 
    RankList,
    ContentBox
  },

  data() {
    return {
      rankMusic: require("../assets/audio/rankAudio.mp3"),
      musicOn: undefined,
    }
  },

  mounted() {
    this.musicOn = new Audio(this.rankMusic);
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
.rank {
  height: 90vh;
  width: 100vw;
  display: flex;
}
.rank-logo{
    font-weight: bold;
    font-size: 5vw;
    margin-bottom: 2rem;
}
</style>