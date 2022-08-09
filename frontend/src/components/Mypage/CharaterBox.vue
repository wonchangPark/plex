<template>
  <div class="character-box d-flex justify-center">
    <ContentBox :height="60" :width="100">
      <div class="d-flex flex-column">

      <div class="d-flex justify-center">
        <img src="@/assets/chick.png" alt="chick">
      </div>
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
  },
  methods: {
  },
  computed: {

  }
}
</script>

<style>
.character-box .submit {
  width: 10rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
.character-box img {
  width: 200px;
}
</style>