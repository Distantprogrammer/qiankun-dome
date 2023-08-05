<script setup>
import { ref } from 'vue';
const width = ref(100)
</script>
<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  width: v-bind(width);
  height: 100vh;
  overflow: hidden;
}
</style>
