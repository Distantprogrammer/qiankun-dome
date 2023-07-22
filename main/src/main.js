import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import './directives.js'
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount('#app')
