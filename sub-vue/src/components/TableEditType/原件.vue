<template>
  <div class="tableEidtType">
    <div class="table-handle" v-if="editType == 'input'">
      <el-input v-bind="$attrs" v-on="$listeners" v-focus class="table-input" @focus="inputFocus(editForm[variableName])"
                :ref="variableName + index" @blur="tableCellBlur(row, 'blur')" @keyup.enter.native="tableCellBlur(row, 'keyup')"
                v-if="tableInputreadonly == variableName + index" v-model="editForm[variableName]">
      </el-input>
      <div class="table-data" v-else>
        <span>{{ editForm[variableName] }}</span>
      </div>
      <span class="el-input__suffix" v-if="tableInputreadonly != variableName + index">
        <span class="el-input__suffix-inner">
          <i slot="suffix" class="el-icon-edit" @click="tableCellEdit(variableName + index, row)"></i></span>
      </span>
    </div>
    <div class="table-handle" style="justify-content: center;" v-else-if="editType == 'textarea'">
      <div class="table-textarea">
        <el-dialog v-dialogDrag :modal='false' :before-close="textareaClose" :show-close="false" :destroy-on-close="false"
                   :fullscreen.sync="textareaFullscreen" :visible="textareaDialogShow" class="avue-dialog avue-dialog--top" width="70%">
          <div slot="title" class="avue-dialog__title">
            <div class="dialog-window">
              <div class="window_title">
                <span class="window_title_text">{{ row.id.slice(row.id.length-5,row.id.length) }}</span>
                <span class="window_title_text window_title_button" @click="save">保存</span>
              </div>
              <div class="window_btn">
                <button class="icon_minus" @click="textareaMinus('minsize')"><i class="el-icon-minus"></i></button>
                <button class="icon_screen" @click="textareaScreen"><i :class="[textareaFullscreen? 'el-icon-copy-document':'el-icon-full-screen']"></i></button>
                <button class="icon-close" @click="textareaClose"><i class="el-icon-close"></i></button>
              </div>
            </div>
          </div>
          <textEditing ref="monaco" style="width: 100%;height: 100%;" :language="language" :textareaValue="textareaValue"
                       @input="textareaInput" v-if="tableInputreadonly == variableName + index" :index="index" />
        </el-dialog>
        <div class="table-data" >
          <el-button size="mini"  type="text" @click="tableCellEdit(variableName + index, row)">编辑</el-button>
        </div>
        <!-- <div class="table-data">
          <span>{{ editForm[variableName] }}</span>
        </div>
        <span class="el-input__suffix" v-if="!textareaMinsizeDetail.id && tableInputreadonly != variableName + index">
          <span class="el-input__suffix-inner">
            <i slot="suffix" class="el-icon-edit" @click="tableCellEdit(variableName + index, row)"></i></span>
        </span> -->
        <div class="textarea_maxsize" :style="{'left':260+60*index+'px'}" v-if="textareaMinsizeDetail.id" @click="textareaMinus('maxsize',textareaMinsizeDetail.id)">
          {{ row.id.slice(row.id.length-5,row.id.length) }}
        </div>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'select-tag'">
      <div class="table-select is-select-tag">
        <div class="select-value"
             @click="tableCellEdit(variableName + index, 'click'), inputFocus(editForm[variableName])"
             v-if="!editForm[variableName]">{{ selectOptionEnum(editForm[variableName]) || placeholder }}
        </div>
        <div class="select-value"
             @click="tableCellEdit(variableName + index, 'click'), inputFocus(editForm[variableName])" v-else>
          <el-tag :type="tagEnum[editForm[variableName]]" v-if="!filterable" size="small">
            {{ selectOptionEnum(editForm[variableName]) }}
          </el-tag>
          <el-input v-model="selectSearchValue" v-else type="text" @input="filterMethod(variableName + index)"
                    :value="selectOptionEnum(editForm[variableName])" />
        </div>
        <el-select v-bind="$attrs" @visible-change="typeVisible()" filterable v-on="$listeners"
                   @change="tableCellBlur(row, 'blur')" :ref="variableName + index" v-model="editForm[variableName]"
                   :placeholder="placeholder">
          <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left"><el-tag :type="tagEnum[item.value]" size="small">{{ item.label || item.value
              }}</el-tag></span>
            <span style="float: right; color: #8492a6; font-size: 13px" v-if="editForm[variableName] == item.value"><i
              class="el-icon-check"></i></span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'select'">
      <div class="table-select">
        <el-select v-bind="$attrs" @visible-change="typeVisible()" :filterable="filterable" v-on="$listeners"
                   @change="tableCellBlur(row, 'blur')" :ref="variableName + index" v-model="editForm[variableName]"
                   :placeholder="placeholder">
          <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'date'">
      <el-date-picker v-bind="$attrs" v-on="$listeners" type="date" @focus="inputFocus(editForm[variableName])"
                      v-model="editForm[variableName]" :clearable="false" class="table-date" :ref="variableName + index"
                      @blur="tableCellBlur(row, 'blur')" :value-format="valueFormat">
      </el-date-picker>
    </div>
    <div class="table-handle" v-else-if="editType == 'datetime'">
      <el-date-picker v-bind="$attrs" v-on="$listeners" type="datetime" @focus="inputFocus(editForm[variableName])"
                      v-model="editForm[variableName]" :clearable="false" class="table-date" :ref="variableName + index"
                      @blur="tableCellBlur(row, 'blur')" :value-format="valueFormat">
      </el-date-picker>
    </div>
    <div class="table-handle" v-else-if="editType == 'readonly'">
      {{ row[variableName] }}
    </div>
    <div class="table-handle table-switch" v-else-if="editType == 'switch'">
      <el-switch width="40" :active-value="1" :inactive-value="0"
                 v-model="editForm[variableName]"  @change="tableCellBlur(row, 'blur')">
      </el-switch>
    </div>
    <div class="table-handle" v-else>
      {{ row[variableName] }}
    </div>
  </div>
</template>

<script>
import textEditing from './textEditing'
export default {
  name: '',
  /**
   * @param {Object} row 行数据
   * @param {String} editType forbid不可编辑 编辑类型
   * @param {String} variableName 编辑字段
   * @param {Number} index 行索引
   * @param {Array} selectOption 下拉框数据
   * @param {String} valueFormat 日期格式
   * @param {Boolean} filterable 是否可搜索
   * @param {String} placeholder 占位符
   * @param {Object} tagEnum tag标签的枚举
   * @param {String} language 代码编辑器语言
   */
  props: {
    row: {
      type: Object,
      default: () => { }
    },
    editType: {
      type: String,
      default: 'forbid'
    },
    variableName: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    selectOption: {
      type: Array,
      default: () => { return [] }
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    tagEnum: {
      type: Object,
      default: () => {
        return {
          '-1': 'warning',
          1: 'warning',
          10: 'warning',
          20: 'danger',
          30: 'info',
          40: 'warning',
          50: 'success',
          undefined: '',
          null: ''
        }
      }
    }
  },
  components: {
    textEditing
  },
  data () {
    return {
      // 哪一个表格输入框开启编辑状态
      tableInputreadonly: '',
      selectSearchValue: '',
      textareaFullscreen: false, // textarea弹窗全屏
      textareaValue: '', // textarea弹窗内容
      textareaMinsizeDetail: {}, // textarea弹窗最小化时的内容
      // // tag标签的枚举
      // tagEnum: ,
    }
  },
  created () {

    if (this.editType == 'textarea')this.textareaValue = this.row[this.variableName]
  },
  updated () {

    if (this.editType == 'textarea')this.textareaValue = this.row[this.variableName]
  },
  computed: {
    editForm () {
      return this.row
    },
    textareaDialogShow () {
      return this.tableInputreadonly == this.variableName + this.index
    }
  },
  watch: {
  },
  mounted () { },
  methods: {
    /**
     * @param { String } event ref值
     * @param { String } eType 事件类型
     */
    tableCellEdit (event, eType) {
      this.tableInputreadonly = event;
      // 下拉框
      if (eType == 'click') {
        this.selectSearchValue = this.editForm[this.variableName]
        // 操作select源码
        this.$refs[event].visible = true
      }
    },
    // 下拉框搜索
    filterMethod (event) {
      this.$refs[event].handleQueryChange(this.selectSearchValue)
    },
    inputFocus (value) {
      this.editValue = value
    },
    tableCellBlur (row, event) {
      this.tableInputreadonly = '';
      this.editForm = row
      if (event == 'blur') {
        // 判断是否修改了值
        if (this.editForm[this.variableName] == this.editValue) {
          this.$emit('tableCellBlur', this.editForm, false, this.variableName, this.index)
        } else {
          this.$emit('tableCellBlur', this.editForm, true, this.variableName, this.index)
          // this.$confirm("确定更改吗？").then(() => {
          //   this.$emit('tableCellBlur', this.editForm, true, this.variableName)
          // }).catch(() => {
          //   this.editForm[this.variableName] = this.editValue

          //   this.$emit('tableCellBlur', this.editForm, false, this.variableName)
          // })
        }
      }


    },
    // 点击保存文本
    save(){
      this.$refs.monaco.save()
    },
    typeVisible () {
      this.$emit('typeVisible')
    },
    selectOptionEnum (selectedValue) {
      const selectedOption = this.selectOption.find((option) => option.value == selectedValue);
      const selectedLabel = selectedOption ? selectedOption.label : selectedValue;
      // this.selectSearchValue =  selectedLabel
      return selectedLabel;
    },
    // 最小化与取消最小化
    textareaMinus (type,event) {
      if (type == 'minsize') {
        this.tableInputreadonly = ''
        this.textareaMinsizeDetail={
          id: this.variableName + this.index,
          index: this.index,
          value: this.textareaValue,
          variableName: this.variableName
        }
      }else {
        this.tableInputreadonly = event;
        this.textareaValue = this.textareaMinsizeDetail.value
        this.textareaMinsizeDetail = {}
      }
    },
    // 全屏
    textareaScreen () {
      this.textareaFullscreen = !this.textareaFullscreen
    },
    // 关闭
    textareaClose () {
      this.tableInputreadonly = ''
      this.textareaValue = ''
    },
    // 文本域保存或关闭
    textareaInput(value,type){
      if (type=='save') {
        this.tableInputreadonly = ''
        this.editForm[this.variableName] = value
        this.$emit('tableCellBlur', this.editForm, true, this.variableName, this.index)
      }else{
        this.textareaValue = value
        this.textareaMinsizeDetail.value = value
      }
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
// 开关样式
.table-switch {
  /deep/ .el-switch__core {
    width: 32px !important;
    height: 14px;
    &::after {
      width: 10px;
      height: 10px;
    }
  }
  /deep/ .is-checked {
    .el-switch__core {
      &::after {
        margin-left: -12px;
      }
    }
  }
}
//
.tableEidtType {
  width: 100%;
  height: 100%;
}

.table-handle {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  // padding: 0 10px;
  /deep/.el-input {
    font-size: 12px;
  }

  .table-data {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  /deep/.el-input__suffix {
    display: none;
  }

  .el-icon-edit {
    font-size: 14px;

    &:hover {
      cursor: pointer;
      color: rgb(27, 154, 238);
    }
  }
}

/deep/.el-input__inner {
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 30px;
  color: #666666;
}

.table-input {
  width: 100%;
  height: 100%;
  font-size: 12px;

  &:focus-within {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    padding: 0 10px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #c5a5a5;
  }
}

.table-date {
  /deep/.el-input__icon {
    display: none;
    height: 100%;
    padding: 0;
    line-height: 30px;
    color: #666666;
  }
}

.table-select {
  width: 100%;
  height: 100%;

  .select-value {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .el-input {
      width: 90%;
    }

    /deep/.el-tag {
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /deep/.el-select {
    .el-input__icon {
      line-height: 30px;
    }



  }


}

.is-select-tag {
  /deep/.el-select {
    .el-input {
      visibility: hidden;
    }
  }
}

.table-textarea {
  /deep/.el-dialog__header {
    padding: 0;
    margin: 0;
    padding: 0 20px;
    background-color: #3c3c3c;
    border-bottom: none;
    box-shadow: 2px 2px 5px#333333;
  }

  /deep/.el-dialog__headerbtn {
    display: none;
  }

  /deep/.el-dialog__body {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  /deep/.el-dialog.is-fullscreen {
    left: 50% !important;
    right: 50% !important;
    top: 0 !important;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }

  .avue-dialog__title {
    width: 100%;
    height: 100%;
  }
  .textarea_maxsize{
    color: #fff;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #000;
    position: fixed;
    z-index: 100;
    bottom: 10px;
    left: 260px;
  }
  .dialog-window {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .window_title {
      color: #fff;
      font-size: 16px;

      .window_title_text {
        margin: 0 10px;
      }
      .window_title_button{
        cursor: pointer;
      }
    }

    .window_btn {

      .icon_minus,
      .icon_screen,
      .icon-close {
        margin: 0 10px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
      }
    }

  }
}
</style>
