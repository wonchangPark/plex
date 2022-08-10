<template>
  <div>
    <canvas id="main-video-canvas" style="display:none;"/>
    <div id='label-container'></div>
  </div>
</template>

<script>
// const URL = 'https://teachablemachine.withgoogle.com/models/fKbC5tFyY/';
const URL = "https://teachablemachine.withgoogle.com/models/w6iITyYRf/";

import { mapActions } from 'vuex'

export default {
  name: "TeachableItem",
  data(){
    return{
        model: null,
        webcam: null,
        ctx: null,
        labelContainer: null,
        maxPredictions: null,
        predictionData: {},
    }
  },
  methods: {
    ...mapActions(['setPrediction']),
    
    //Methods related to Teachable Machine
    async init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      // load the model and metadata
      // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
      this.model = await tmPose.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();

      // Convenience function to setup a webcam
      const flip = true; // whether to flip the webcam
      this.webcam = new tmPose.Webcam(200, 200, flip); // width, height, flip
      await this.webcam.setup(); // request access to the webcam
      this.webcam.play();
      window.requestAnimationFrame(this.loop);

      // append/get elements to the DOM
      // append/get elements to the DOM
      const canvas = document.getElementById("main-video-canvas");
      canvas.width = 200;
      canvas.height = 200;
      this.ctx = canvas.getContext("2d");
      this.labelContainer = document.getElementById("label-container");
      for (let i = 0; i < this.maxPredictions; i++) {
        // and class labels
        this.labelContainer.appendChild(document.createElement("div"));
      }
    },

    async loop(timestamp) {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },

    async predict() {
      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element
      const { posenetOutput } = await this.model.estimatePose(this.webcam.canvas);
      // Prediction 2: run input through teachable machine classification model
      const prediction = await this.model.predict(posenetOutput);
      if (prediction[0].probability.toFixed(2) >= 0.99) {
        if (this.status == 1) {
          this.$emit('sendScore')
        }
        this.status = 0;
      } else if (prediction[1].probability.toFixed(2) >= 0.99) {
        this.status = 1;
      }
      for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
        this.predictionData[`${prediction[i].className}`] = Number(prediction[i].probability.toFixed(2))
      }
      this.setPrediction(this.predictionData)

      // finally draw the poses
      //this.drawPose(pose);
    },
    drawPose(pose) {
      this.ctx.drawImage(this.webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
      }
    },
  }
};
</script>

<style></style>
