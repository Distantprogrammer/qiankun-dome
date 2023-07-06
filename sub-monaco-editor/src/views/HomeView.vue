<script setup>
import filecatalog from './fileCatalog/index.vue'
import monacoEditor from './monaco-editor/index.vue'
</script>

<template>
  <div div class="home">
    <div class="file_catalog">
      <filecatalog/>
    </div>
    <div class="monaco_editor">
      <monaco-editor/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home{
  display: flex;
  width: 100vw;
  height: 100vh;
}
.monaco_editor{
  flex: 1;
  height: 100vh;
}
</style>