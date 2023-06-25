<template>
  <div>
    <div class="textEditing_content">
      <pre ref="editorContainer" class="editor" @keydown.ctrl.83.prevent="save"></pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    textareaValue: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    }
  },
  data () {
    return {
      dialogVisible: true,
      code: '',
      editor: null,
      editorOptions: {
        value: '',
        language: 'javascript',
        tabSize: 2,
        scrollBeyondLastLine: false,
        automaticLayout: true, // 自动布局
        readOnly: false,
        foldingStrategy: 'indentation',
        folding: true,
        fontSize: 16,
        theme: 'vs-dark',
      },
      // 编辑器配置 可以参考官网配置
      bianjiqiOptios: {
        // value: '', // 编辑器初始显示文字
        // language: 'javaScript', // 语言支持自行查阅demo
        // automaticLayout: true, // 自动布局
        // foldingStrategy: 'indentation', // 代码可分小段折叠
        // autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        // autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
        // autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
        // autoIndent: 'None', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
        // comments: {
        //   ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
        //   insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
        // }, // 注释配置
        // //
        // cursorBlinking: 'Solid', // 光标动画样式
        // cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        // cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
        // cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
        // cursorWidth: 2, // <=25 光标宽度
        // minimap: { // 关闭代码缩略图
        //   enabled: false // 是否启用预览图
        // },
        // selectOnLineNumbers: true,
        // roundedSelection: false,
        // readOnly: false, // 只读
        // cursorStyle: "line", //光标样式
        // glyphMargin: true, //字形边缘
        // useTabStops: false,
        // fontSize: 28, //字体大小
        // quickSuggestionsDelay: 500, //代码提示延时
        // overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
        // folding: true, // 是否启用代码折叠
        // scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
        // renderLineHighlight: 'all', // 当前行突出显示方式  "all" | "line" | "none" | "gutter"
        // theme: 'vs-dark' // 官方自带三种主题vs, hc-black, or vs-dark
      }
    };
  },
  created () {
    this.editorOptions.value = this.textareaValue
    this.editorOptions.language = this.language =='element'? 'html':this.language
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化编辑器
      // eslint-disable-next-line no-undef
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        ...this.editorOptions,// 编辑器配置
      })
      // eslint-disable-next-line no-undef
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      // 监听内容变化
      this.editor.onDidChangeModelContent(() => {
      })
      // 监听失去焦点事件
      this.editor.onDidBlurEditorText(() => {
      });
    },
    // 获取编辑框内容
    getCodeContext () {
      return this.editor.getValue()
    },
    // 自动格式化代码
    format () {
      this.editor.trigger('anything', 'editor.action.formatDocument')
      // 或者
      // this.editor.getAction(['editor.action.formatDocument']).run()
    },
    changeEditor () {
      if (this.editor === null) {
        this.init()
      }
      const oldModel = this.editor.getModel()
      // eslint-disable-next-line no-undef
      const newModel = monaco.editor.createModel(
        this.code,
        'javascript'
      )
      if (oldModel) {
        oldModel.dispose()
      }
      this.editor.setModel(newModel)
    },
    // 保存
    save () {
      this.$emit('input', this.getCodeContext(), 'save')
    },
  },
  beforeDestroy () {
    this.$emit('input', this.getCodeContext(), 'close')
    this.editor.dispose();
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/common.scss";
.textEditing_content {
  width: 100%;
  height: 100%;
  text-align: left;
  // width: 1400px;
  // height: 500px;
  // z-index: 200;
  // background-color: #000;
}

.editor {
  width: 100%;
  height: 100%;
  min-height: 500px;

}
pre {
  margin: 0;
}
</style>
