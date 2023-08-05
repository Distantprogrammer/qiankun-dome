<script setup>
import actionBar from './actionBar/index.vue'
import sidebar from './sidebar/index.vue'
import filecatalog from './fileCatalog/index.vue'
import monacoEditor from './monaco-editor/index.vue'
</script>

<template>
  <actionBar/>
  <div div class="home" v-if="true">
    <div class="file_catalog">
      <sidebar/>
      <!-- <filecatalog/> -->
    </div>
    <div class="monaco_editor">
      <!-- <monaco-editor/> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home{
  display: flex;
  width: 100vw;
  height: 100vh;
}
.file_catalog{
    display: flex;
  }
.monaco_editor{
  flex: 1;
  height: 100vh;
}
</style>