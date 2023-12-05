<script setup>
import { reactive, onMounted, nextTick, createApp,defineComponent,createVNode } from 'vue'
import { actionBarLeftRenderData } from './actionBarLeftRender/actionBarLeftRender.js'
import { renderInit } from '@/utils/render.js'
// const RenderTest = defineComponent({
//   render(){
//   // 参数1：元素名字符串； 参数2：元素属性； 元素子节点，支持createVNode嵌套
//     return createVNode("div", {class: "text"}, "render-text")
//   }
// });
onMounted(async() => {
  // 遇到问题解决地址https://blog.csdn.net/qq_34966814/article/details/122122314
  const renderData = renderInit('div', 'left_bar',actionBarLeftRenderData)
  // 1. createApp(renderData).mount('#actionBar_left')
  const dom$ = document.querySelector('#actionBar_left')
  const app = createApp(renderData)
  nextTick(() => {
    app.mount(dom$)
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
  position: relative;
  z-index: 10;

  .logo_img {
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .actionBar_left {
    // display: flex;
    // color: #ccc;
  }

  .actionBar_center {
    flex: 1;
  }
}</style>