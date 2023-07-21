import store from './store'

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/sub-html'
  },
  {
    name: 'sub-monaco-editor',
    entry: process.env.VUE_APP_SUB_MONACOEDITOR,
    activeRule: '/sub-monaco-editor'
  },
  {
    name: 'sub-vue-ts-canvans',
    entry: process.env.VUE_APP_SUB_VUE_TS_CANVANS,
    activeRule: '/sub-vue-ts-canvans'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
