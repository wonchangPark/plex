<template>
  <div class="character-box d-flex justify-center">
    <ContentBox :height="100" :width="100">
      <div class="d-flex flex-column">

      <div class="d-flex justify-center align-self-center" style="height: 80%; width: 80%;">
        <img v-if="getUser.img" :src="require(`@/assets/profile/${getUser.img}.png`)" alt="profile">
        <img v-else src="@/assets/profile/test.png" alt="chick">
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
/* .character-box img {
  width: 200px;
} */
</style>