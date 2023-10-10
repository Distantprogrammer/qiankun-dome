<script setup>
import Header from './Header/index.vue';
import Footer from './Footer/index.vue';
import Sidebar from './Sidebar/index.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <div class="mian">
      <div class="mian_sidebar">
        <Sidebar />
      </div>
      <div class="mian_content">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .mian {
    flex: 1;
    display: flex;
    height: calc(100vh - 130px);

    .mian_sidebar {
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      &:hover {
        &::-webkit-scrollbar-thumb {
          background-color: #454545;
        }
      }
    }

    .mian_content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
