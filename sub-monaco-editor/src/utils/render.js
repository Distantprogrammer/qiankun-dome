// 导入Vue库
import { h, defineComponent, render } from 'vue'
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
export function createElemet (e, that) {
  const index =  store.state.render.renderTarget.findIndex(item=>item.id == that.id)
  const target = store.state.render.renderTarget[index]
  // 判断是否是动态插入的元素
  // if (e.target.parentNode.contains(e.target)) {
  //   console.log(e.target.parentNode.contains(e.target));
  //   return;
  // }
  // 不可直接e.currentTarget传下去 需要先接收在传下去，应为js机制会在事件处理完成后某些参数会变null console.log()也会打印为null
  let event = e.currentTarget || e.target.parentNode
  // 避免点击子节点就重新渲染 // 渲染多层级要解开，应该还有其他方法
  // if (renderTarget && renderTarget.contains(e.target)) {
  //   return false
  // }
  // render(h('p', {}, '动态插入的元素'),event)
  setTimeout(() => {
    render(renderNode(that.createChildren), event)
    // 只需要存父元素 子元素需要单独存  点击的是自己的子元素那就要判断同级子元素销毁与显示
     if (target?.renderTarget && target.renderTarget.contains(e.target)) {
        return false
     }
    store.commit('setRenderTarget', {
      renderTarget: event,
      id:that.id,
    })
  })
}
/**
 * 初始渲染元素()
 * @param {*} element 渲染的元素  
 * @param {*} className 元素的类名
 * @param {Array} data 数据
 * @returns 
 */
export function renderInit (element = 'div', className = 'bar', data = []) {
  // 遇到问题解决地址https://blog.csdn.net/qq_34966814/article/details/122122314
  // Uncaught (in promise) TypeError: Cannot read properties of null (reading 'exposed') 
  // 最外层（即ComponentVue所在的位置）必须是一个vue组件，而不能是普通的元素（如div等），否则会出现异常：
  // 这里我们手动注册一个组件
  return defineComponent({
    render () {
      return h(
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

/**
 * 创建元素事件 如onclick
 * @param {*} e  事件e
 * @param {*} that 当前点击元素数据的this
 * @returns 
 */
export function eventFun (e,that) {
  const eventCurrentTarget = e.currentTarget
  e.preventDefault();
  e.stopPropagation()
  console.log(that);
  if (!that.createChildren) {
    return
  }
  const unmountDom = (event) => {
    store.commit('unmountDom', { eventCurrentTarget, event ,that})
  }
  // 通过id来判断是不是同级的节点点击
  // console.log(store.state.render?.renderTarget);
  const index =  store.state.render?.renderTarget.findIndex(item=>{
    return item.id == that.id
  })
  // console.log(index);
  if(index !== -1){
    unmountDom(store.state.render.renderTarget[index].renderTarget)
  }
  // document.onclick = unmountDom
  // document.oncontextmenu = unmountDom
  createElemet(e, that)
  document.onclick = (docE)=>{store.commit('clearRenderTarget',docE)}
  document.oncontextmenu = (docE)=>{store.commit('clearRenderTarget',docE)}
}
