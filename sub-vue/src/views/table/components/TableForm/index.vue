<template>
  <el-dialog :title="title" :visible.sync="formDialogShow" width="800px" height="200px" :before-close="beforeClose" append-to-body>
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
</template>

<script>
import option from '@/options/table.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      title: '',
      formDialogShow: true,
      option: option,
      formDisabled: false,
      dialogForm: {
        customerName: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    beforeClose(done) {
      done()
      this.form = {}
      this.formDialogShow = false
    },
    handleSubmit() {
      this.formDialogShow = false
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./styles/TableForm.scss";
</style>
