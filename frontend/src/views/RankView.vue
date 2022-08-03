<template>
  <div class="rank">
    <div class="d-flex flex-column justify-center" style="flex:1 1 100%">
      <div class="rank-logo d-flex align-self-center">Ranking</div>
      <RankList></RankList>
    </div>
  </div>
</template>

<script>
import RankList from "@/components/Rank/RankList.vue"

export default {
  name: 'RankView',
  components: { 
    RankList
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