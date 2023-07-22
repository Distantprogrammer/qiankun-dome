import store from './store'

const microApps = [
  {
    container:'#sub-monaco-editor',
    name: 'sub-monaco-editor',
    entry: process.env.VUE_APP_SUB_MONACOEDITOR,
    activeRule: '/sub-monaco-editor'
  },
]

const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
