<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible="mainDialogVisible"
    width="45%"
    :before-close="handleClose"
    append-to-body
    :fullscreen="dialogFullScreen"
    :class="[dialogFullScreen ? 'fullscreen' : 'no_fullscreen']"
  >
    <template slot="title">
      <div class="custom_dialog_header">
        <span class="el_dialog_title">{{ title }}</span>
        <div class="custom_dialog_menu" @click="dialogFullScreen = !dialogFullScreen">
          <i class="el-icon-full-screen" />
        </div>
      </div>
    </template>
    <div :class="[dialogFullScreen ? 'richmain' : 'richmaintwo']">
      <quill-editor
        ref="richTextEditor"
        v-model="content"
        class="ql-editor"
        :options="editorOption"
        :class="[dialogFullScreen ? 'editor' : 'editortwo']"
      />
    </div>
    <div class="footkuang">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-circle-check" size="small" @click="handleSubmitrichtext">提交</el-button>
        <el-button icon="el-icon-circle-close" size="small" @click="handleClose">取 消</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { Base64 } from 'js-base64'
import * as Quill from 'quill'
// 设置字体大小
const fontSizeStyle = Quill.import('attributors/style/size') // 引入这个后会把样式写在style上
fontSizeStyle.whitelist = [
  '12px',
  '14px',
  '16px',
  // "18px",
  '20px',
  '24px',
  // "28px",
  // "32px",
  '36px'
]
Quill.register(fontSizeStyle, true)
// 设置字体样式
const Font = Quill.import('attributors/style/font') // 引入这个后会把样式写在style上
const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong']
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)
// 工具栏
// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
//   [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
//   [{ align: [] }], // 对齐方式-----[{ align: [] }]
//   [{ size: fontSizeStyle.whitelist }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
//   [{ font: fonts }], // 字体种类-----[{ font: [] }]
//   [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
//   [{ direction: "ltl" }], // 文本方向-----[{'direction': 'rtl'}]
//   [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
//   [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
//   [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
//   [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
//   ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
//   ["clean"], // 清除文本格式-----['clean']
//   ["link", "image", "video"], // 链接、图片、视频-----['link', 'image', 'video']
// ];

export default {
  name: '',
  components: {
    quillEditor
  },
  props: {
    mainDialogVisible: {
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
      default: '编辑文本'
    }
  },
  data() {
    return {
      dialogFullScreen: false,
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{ direction: "ltl" }], // 文本方向
            [{ direction: 'rtl' }], // 文本方向
            [{ size: [...fontSizeStyle.whitelist] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: fonts }], // 字体
            [{ align: [] }], // 对齐方式
            ['link'], // ["link", "image", "video"], //上传图片、上传视频
            ['clean'] // 清除字体样式
          ]
          // toolbar:{
          //   container: toolbarOptions,
          // }
        },
        placeholder: '请输入正文'
      }
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    this.content = this.editValue
  },
  methods: {
    handleClose() {
      this.$emit('update:mainDialogVisible', false)
    },
    handleSubmitrichtext() {
      this.$emit('update:editValue', Base64.encode(this.content))
      this.$parent.tableCellBlur()
    }
  }
}
</script>
<style>
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "默认";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.ql-snow .ql-stroke,
.ql-snow .ql-picker {
  color: #999;
  stroke: #999;
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: #999;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
}

.ql-container {
  font-size: 14px;
}
</style>

<style lang='scss' scoped>
@import "@/styles/common.scss";

/deep/ .custom_dialog_header {
  display: flex;
  justify-content: space-between;
}

/deep/ .custom_dialog_menu {
  padding: 4px 30px 0 0;
}

/deep/ .custom_dialog_menu i {
  color: #909399;
  font-size: 15px;
}

/deep/ .el-icon-full-screen {
  cursor: pointer;
}

//富文本编辑器
.editor {
  height: 100%;
}

.editortwo {
  height: 100%;
}

.richmain {
  height: calc(100vh - 200px);
}

.richmaintwo {
  height: 600px;
}

/* 表格的内容 */
.contentmain {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.conmainleft {
  width: 50%;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.conmainright {
  width: 100%;
  height: 30px;
  overflow: hidden;
}

/*  */
/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(2) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(3) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(4) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(5) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(6) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(7) {
  display: none;
}

/deep/ .ql-toolbar.ql-snow .ql-formats:nth-child(13) {
  display: none;
}

/deep/.el-dialog__body {
  padding: 0;
}

.quill-editor {
  overflow: inherit;
  padding: 0;
  white-space: inherit;

}

/deep/ .ql-container {
  white-space: pre-wrap;
  padding-bottom: 50px;
}
</style>
