<template>
  <div class="d-flex justify-center">
    <ContentBox :height="90" :width="80">
      <div class="d-flex flex-column" style="flex:1 1 100%">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="4">
            </v-col>
            <v-col cols="4">
              <div class="white--text rank-label">닉네임</div>
            </v-col>
            <v-col cols="2">
              <div class="white--text rank-label">점수</div>
            </v-col>
            <v-col cols="2">
              <div class="white--text rank-label">순위</div>
            </v-col>
          </v-row>
        </v-container>
        <div class="rank-list d-flex flex-column align-center justify-space-around">
            <RankItem></RankItem>
            <RankItem></RankItem>
            <RankItem></RankItem>
        </div>
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from '@/components/common/ContentBox.vue'
import RankItem from "@/components/Rank/RankItem.vue"

export default {
  name: 'RankList',
  components: {
    ContentBox,
    RankItem
  }
}
</script>

<style>
.rank-list{
  width:100%;
  height: 100%;
}
.rank-label{
  font-size: 1.5rem;
  font-weight: bold;
}
</style>