<template>
  <div>
    <div class="block white--text text-center" style="font-size: 2vw;">{{ number }}</div>
    <div class="block primary--text text-center" style="font-size: 2vw;">{{ string }}</div>
  </div>
</template>

<script>
export default {
  name: "Data",
  props: ["number", "string"]
}
</script>

<style>

</style>