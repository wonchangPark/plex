<template>
  <div class="create-room-dialog">
    <v-dialog
      v-model="dialog"
      class="d-flex align-center"
      max-width="35vw"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="character-btn primary"
          v-bind="attrs"
          v-on="on"
        >
          캐릭터 변경
        </v-btn>
      </template>
      
      <v-card class="room-create align-center" color="brown" width="35vw">
        <v-list-item-content class="align-center justify-center">
          <v-container class="d-flex flex-column justify-center">
            <v-row class="d-flex mt-2 mb-2">
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/bear.png" alt="">
                </v-avatar>
              </v-col>
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/pudding.png" alt="">
                </v-avatar>
              </v-col>
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/chick.png" alt="">
                </v-avatar>
              </v-col>
            </v-row>
            <v-row class="d-flex mt-2 mb-2">
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/gummybear.png" alt="">
                </v-avatar>
              </v-col>
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/slime.png" alt="">
                </v-avatar>
              </v-col>
              <v-col class="text-center" cols="4">
                <v-avatar color="white">
                  <img src="@/assets/profile/sushi.png" alt="">
                </v-avatar>
              </v-col>
            </v-row>
            <br>
              <v-btn color="primary" elevation="0" 
              class="page-btn black--text align-self-center" 
              style="width:30vw; height:40px; font-weight: bold; font-size: 1.1rem;"
              @click="closeDialog"> 
              캐릭터 변경 </v-btn>
          </v-container>
        </v-list-item-content>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name : 'CharacterSelectionModal',
  components: {
  },
  data: () => ({
      dialog: false,
    }),
  methods: {
    closeDialog() {
      this.dialog = false
    },
  },
  computed: {
  },
}
</script>

<style>
.character-btn {
  width: 10rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>