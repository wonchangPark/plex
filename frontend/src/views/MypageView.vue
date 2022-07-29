<template>
  <div class="mypage">
    <div>
      <CharaterBox></CharaterBox>
      <InformationBox></InformationBox>
    </div>
  </div>
</template>

<script>
import InformationBox from "@/components/Mypage/InformationBox.vue"
import CharaterBox from "@/components/Mypage/CharaterBox.vue"

export default {
  name: 'mypageView',
  components: {
    InformationBox,
    CharaterBox
  }
}
</script>

<style>
.mypage{
  height: 90vh;
  width: 100vw;
}
</style>