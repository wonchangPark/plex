<template>
  <div id="content-box-wrap" v-bind:style="{width: this.width+'vw' ,height: this.height+'vh'}">
    <div id="content-box" class="d-flex">
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

<style>
#content-box-wrap{
    background: rgba(46,41,35,1);
    padding: 10px;
    display: flex;
    opacity: 0.93;
}

#content-box{
    background: rgba(46,41,35,1);
    border: solid 3px rgba(135,96,60,1);
    width: 100%;
    height: 100%;
}
</style>