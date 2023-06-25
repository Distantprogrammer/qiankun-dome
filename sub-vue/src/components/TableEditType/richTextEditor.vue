<template>
  <el-dialog v-dialogDrag :title='title' :close-on-click-modal="false" :visible="mainDialogVisible" width="45%"
    :before-close="handleClose" append-to-body :fullscreen="dialogFullScreen"
    :class="[dialogFullScreen ? 'fullscreen' : 'no_fullscreen']">
    <template slot="title">
      <div class="custom_dialog_header">
        <span class="el_dialog_title">{{ title }}</span>
        <div class="custom_dialog_menu" @click="dialogFullScreen = !dialogFullScreen">
          <i class="el-icon-full-screen"></i>
        </div>
      </div>
    </template>
    <div :class="[dialogFullScreen ? 'richmain' : 'richmaintwo']">
      <div style="height: 100%; ">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor  style="height: 92%; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
          @onCreated="onCreated" @onChange="onChange" @onDestroyed="onDestroyed" @onMaxLength="onMaxLength"
          @onFocus="onFocus" @onBlur="onBlur" @customAlert="customAlert" @customPaste="customPaste" />
        <!-- <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
            @onDestroyed="onDestroyed"
            @onMaxLength="onMaxLength"
            @onFocus="onFocus"
            @onBlur="onBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
        /> -->
      </div>
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
import { Base64 } from 'js-base64';
// import { getToken } from "@/util/auth";
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const getToken = ~~(Math.random() * 10000000000000000) + ''; // 生成一个随机字符串，防止伪造签名
export default {
  name: '',
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
  components: { Editor, Toolbar },
  data () {
    return {
      token: "",
      dialogFullScreen: false,
      content: "",
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...', MENU_CONF: {} },
      mode: 'default', // or 'simple'
    }
  },
  created () {
    this.setToken()
    
    this.optionEditorConfig()
  },
  watch: {},
  mounted () {
    console.log(this.editValue);
  },
  methods: {
    setToken () {
      this.token = "bearer " + getToken()
    },
    optionEditorConfig () {
      const _this = this
      this.editorConfig.MENU_CONF['uploadImage'] = {
        server: '/api/blade-resource/oss/endpoint/put-file',
        fieldName: 'file',
        timeout: 50 * 1000, // 50s
        // 自定义增加 http  header
        headers: {
            'Accept': '*/*',
            'Blade-Auth': this.token
        },

        maxFileSize: 10 * 1024 * 1024, // 10M
        onBeforeUpload (file) {
          console.log(file);
          return file // will upload this file
          // return false // prevent upload
        },
        onProgress () {
          _this.$message.warning("图片正在上传请稍后")
        },
        onSuccess (file) {
          _this.$message.success(`${file.name} 上传成功`)
        },
        onFailed (file) {
          _this.$message.error(`${file.name} 上传成功但插入数据错误`)
        },
        onError (file, err, res) {
          console.log(file, err, res);
          _this.$message.error(`${file.name} 上传出错`)
        },
        // 自定义插入图片
          customInsert({data}, insertFn) {   
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(data.link, data.originalName, data.link)
        },
      },
        this.editorConfig.MENU_CONF['uploadVideo'] = {
          fieldName: '/api/blade-resource/oss/endpoint/put-file',

          // 单个文件的最大体积限制，默认为 10M
          maxFileSize: 5 * 1024 * 1024, // 5M

          // 最多可上传几个文件，默认为 5
          maxNumberOfFiles: 3,

          allowedFileTypes: ['video/*'],

          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: false,

          headers: {
            'Accept': '*/*',
            'Blade-Auth': this.token
        },
          // 超时时间，默认为 30 秒
          timeout: 150 * 1000, // 150 秒

          // 视频不支持 base64 格式插入
          // 上传之前触发
          onBeforeUpload (file) {
            // file 选中的文件，格式如 { key: file }
            return file

            // 可以 return
            // 1. return file 或者 new 一个 file ，接下来将上传
            // 2. return false ，不上传这个 file
          },

          // 上传进度的回调函数
          onProgress (progress) {
            // progress 是 0-100 的数字
            console.log('progress', progress)
          },

          // 单个文件上传成功之后
          onSuccess (file, res) {
            console.log(`${file.name} 上传成功`, res)
          },

          // 单个文件上传失败
          onFailed (file, res) {
            console.log(`${file.name} 上传失败`, res)
          },

          // 上传错误，或者触发 timeout 超时
          onError (file, err, res) {
            console.log(`${file.name} 上传出错`, err, res)
          },
            // 自定义插入图片
            customInsert({data}, insertFn) {   
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(data.link, data.originalName, data.link)
        },
        }
    },
    onCreated (editor) {
      this.editor = Object.seal(editor)
      this.editor.setHtml(this.editValue)
    },
    // onChange(editor) { console.log('onChange', editor.children) },
    // onDestroyed(editor) { console.log('onDestroyed', editor) },
    // onMaxLength(editor) { console.log('onMaxLength', editor) },
    // onFocus(editor) { console.log('onFocus', editor) },
    // onBlur(editor) { console.log('onBlur', editor) },
    // customAlert(info, type) { window.alert(`customAlert in Vue demo\n${type}:\n${info}`) },
    // customPaste(editor, event, callback) {
    //     console.log('ClipboardEvent 粘贴事件对象', event)
    //     // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    //     // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    //     // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    //     // 自定义插入内容
    //     editor.insertText('xxx')

    //     // 返回 false ，阻止默认粘贴行为
    //     event.preventDefault()
    //     callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

    //     // 返回 true ，继续默认的粘贴行为
    //     // callback(true)
    // },
    insertText () {
      const editor = this.editor // 获取 editor 实例
      if (editor == null) return
    },
    handleClose () {
      this.$emit('update:mainDialogVisible', false)
    },
    handleSubmitrichtext () {
      this.$emit('update:editValue', Base64.encode(this.editor.getHtml()))
      console.log(this.editor.getHtml());
      this.$parent.tableCellBlur()
    }
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>
<style>
.editor-content-view {
  border: 3px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 20px;
  overflow-x: auto;
}

.editor-content-view p,
.editor-content-view li {
  white-space: pre-wrap;
  /* 保留空格 */
}

.editor-content-view blockquote {
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}

.editor-content-view code {
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
  border-radius: 3px;
}

.editor-content-view pre>code {
  display: block;
  padding: 10px;
}

.editor-content-view table {
  border-collapse: collapse;
}

.editor-content-view td,
.editor-content-view th {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}

.editor-content-view th {
  background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
  padding-left: 20px;
}

.editor-content-view input[type="checkbox"] {
  margin-right: 5px;
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
  height: calc(100vh - 50px);
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

/deep/.el-dialog__body {
  padding: 0;
}
</style>
