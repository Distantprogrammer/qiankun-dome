<template>
  <div class="div-table-button">
    <!-- 左侧按钮 -->
    <div class="div-table-button__left">
      <el-button :size="option.size" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-button :size="option.size" type="success" icon="el-icon-download" @click="handleImport">导入</el-button>
      <el-button type="warning" size="small" plain icon="el-icon-download" @click="handleExport">导出</el-button>
      <el-button :size="option.size" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除
      </el-button>
    </div>
    <!-- 右侧按钮 -->
    <div class="div-table-button__right">
      <el-button :size="option.size" icon="el-icon-refresh" circle @click="searchChange" />
      <el-button :size="option.size" icon="el-icon-search" circle @click="searchHide" />
    </div>
  </div>
</template>

<script>
import option from '@/options/table.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      option: option
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    handleAdd() {},
    handleImport() {},
    handleExport() {},
    handleDelete() {},
    searchChange() {},
    searchHide() {}
  }
}
</script>

<style lang='scss' scoped>
@import "./styles/TableBtn.scss";
</style>
