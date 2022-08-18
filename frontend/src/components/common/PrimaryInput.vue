<template>
  <div id="primary-input">
    <v-row>
        <v-col cols="2">
          <label class="primary--text" v-bind:for="'input'+this.label">{{labelText}}</label>
        </v-col>
        <v-col cols="10">
          <input v-bind:id="'input'+this.label" v-model="inputdata" v-bind:type="this.inputType" @input="onDataInput"/>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PrimaryInput",
  data: () => {
    return {
      inputdata: '',
    }
  },
  props: ["label","labelText", "inputType"],
  methods: {
    onDataInput() {
    this.$emit('input', this.inputdata)
    }
  }
};
</script>

<style scoped>
#primary-input {
  margin: 2% 0;
}
label{
    font-size: 1.2vw;
    font-weight: bold;
}
input {
  background: white;
  width: 10vw;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 0.8vw;
}
</style>
