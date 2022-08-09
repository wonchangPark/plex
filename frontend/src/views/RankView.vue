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
 
}
</script>

<style>
.rank {
  height: 100%;
  width: 100%;
  display: flex;
}
.rank-logo{
    font-weight: bold;
    font-size: 5vw;
    margin-bottom: 2rem;
}
</style>