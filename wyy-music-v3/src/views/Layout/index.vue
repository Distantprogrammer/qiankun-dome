<template>
  <div class="Layout">
    <Header></Header>
      <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/views/Header/index.vue'
import Footer from '@/views/Footer/index.vue'
import Main from '@/views/Main/index.vue'
export default {
  name: 'Layout',
  components: {
    Footer,
    Main,
    Header
  }
}
</script>
