<script setup>
import { h, reactive, ref, createApp } from "vue";
import { useStore } from "vuex";
const store = useStore()
const sideBarIndex = ref(0);
const sidebar_box = ref(null);
const sideBarOptions = reactive();
</script>

<template>
  <div class="sidebar">
    <div
      class="sidebar_box"
      ref="sidebar_box"
      id="sidebar_box"
      v-for="(item, index) in sideBarOptions"
      :key="index"
      :class="{ active: index === sideBarIndex }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 50px;
  background-color: #323233;

  .sidebar_box {
    width: 50px;
    height: 30px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .active {
    background-color: #ccc;
    color: #000;
  }
}
</style>
