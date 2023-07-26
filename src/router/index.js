// createPouter 创建router实例对象
// createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 一级路由：首页
      component: Layout,
      children: [ 
        {
          path:'', // 二级路由：home（默认二级路由设为''）
          component: Home
        },
        {
          path:'category', // 二级路由：分类
          component: Category
        }
      ]
    },
    {
      path: '/login', // 一级路由：登陆
      component: Login
    }
  ]
})

export default router
