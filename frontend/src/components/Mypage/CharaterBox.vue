<template>
  <div class="character-box d-flex justify-center">
    <ContentBox :height="60" :width="100">
      <div class="d-flex flex-column">

      <div class="d-flex justify-center">
        <img src="@/assets/chick.png" alt="chick">
      </div>
        <div class="d-flex justify-center align-end">
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

export default {
  name: "CharaterBox",
  components: {
    ContentBox,
    CharacterSelectionModal,
  },
  methods: {
  },
  computed: {

  }
}
</script>

<style>
.character-box img {
  width: 200px;
}
</style>