<template>
  <div class="character-box d-flex justify-center">
    <ContentBox :height="60" :width="70">
      <div class="d-flex flex-column" style="flex:1 1 100%">
      <div class="d-flex justify-center align-self-center">
        <img class="d-flex justify-center align-center align-self-center" v-if="getUser.img" :src="require(`@/assets/profile/${getUser.img}.png`)" alt="profile">
        <img class="d-flex justify-center align-center align-self-center" v-else src="@/assets/profile/gummybear.png" alt="chick">
      </div>
        <div class="d-flex justify-center align-center" style="flex: 1 1 100%">
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
.character-box img {
  /* height: 70%; */
  width: 70%;
}
</style>