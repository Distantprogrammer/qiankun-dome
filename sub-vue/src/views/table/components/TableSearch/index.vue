<template>
  <div id="div-search" class="div-search">
    <el-form :inline="true" :size="option.size" :model="queryForm">
      <template>
        <el-form-item>
          <el-input v-model="queryForm.customerName" placeholder="客户名称" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.customerStatus" placeholder="客户状态" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.contactName" placeholder="联系人姓名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.contactPhone" placeholder="联系人电话" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.searchKeywords" placeholder="搜索关键词" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.promotionalKeywords" placeholder="推广关键词" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.createUser" placeholder="创建人" />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchChange">搜索</el-button>
        <el-button icon="el-icon-delete" @click="searchReset()">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import option from '@/options/table.js'
export default {
  name: '',
  components: { },
  props: {},
  data() {
    return {
      queryForm: {
        customerName: '',
        customerStatus: '',
        contactName: '',
        contactPhone: '',
        searchKeywords: '',
        promotionalKeywords: '',
        createUser: ''
      },
      option: option
    }
  },
  computed: { },
  watch: { },
  created() { },
  mounted() { },
  methods: {
    searchChange() {

    },
    searchReset() {

    }
  }
}
</script>

<style lang='scss' scoped>
@import "./styles/TableSearch.scss";
</style>
