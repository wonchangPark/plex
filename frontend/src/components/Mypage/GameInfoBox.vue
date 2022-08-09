<template>
  <div class="game-info-box">
    <v-card class="align-center" color="deepblue">
      <v-list-item-content class="align-center justify-center">
        <v-container class="d-flex flex-column justify-center">
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">게임</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">승</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">패</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">300</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">200</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">100</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">운동</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">스쿼트</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">버피테스트</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">300</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">200</div>
            </v-col>
            <v-col class="text-center" cols="4">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">100</div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-center" cols="3">
              <div class="secondary--text" style="font-size:1.2rem; font-weight: bold;">랭킹</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">#1</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <div class="white--text" style="font-size:1.2rem; font-weight: bold;">1250</div>
            </v-col>
            <v-col class="text-center" cols="3">
              <v-btn text>
                <router-link to="/rank">전체랭킹보기</router-link>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GameInfoBox',
  
}
</script>

<style>

</style>