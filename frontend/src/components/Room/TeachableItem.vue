<template>
  <div></div>
</template>

<script>
// const URL = 'https://teachablemachine.withgoogle.com/models/fKbC5tFyY/';
//ßconst URL = "https://teachablemachine.withgoogle.com/models/w6iITyYRf/";

export default {
  name: "TeachableItem",
  data(){
    return{
        model: null,
        webcam: null,
        ctx: null,
        labelContainer: null,
        maxPredictions: null,
    }
  }
};
</script>

<style></style>
