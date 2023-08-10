<script setup>
import { reactive,onMounted, nextTick,createApp } from 'vue'
import { render } from './actionBarLeftRender/actionBarLeftRender.js'
onMounted(() => {
  nextTick(()=>{
      createApp(render).mount('#actionBar_left')
  })
})
</script>

<template>
<div class="actionBar">
  <div class="logo_img">
      <img src="@/assets/logo.png" alt="">
  </div>
  <div class="actionBar_left" id="actionBar_left">
  </div>
  <div class="actionBar_center"></div>
  <div class="actionBar_right"></div>
</div>
</template>

<style lang="scss" scoped>
@import url('./actionBarLeftRender/actionBarLeftRender.scss');
.actionBar {
  width: 100%;
  background-color: #323233;
  display: flex;
  height: 30px;
  padding: 5px 18px;
  .logo_img{
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .actionBar_left{
    // display: flex;
    // color: #ccc;
  }
  .actionBar_center{
    flex: 1;
  }
}
</style>