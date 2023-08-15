import { h, reactive,render as renderFn } from 'vue';
const render = {
  state: {
    renderTarget:null
  },
  getters: {
  },
  mutations: {
    setRenderTarget(state,renderTarget){
      state.renderTarget = renderTarget
    },
    clearRenderTarget(state){
      state.renderTarget = null
    },
    /**
     * 销毁元素
     * @param {*} state 
     * @param { Object } payload 
     * @param { Node } event  当前在window上点击的元素
     * @param { Node } e  要销毁元素的父元素及创建他的元素
     */
    unmountDom(state,payload){
      const {eventCurrentTarget:e,event} = payload
      const eDom = e.target || e
      // 防止相同兄弟元素不销毁 原因大概是class都一样
      if ((eDom && eDom.id) == state.renderTarget?.id) {
          renderFn(null,state.renderTarget)
          state.renderTarget = null;
          return
      }
      if (!eDom.contains(event.target)) {
        if(state.renderTarget){
          renderFn(null,state.renderTarget)
          state.renderTarget = null;
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

