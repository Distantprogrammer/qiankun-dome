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
      const {e,event} = payload
      // 防止相同兄弟元素不销毁 原因大概是class都一样
      if (e.target.id == state.renderTarget?.id) {
        state.renderTarget.__vue_app__.unmount();
        state.renderTarget = null;
        return
      }
      if (!e.target.contains(event.target)) {
        if(state.renderTarget){
          state.renderTarget.__vue_app__.unmount();
          state.renderTarget = null;
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

