<template>
  <div class="character-box">
    <ContentBox :height="50" :width="12" justify="center">
      <div class="d-flex" justify="center">
        <img src="@/assets/chick.png" alt="chick">
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