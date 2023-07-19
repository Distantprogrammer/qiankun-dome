<script setup>
import { onMounted, ref, toRaw, reactive } from "vue";
import mitt from '@/utils/mitt.js'
import request from '@/api/request.js'
import * as monaco from "monaco-editor";
const codeContent = ref("");
const editorContainer = ref(null);
const editor = ref(null);
const editorTheme = ref("vs-dark");
const editData = ref('')
const editorOptions = reactive({
  value: '',
  theme: editorTheme.value, // 主题
  language: "javascript",
  folding: true, // 是否折叠
  foldingHighlight: true, // 折叠等高线
  foldingStrategy: "indentation", // 折叠方式  auto | indentation
  showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
  disableLayerHinting: true, // 等宽优化
  emptySelectionClipboard: false, // 空选择剪切板
  selectionClipboard: false, // 选择剪切板
  automaticLayout: true, // 自动布局
  codeLens: false, // 代码镜头
  scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
  colorDecorators: true, // 颜色装饰器
  accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
  lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
  lineNumbersMinChars: 5, // 行号最小字符   number
  readOnly: false, //是否只读  取值 true | false
})
mitt.on('handleChange',handleChange)
onMounted(() => {
  editor.value = monaco.editor.create(editorContainer.value, { ...editorOptions });
  // // 监听内容变化
  // editor.value.onDidChangeModelContent((e) => { });
  // console.log(editor.value, "监听内容变化");
  // // 监听失去焦点事件
  // editor.value.onDidBlurEditorText((e) => { 
  //   console.log(editor.value, "监听失去焦点事件");
  // });
});
// 接收文件目录地址
function handleChange(data){
  editData.value = data
  console.log(data);
  request.get('/readFile',{location:data.location}).then(res => {
    toRaw(editor.value).setValue(res.data)
   }) 
}
// 获取编辑框内容
function getCodeContext () {
  codeContent.value = toRaw(editor.value).getValue();
  return codeContent.value
}
// 自动格式化代码
function format () {
  toRaw(editor.value).trigger("anything", "editor.action.formatDocument");
}
// 修改主题
function handleTheme () {
  monaco.editor.setTheme("vs");
}
function save (e) {
  if (!editData.value.location) return 
  const key = window.event.keyCode ? window.event.keyCode : window.event.which;
  if (key === 83 && e.ctrlKey) {
    request.post('/writeFile',{
      location:editData.value.location,
      text:getCodeContext()
    })
  }
}
</script>

<template>
  <div id="editorContainer" ref="editorContainer" @keydown.ctrl.prevent="save"></div>
</template>

<style lang="scss" scoped>
#editorContainer {
  width: 100%;
  height: 100%;
}
</style>