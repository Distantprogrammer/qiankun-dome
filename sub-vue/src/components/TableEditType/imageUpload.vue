<template>
  <el-dialog :title="title" :visible="imgdialogVisible" width="30%" :before-close="handleClose" append-to-body>
    <div>
      <el-form ref="imgrowForm" :model="thumbnail">
        <el-form-item :label="title + ':'" class="imgrowFormitem">
          <el-upload
            class="avatar-uploader"
            :headers="header"
            action="/api/blade-resource/oss/endpoint/put-file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="thumbnail"
              :src="thumbnail"
              style="max-width: 100px;max-height: 100px;border: 0px solid rgb(221, 221, 221)"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 30px" />
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="handleSubmitImgRow">提交</el-button>
      <el-button icon="el-icon-circle-close" size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    imgdialogVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    editValue: {
      type: [String, Array],
      default: ''
    },
    title: {
      type: String,
      default: '编辑图片'
    }

  },
  data() {
    return {
      thumbnail: ''
    }
  },
  computed: {
    //  //  设置图片上传请求头
    //  header (){
    //   return {"Blade-Auth":
    //       "bearer " +
    //       JSON.parse(localStorage.getItem(website.key + "-token")).content,}
    // }
  },
  watch: {},
  created() { },
  mounted() {
    this.thumbnail = this.editValue
  },
  methods: {
    handleClose() {
      this.$emit('update:imgdialogVisible', false)
    },
    handleSubmitImgRow() {
      this.$emit('update:editValue', this.thumbnail)
      this.$parent.tableCellBlur()
    },
    /* 图片上传 */
    handleAvatarSuccess(response) {
      this.thumbnail = response.data.link
    },
    beforeAvatarUpload() { }
  }
}
</script>

<style lang='scss' scoped>
@import "@/styles/common.scss";

.avatar-uploader {
  width: 100px;
  height: 100px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
