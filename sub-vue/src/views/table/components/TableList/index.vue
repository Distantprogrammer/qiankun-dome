<template>
  <div class="body">
    <el-row>
      <div class="div-table-body">
        <el-table
          ref="table"
          v-loading="tableLoading"
          :max-height="tableHeight"
          :size="option.size"
          :data="tableData"
          style="width: 100%"
          :border="option.border"
          element-loading-text="Loading"
          fit
          highlight-current-row
          @selection-change="selectionChange"
        >
          <el-table-column v-if="option.selection" type="selection" fixed="left" width="55" align="center" />
          <!-- <el-table-column v-if="option.expand" type="expand" align="center" /> -->
          <!-- <el-table-column v-if="option.index" fixed="left" label="#" type="index" width="50" align="center" /> -->
          <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="Title" prop="Title">
            <template scope="{row,$index}">
              <tableEditType
                edit-type="input"
                :index="$index"
                :row="row"
                variable-name="Title"
                @tableCellBlur="tableCellBlur"
              />
            </template>
          </el-table-column>
          <el-table-column label="Author" width="110" align="center" />
          <el-table-column label="Pageviews" width="110" align="center" />
          <el-table-column class-name="status-col" label="Status" width="110" align="center" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <el-table-column align="center" prop="created_at" label="Display_time" width="200" />
          <!-- 表格行操作栏 -->
          <el-table-column prop="menu" fixed="right" label="操作" :width="130" align="center">
            <template slot-scope="{row}">
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
<!--  <div class="footer">-->
<!--     <el-row>-->
<!--        <div class="div-pagination">-->
<!--          <el-pagination :current-page="page.currentPage" :page-size="page.pageSize" :page-sizes="[50, 100, 500, 1000]"-->
<!--            :total="page.total" align="right" background layout="total,prev, pager, next,sizes" @size-change="sizeChange"-->
<!--            @current-change="currentChange" />-->
<!--        </div>-->
<!--      </el-row>-->
<!--  </div>-->
</template>

<script>
import { getList } from '@/api/table'
import option from '@/options/table.js'
import { handleExport, handleTemplate, tableSetting, confirmShow } from '@/utils/common.js'
import TableEditType from '@/components/TableEditType'
export default {
  components: {
    TableEditType
  },
  data() {
    return {
      tableLoading: true,
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 50,
        total: 40
      },
      // 选择行
      selectionList: [],
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
    ids() {
      const ids = []
      this.selectionList.forEach(ele => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  created() {
    this.getTableData()
  },
  updated() {
    this.tableSetting()
  },
  mounted() {
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
    selectionChange(list) {
      this.selectionList = list
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.table.clearSelection()
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.onLoad(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.onLoad(this.page)
    },
    tableCellBlur(editForm, isEidt = true, variableName) {
      this.form = {}
      this.form.id = editForm.id
      this.form[variableName] = editForm[variableName]
      if (isEidt) {
        this.handleSubmit()
      }
    },
    // 调用接口完刷新数据
    refreshData() {
      this.onLoad(this.page)
      this.$message({ type: 'success', message: '操作成功!' })
    },
    // 表格的设置
    tableSetting() {
      const arr = tableSetting(this.heightDifference)
      this.tableHeight = arr[0]
      this.tableScrollBoxWidth = arr[1]
      this.$refs.table.doLayout()
    },
    getTableData() {
      this.tableLoading = true
      getList().then(res => {
        this.tableData = res.data.items
        this.tableLoading = false
        this.selectionClear()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
</style>
