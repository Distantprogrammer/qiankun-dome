// 导入Vue库
import {h,defineComponent ,render} from 'vue'
import store from "@/store/index";
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


// 手动创建子元素
export function createElemet (e, data) {
  // 不可直接e.currentTarget传下去 需要先接收在传下去，应为js机制会在事件处理完成后某些参数会变null console.log()也会打印为null
  let event = e.currentTarget || e.target.parentNode
  // render(h('p', {}, '动态插入的元素'),event)
  setTimeout(() => {
    render(renderNode(data), event)
    store.commit('setRenderTarget', event)
  })
}
/**
 * 初始渲染元素()
 * @param {*} element 渲染的元素  
 * @param {*} className 元素的类名
 * @param {Array} data 数据
 * @returns 
 */
export function renderInit(element = 'div', className ='bar',data = []) {
  // Uncaught (in promise) TypeError: Cannot read properties of null (reading 'exposed') 
  // 最外层（即ComponentVue所在的位置）必须是一个vue组件，而不能是普通的元素（如div等），否则会出现异常：
  // 这里我们手动注册一个组件
  return defineComponent({
    render(){
      return  h(
        element,
        {
          class: className
        },
        data.map(renderNode)
      );
    }
  });
  
//  return new Promise((resolve, reject) => {
//     const init_h =  h(
//       element,
//       {
//         class: className
//       },
//       actionBarLeftRenderData.map(renderNode)
//     );
//     resolve(init_h)
//   })
  // const init_h =  h(
  //   element,
  //   {
  //     class: className
  //   },
  //   actionBarLeftRenderData.map(renderNode)
  // );
  // return init_h
}

