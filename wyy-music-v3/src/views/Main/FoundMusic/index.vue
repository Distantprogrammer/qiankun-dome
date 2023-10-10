<script setup>
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" default-active="1" mode="horizontal" @open="handleOpen" @close="handleClose"
      background-color="#454545" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">个性推荐</el-menu-item>
      <el-menu-item index="2">专属定制</el-menu-item>
      <el-menu-item index="3">歌单</el-menu-item>
      <el-menu-item index="4">排行榜</el-menu-item>
      <el-menu-item index="5">歌手</el-menu-item>
      <el-menu-item index="6">最新音乐</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  height: 1000px;
  background-color: #2b2b2b;
}

:deep(.el-menu) {
  border: none;

  li {
    padding: 0;
    margin: 0 20px;
    color: #b5b5b5;
    font-size: 16px;
  }

  .el-menu-item:not(.is-disabled):focus,
  .el-menu-item:not(.is-disabled):hover{
        background-color: transparent !important;
    }

  .is-active {
    border-bottom: 3px @btnred solid;
    color: #d5d5d5 !important;
    font-size: 22px;
    font-weight: 600;
  }
}</style>
