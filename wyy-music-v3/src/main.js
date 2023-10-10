import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import '@/styles/init.css'
import 'element-plus/dist/index.css'
import '@/styles/index.less'


createApp(App).use(ElementPlus).use(router).use(createPinia()).mount('#app')


