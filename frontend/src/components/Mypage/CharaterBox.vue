<template>
  <div class="character-box d-flex justify-center">
    <ContentBox :height="50" :width="100">
      <div class="d-flex flex-column">

      <div class="d-flex justify-center align-self-center" style="width: 80%; height: 80%;">
        <img :src="require(`@/assets/profile/${getUser.img}.png`)" alt="chick">
      </div>
        <div class="d-flex justify-center">
           <CharacterSelectionModal>
          </CharacterSelectionModal>
        </div> 
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"
import CharacterSelectionModal from "@/components/Mypage/CharacterSelectinoModal.vue"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "CharaterBox",
  components: {
    ContentBox,
    CharacterSelectionModal,
  },
  data(){
    return {
      imgName: String(this.getUser.img)
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
  },
  created(){
    this.fetchUserInfo()
  }
}
</script>

<style>
.character-box img {
  width: 200px;
}
</style>