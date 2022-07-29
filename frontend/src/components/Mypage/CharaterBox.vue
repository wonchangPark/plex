<template>
  <div class="character-box">
    <ContentBox :height="60" :width="12" justify="center">
      <div class="d-flex" justify="center">
        <img src="@/assets/chick.png" alt="chick">
        <div class="d-flex justify-center align-end">
          <v-btn color="primary" elevation="0" class="submit black--text">캐릭터 변경</v-btn>
      </div> 
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue"

export default {
  name: "CharaterBox",
  components: {
    ContentBox
  }
}
</script>

<style>
.character-box img {
  width: 10vw;
}
</style>