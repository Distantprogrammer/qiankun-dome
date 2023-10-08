import { h, reactive,render as renderFn } from 'vue';
const render = {
  state: {
    renderTarget:[]
  },
  getters: {
  },
  mutations: {
    // 2023/10/08 为啥不操作数据再循环渲染节点？
    setRenderTarget(state,renderTarget){
      const index =  state.renderTarget.findIndex(item=>item.id == renderTarget.id)
      if(index !== -1){
        state.renderTarget.splice(index,1,renderTarget)
        return
      }
      state.renderTarget.push(renderTarget)
      
    },
    clearRenderTarget(state,e){
      state.renderTarget.forEach(element => {
        const target = element.renderTarget
        if (target && target.contains(e.target)) {
            return false
        }
        renderFn(null,target)
      })
      document.onclick = null;
      document.oncontextmenu = null
    },
    /**
     * 销毁元素
     * @param {*} state 
     * @param { Object } payload 
     * @param { Node } event  当前在window上点击的元素
     * @param { Node } e  要销毁元素的父元素及创建他的元素
     */
    unmountDom(state,payload){
      const {eventCurrentTarget:e,event,that} = payload
      // 通过id来拿到与上次创建的节点 （本次节点的兄弟节点）
      const index =  state.renderTarget.findIndex(item=>item.id == that.id)
      if(index === -1){
        return
      }
      const target = state.renderTarget[index].renderTarget
      if (state.renderTarget[index].id !== that.id) {
        return false
      }
      // 避免点击字节点就销毁
      // if (target && target.contains(event.target) && state.renderTarget[index].id === that.id && that.id !== 1) {
      //   return false
      // }
      const eDom = e.target || e
      // 防止相同兄弟元素不销毁 原因大概是class都一样
      if ((eDom && eDom.id) == target?.id) {
          renderFn(null,target)
          // target = null;
          // state.renderTarget.splice(0,index)
          return
      }
      if (!eDom.contains(event.target)) {
        if(target){
          renderFn(null,target)
          // target = null;
          // state.renderTarget.splice(0,index)
          return
        }
        document.onclick = null;
        document.oncontextmenu = null
      }
    },

  },
  actions: {
  },
}




export default render

