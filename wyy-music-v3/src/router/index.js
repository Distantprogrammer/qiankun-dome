import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/Layout/index.vue'),
    children:[
      {
        path: '',
        name: 'mainRight',
        component: () => import('@/views/Main/index.vue'),
        children:[
          { 
            path: '',
            name: 'mainRight',
            component: () => import('@/views/Main/FoundMusic/index.vue'),
          }
        ]
      }
    ]
  }
]
export const asyncRoutes = [
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...asyncRoutes]

})

export default router
