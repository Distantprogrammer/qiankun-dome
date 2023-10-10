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
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#454545" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">选项3</el-menu-item>
      <el-menu-item index="2">选项2</el-menu-item>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  width: 200px;
  height: 1000px;
  background-color: #2b2b2b;
  
}
</style>
