<template>
  <div class="mypage">
    <div class="d-flex flex-column align-self-center" style="flex: 1 1 100%">
      <div class="mypage-logo d-flex align-self-center">MY PAGE</div>
      <div class="d-flex flex-row">
        <div class="d-flex justify-center" style="flex: 1 1 30%">
          <div class="d-flex justify-center" style="flex: 1 1 80%">
          <CharaterBox></CharaterBox>
          </div>
        </div>
    
        <div class="d-flex justify-center" style="flex: 1 1 70%">
          <div class="d-flex justify-center" style="flex: 1 1 80%">
            <InformationBox></InformationBox>
          </div>
        </div>

      </div>
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
  height: 100%;
  width: 100%;
  display: flex;
}

.mypage-logo{
    font-weight: bold;
    font-size: 5vw;
    margin-bottom: 2rem;
}
</style>