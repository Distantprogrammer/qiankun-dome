// 导入Vue库
import { h, reactive, createApp } from 'vue';
/**
 * 封装思路 事件获得对象e，以对象e作为挂载对象，render节点，
 * h( '生成的标签'，{ 绑定在元素身上的属性 },节点内容，节点的子节点 )
 */


/**
 * 渲染函数
 * @param { Object,Function } node
 * @returns h
 * @example
node=[
  {
    element:{String} // 标签
    propsOption: {Object,Function}, // 绑定的属性
    children:{ Array },// 字节点
    content:{String} // 文字内容
    createChildren:{Object} // 需要后面生成的字节点
  }
]
 */

export const renderNode = (node) => {
  /**
   * @param {object} node.element
   */
  let propsOption = node.propsOption
  // 判断数据类型 
  Object.prototype.toString.call(node.propsOption) === '[object Object]' ? propsOption = node.propsOption :
    Object.prototype.toString.call(node.propsOption) === '[object Function]' ? propsOption = node.propsOption() : console.log(node.propsOption);
  return h(
    node.element ? node.element : 'div',
    {
      ...propsOption
    },
    node.content ? node.content : '',
    node.children && !node.childrenBreakOff ? node.children.map(renderNode) : null
  );
};


