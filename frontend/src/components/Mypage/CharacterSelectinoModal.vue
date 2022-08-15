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
      <form @submit="submitImg(img)">
        <v-card class="room-create align-center" color="brown" width="35vw">
          <v-list-item-content class="align-center justify-center">
            <v-container class="d-flex flex-column justify-center">
              <v-row class="d-flex mt-2 mb-2">
              <div v-for="(image, index) in imgList"
              :key="index"
              :image = image>
                <v-col class="text-center" cols="4">
                  <v-avatar color="white" size="100" >
                    <v-btn @click="sendGummibear(image)">
                    <img :src="require(`@/assets/profile/${image}.png`)" alt="">
                    </v-btn>
                  </v-avatar>
                </v-col>
              </div>
              </v-row>
              <br>
                <v-btn color="primary" elevation="0" 
                class="page-btn black--text align-self-center" 
                style="width:30vw; height:40px; font-weight: bold; font-size: 1.1rem;"
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
      // selectList: [0] * length(this.imgList)

    }),
  methods: {
    closeDialog() {
      this.dialog = false
    },
    sendGummibear(index){
      this.img.image = index
      // for (var i = 1; i < length(this.imgList); i++){
      //   this.selectList[i] = 0
      // }
      // this.selectList[this.imgList.indexOf(index)] = 1
      console.log(this.img)
    },
    ...mapActions(['changeImg']),
    submitImg(index){
      this.changeImg(index)
      this.closeDialog()
    }

  },
  computed: {
    ...mapGetters(['isLoggedIn'])
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
.primary {
  border-radius: 5px;
  border-color: #FFB82F;
}
</style>