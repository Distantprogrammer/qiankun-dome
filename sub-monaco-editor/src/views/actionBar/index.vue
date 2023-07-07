<script setup>
import { reactive,onMounted, nextTick,createApp } from 'vue'
import { render } from './actionBarLeftRender.js'
onMounted(() => {
  nextTick(()=>{
    createApp(render).mount('#actionBar_left')
  })
})
const actionBarLeft = reactive([
  {
    name: '文件',
    keyboard:'',
    children:[{}],
  },
  {
    name: '文件',
    keyboard:'',
    children:[{}],
  },
  {
    name: '文件',
    keyboard:'',
    children:[{}],
  },{
    name: '文件',
    keyboard:'',
    children:[{}],
  },
  {
    name: '文件',
    keyboard:'',
    children:[{}],
  }
])
</script>

<template>
<div class="actionBar">
  <div class="actionBar_left" id="actionBar_left">
    <!-- <div class="" v-for="(item,index) in actionBarLeft" :key="index">
      {{ item.name }}({{item.keyboard }}){{ item.children.length >0? '>':"" }}
      <div></div>
    </div> -->
  </div>
  <div class="actionBar_center"></div>
  <div class="actionBar_right"></div>
</div>
</template>

<style lang="scss" scoped>
@import url('./actionBarLeftRender.scss');
.actionBar {
  width: 100%;
  background-color: #323233;
  display: flex;
  height: 30px;
  .actionBar_left{
    // display: flex;
    // color: #ccc;
  }
  .actionBar_center{
    flex: 1;
  }
}
</style>