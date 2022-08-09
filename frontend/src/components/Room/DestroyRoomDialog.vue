<template>
  <div class="destroy-room-dialog">
    <v-dialog
      v-model="dialog"
      class="d-flex align-center"
      max-width="35vw"
    > 
    <template v-slot:activator="{ on, attrs }">
      <button
        style="width: 100%; height: 50px; font-weight: bold"
        v-bind="attrs"
        v-on="on"
      >
        세션 떠나기
      </button>
    </template>
      <v-card class="room-create align-center" color="deepblue" width="35vw">
        <v-list-item-content class="align-center justify-center">
          <v-container class="d-flex flex-column justify-center">
            <v-row class="d-flex mt-2 mb-2">
              <v-col class="text-center" cols="12">
                <div class="blue--text" style="font-size:1.2rem">방을 떠나시겠습니까?</div>
              </v-col>
            </v-row>
            <v-row class="d-flex mt-2 mb-2">
              <v-col class="text-center" cols="12">
                <div class="white--text" style="font-size:1rem">방을 떠나면 게임정보가 저장되지 않습니다.</div>
              </v-col>
            </v-row>
            <br>
              <v-btn color="error" elevation="0" 
              class="page-btn white--text align-self-center" 
              style="width:30vw; height:40px; font-weight: bold; font-size: 1.1rem;"
              @click="checkLeaveSession"> 
              방 떠나기</v-btn>
              <v-btn color="blue" elevation="0" 
              class="page-btn deepblue--text align-self-center" 
              style="width:30vw; height:40px; font-weight: bold; font-size: 1.1rem;"
              @click="closeDialog"> 
              닫기</v-btn>
          </v-container>
        </v-list-item-content>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name : 'DestroyRoomDialog',
  components: {
  },
  data: () => ({
    dialog: false,
    }),
  methods: {
    closeDialog(){
      this.dialog = false
    },
    checkLeaveSession(){
      this.$router.push('/waiting')
    },
  },
  computed: {
  },
}
</script>

<style>
</style>