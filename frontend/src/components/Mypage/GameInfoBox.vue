<template>
  <div class="game-info-box">
    <v-card class="align-center" color="deepblue">
      <v-list-item-content class="align-center justify-center">
        <v-container class="d-flex flex-column justify-center">
          <v-row class="d-flex mt-2 mb-2">
            <v-col class="text-center" cols="4">
              <label class="primary--text" for="room-title">방 제목</label>
            </v-col>
            <v-col cols="8">
              <input id="room-title" type="text"/>
            </v-col>
          </v-row>

          <v-row class="d-flex">
            <v-col class="text-center" cols="4">
              <div class="primary--text" style="font-size:1.2rem; font-weight: bold;">비공개</div>
            </v-col>
            <v-col cols="8">
              <v-checkbox class="mt-0 pt-0"></v-checkbox>
            </v-col>
          </v-row>
          <br>
        </v-container>
      </v-list-item-content>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GameInfoBox'
}
</script>

<style>

</style>