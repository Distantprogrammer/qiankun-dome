import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
let instance = null

function render (props = {}) {
  if (instance) return;
  const { container, routerBase } = props
  const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL),
    routes
  })

  instance = createApp(App)
      .use(store)
      .use(router)
      .mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}
export async function unmount () {
  //可选链操作符
  instance.$destroy?.();
  instance = null;
}
