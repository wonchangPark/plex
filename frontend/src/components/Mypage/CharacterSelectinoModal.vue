<template>
  <div class="create-room-dialog">
    <v-dialog
      v-model="dialog"
      class="d-flex align-center"
      max-width="35vw"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="character-btn primary black--text"
          v-bind="attrs"
          v-on="on"
        >
          캐릭터 변경
        </v-btn>
      </template>

       <form @submit.prevent="submitImg(img)">
        <v-card class="room-create align-center" color="brown" width="40vw">
          <v-list-item-content class="align-center justify-center">
            <v-container class="d-flex flex-column justify-center">
              <v-row class="d-flex mt-2 mb-2">
              <div v-for="(image, index) in imgList"
              :key="index"
              :image = image
              class="d-flex justify-center align-center">
                <v-col class="text-center" cols="5">
                  <v-avatar color="white" size="130" >
                    <a @click="sendGummibear(image)">
                    <img :src="require(`@/assets/profile/${image}.png`)" alt="" style="width: 100px;">
                    </a>
                  </v-avatar>
                </v-col>
              </div>
              </v-row>
              <br>
                <v-btn color="primary" elevation="0" 
                class="page-btn black--text align-self-center" 
                style="width:30vw; height:40px; font-weight: bold; font-size: 1.1vw;"
                type="submit"> 
                캐릭터 변경 </v-btn>
            </v-container>
          </v-list-item-content>
        </v-card>
      </form>

    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name : 'CharacterSelectionModal',
  components: {
  },
  data: () => ({
      dialog: false,
      img: {
        image: ''
      },
      imgList: ['gummybear', 'pudding', 'slime', 'stone', 'sushi', 'whale'],

    }),
  methods: {
    closeDialog() {
      this.dialog = false
    },
    sendGummibear(index){
      this.img.image = index
      console.log(this.img)
    },
    ...mapActions(['changeImg', 'fetchUserInfo']),
    async submitImg(index){
      await this.changeImg(index)
      await this.fetchUserInfo()
      await this.closeDialog()
    }

  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  updated(){
    this.fetchUserInfo()
  }
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
.primary {
  border-radius: 5px;
  border-color: #FFB82F;
}
/* .create-room-dialog img{
  width: 100px;
} */
</style>