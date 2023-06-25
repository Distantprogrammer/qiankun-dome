<template>
  <div class="wrapper">

    <div class="header" />

    <div class="body">
      <!-- 分割线START  -->
      <el-row>
        <div class="fengexian" />
      </el-row>
      <!-- 分割线END  -->

      <!-- 查询模块START -->
      <el-row :hidden="!search">
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
      </el-row>
      <!-- 查询模块END  -->

      <!-- 分割线START  -->
      <el-row>
        <div class="fengexian" />
      </el-row>
      <!-- 分割线END  -->

      <!-- 表格上部操作按钮START -->
      <el-row>
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
      </el-row>
      <!-- 表格上部操作按钮END -->

      <!-- 表格START -->
      <el-row>
        <div class="div-table-body">
          <el-table ref="table" v-loading="tableLoading" :max-height="tableHeight" :size="option.size" :data="tableData"
            style="width: 100%" :border="option.border" element-loading-text="Loading" fit highlight-current-row
            @selection-change="selectionChange">
            <el-table-column v-if="option.selection" type="selection" fixed="left" width="55" align="center" />
            <!-- <el-table-column v-if="option.expand" type="expand" align="center" /> -->
            <!-- <el-table-column v-if="option.index" fixed="left" label="#" type="index" width="50" align="center" /> -->
            <el-table-column align="center" label="ID" width="95">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="input" prop="Title">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="input" :index="$index" :row="row" variable-name="input"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column label="select" width="110" align="center">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="select" :selectOption="selectOption" :index="$index" :row="row" variable-name="select"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column label="selectTag" width="110" align="center">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="select-tag" :selectOption="selectOption" :index="$index" :row="row" variable-name="selectTag"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column class-name="textarea" label="textarea" width="110" align="center">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="textarea" :index="$index" :row="row" variable-name="textarea"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="date" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="date" :index="$index" :row="row" variable-name="date"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="datetime" label="datetime" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="datetime" :index="$index" :row="row" variable-name="datetime"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="image.png" label="switch" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="switch" :index="$index" :row="row" variable-name="switch"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="richTextEditor" label="richTextEditor" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="richTextEditor" :index="$index" :row="row" variable-name="richTextEditor"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="imageUpload" label="imageUpload" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="imageUpload" :index="$index" :row="row" variable-name="imageUpload"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="readonly" label="readonly" width="200">
              <template slot-scope="{row,$index}">
                <tableEditType edit-type="readonly" :index="$index" :row="row" variable-name="readonly"  @tableCellBlur="tableCellBlur" />
              </template>
            </el-table-column>
            <!-- 表格行操作栏 -->
            <el-table-column prop="menu" fixed="right" label="操作" :width="130" align="center">
              <template>
                <el-button :size="option.size" type="text">查看</el-button>
                <el-button :size="option.size" type="text">编辑</el-button>
                <el-button :size="option.size" type="text" style="color:red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <!-- 表格滚动条START -->
      <el-row class="div-scroll-bg">
        <div ref="div-table-scroll" class="div-table-scroll">
          <div ref="table-scroll-box" :style="{ 'width': tableScrollBoxWidth + 'px' }" class="table-scroll-box" />
        </div>
      </el-row>
      <!-- 表格滚动条END -->
    </div>
    <!-- 表格END -->

    <!-- 分页START -->
    <div class="footer">
      <el-row>
        <div class="div-pagination">
          <el-pagination align="right" background :current-page="page.currentPage" :page-sizes="[50, 100, 500, 1000]"
            :page-size="page.pageSize" layout="prev, pager, next,sizes" :total="page.total" @size-change="sizeChange"
            @current-change="currentChange" />
        </div>
      </el-row>
      <!-- 分页END -->
    </div>
    <!-- 表单START -->
    <el-dialog :title="title" :visible.sync="formDialogShow" width="800px" height="200px" :before-close="beforeClose"
      append-to-body>
      <div style="max-height: 600px; overflow-y: scroll">
        <el-form ref="form" :disabled="formDisabled" :size="option.size" :model="dialogForm" label-width="140px">
          <!-- 表单字段 -->
          <el-row>
            <el-col :span="18">
              <el-form-item label="客户名称" prop="customerName">
                <el-input v-model="dialogForm.customerName" placeholder="请输入客户名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="客户状态" prop="customerStatus">
                <el-input v-model="dialogForm.customerName" placeholder="请输入客户名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input v-model="dialogForm.customerName" placeholder="请输入联系人姓名" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表单按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交</el-button>
        <el-button icon="el-icon-circle-close" :size="option.size" @click="formDialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 表单START -->

  </div>
</template>

<script>
import { getList } from '@/api/table'
import option from '@/options/table.js'
import { tableSetting } from '@/utils/common.js'
import TableEditType from '@/components/TableEditType'
export default {
  components: {
    TableEditType
  },
  data () {
    return {
      queryForm: {
        customerName: '',
        customerStatus: '',
        contactName: '',
        contactPhone: '',
        searchKeywords: '',
        promotionalKeywords: '',
        createUser: '',
      },
      selectOption:[
          {
            value: '1',
            label:'是'
          },
          {
            value: '2',
            label:'否'
          },
        ],
      search: true,
      tableLoading: true,
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 50,
        total: 40
      },
      // 选择行
      selectionList: [],
      title: '',
      formDialogShow: false,
      formDisabled: false,
      dialogForm: {
        customerName: ''
      },
      // 表单配置
      option: option,
      // 表单列表
      tableData: [],
      tableHeight: null,
      // 滚动盒子的宽度
      tableScrollBoxWidth: 1,
      // 可绘制区域高度差（针对浏览器）
      heightDifference: 282,
      // 防抖
      debounceTime: null
    }
  },
  computed: {
    ids () {
      const ids = []
      this.selectionList.forEach(ele => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  created () {
    this.getTableData()
  },
  updated () {
    this.tableSetting()
  },
  mounted () {
    this.tableSetting()
    window.addEventListener('resize', () => {
      if (this.debounceTime !== null) {
        clearTimeout(this.debounceTime)
      }
      this.debounceTime = setTimeout(() => {
        this.tableSetting()
      }, 200)
    })
  },
  methods: {
    searchChange () { },
    searchReset () { },
    handleAdd () { },
    handleImport () { },
    handleExport () { },
    handleDelete () { },
    searchHide () { },
    selectionChange (list) {
      this.selectionList = list
    },
    selectionClear () {
      this.selectionList = []
      this.$refs.table.clearSelection()
    },
    currentChange (currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange (pageSize) {
      this.page.pageSize = pageSize
    },
    tableCellBlur (editForm, isEidt = true, variableName) {
      this.form = {}
      this.form.id = editForm.id
      this.form[variableName] = editForm[variableName]
      if (isEidt) {
        this.handleSubmit()
      }
    },
    // 表格的设置
    tableSetting () {
      const arr = tableSetting(this.heightDifference)
      this.tableHeight = arr[0]
      this.tableScrollBoxWidth = arr[1]
      this.$refs.table.doLayout()
    },
    getTableData () {
      this.tableLoading = true
      getList().then(res => {
        this.tableData = res.data.items
        this.tableLoading = false
        this.selectionClear()
      })
    },
    beforeClose (done) {
      done()
      this.form = {}
      this.formDialogShow = false
    },
    handleSubmit () {
      this.formDialogShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
</style>
