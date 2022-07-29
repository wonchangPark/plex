<template>
  <div id="content-box-wrap" v-bind:style="{width: this.width+'%' ,height: this.height+'%'}">
    <div id="content-box" class="d-flex" style="flex: 1 1 100%">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"ContentBox",
  props:['width', 'height']
}
</script>

<style scoped>
#content-box-wrap{
    background: rgba(46,41,35,0.93);
    padding: 10px;
    display: flex;
}

#content-box{
    border: solid 3px rgba(135,96,60,0.93);
    width: 100%;
    height: 100%;
}
</style>
