<template>
  <div class="rank d-flex flex-column justify-center">
    <div class="rank-logo d-flex align-self-center">Ranking</div>
    <div class="d-flex justify-center align-start" style="flex: 1">
      <ContentBox :height="90" :width="70">
        <RankItem></RankItem>
      </ContentBox>
    </div>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"

import RankItem from '@/components/Rank/RankItem.vue'
export default {
  name: 'RankView',
  components: { 
    RankItem,
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