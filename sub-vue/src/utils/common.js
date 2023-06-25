/**
 * 本文件为公共方法 使用时按需引入即可
 */
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import Vue from 'vue'
// import { getToken } from "@/util/auth"

const confirmOptions = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
const messageOptions = { type: 'success', message: '操作成功!' }

/**
 * 简化axios请求前的询问
 * @param { String } message 询问内容
 * @param { String } confirmButtonText 确定按钮文字
 * @param { String } cancelButtonText 取消按钮文字
 * @param { String } type 询问框类型
 */
export const confirmShow = (message = '确定要进行此次操作', confirmButtonText = '确定', cancelButtonText = '取消', type = 'warning') => {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

/**
 * 导出数据  需修改
 * @param { String } fun 导出地址
 *exportData(ids)
 */
export const handleExport = (fun) => {
  MessageBox.confirm('是否导出数据?', '提示', confirmOptions)
    .then(() => { window.open(fun) })
    .then(() => { Message(messageOptions) })
}

/**
 *下载导入模板
 *@param { Function,String } fun 下载地址
 *downloadImportTemplate()
 */
export const handleTemplate = (fun) => {
  window.open(fun)
}

/**
 * 表格的固定高度 与 滚动条设置 本方法在mounted中调用 需要获取dom元素 通过外层dom控制elementui的table的x轴滚动条
 * 多个表格时需要给表格外层嵌套一层div 并给div设置class名 传入格式与css查找元素一致
 * @param { Number } heightDifference 表格高度差值
 * @param { String } bodyWrapper element ui表格body的外层div
 * @param { String } tablebBody 表格body
 * @param { String } tableScroll 表格外层div
 * @param { String } outsideClss element ui table外层div的class名
 * @returns { Array } 表格高度与滚动条宽度
 */
export const tableSetting = (heightDifference, outsideClss = '', bodyWrapper = '.el-table__body-wrapper', tablebBody = '.el-table__body', tableScroll = '.div-table-scroll') => {
  const arr = []
  if (document.getElementById('div-search')) {
    arr[0] = window.innerHeight - document.getElementById('div-search').scrollHeight - heightDifference
  } else {
    arr[0] = window.innerHeight - heightDifference
  }
  const bodyWrapperNode = document.querySelector(outsideClss + bodyWrapper)
  const tablebBodyNode = document.querySelector(outsideClss + tablebBody)
  const tableScrollNode = document.querySelector(tableScroll)
  tableScrollNode.addEventListener('scroll', function(e) {
    bodyWrapperNode.scrollLeft = e.target.scrollLeft
  })
  arr[1] = tablebBodyNode.clientWidth + 26
  return arr
}

/**
 * flexWidth
 * @param prop 每列的prop 可传''
 * @param tableData 表格数据
 * @param title 标题长内容短的，传标题  可不传
 * @param num 列中有标签等加的富余量
 * @param that this 表格最后一列添加 不是btn一列
 * @returns 列的宽度
 * 注：prop,title有一个必传
 */
export const flexWidth = (prop, tableData, title, that, num = 20) => {
  // 处理最后一次的设置表格宽度后滚动条不刷新的问题
  if (that) {
    that.$nextTick(() => {
      that.tableSetting()
    })
  }
  if (tableData.length === 0) { // 表格没数据不做处理
    return
  }
  if (/时间/.test(title) || /日期/.test(title) || /time/.test(prop)) {
    return 140
  }
  let flexWidth = 0// 初始化表格列宽
  let columnContent = ''// 占位最宽的内容
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = '12px Arial,sans-serif'
  if ((prop === '') && title) { // 标题长内容少的，取标题的值,
    columnContent = title
  } else { // 获取该列中占位最宽的内容
    let index = 0
    for (let i = 0; i < tableData.length; i++) {
      const now_temp = tableData[i][prop] + ''
      const max_temp = tableData[index][prop] + ''
      const now_temp_w = context.measureText(now_temp).width
      const max_temp_w = context.measureText(max_temp).width
      if (now_temp_w > max_temp_w) {
        index = i
      }
    }
    columnContent = tableData[index][prop]
    // 比较占位最宽的值跟标题、标题为空的留出四个位置
    const column_w = context.measureText(columnContent).width
    const title_w = context.measureText(title).width
    if (column_w < title_w) {
      columnContent = title || '留出四个'
    }
  }
  // 计算最宽内容的列宽
  const width = context.measureText(columnContent)
  flexWidth = width.width + 15 + num
  return flexWidth
}

