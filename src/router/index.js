// createPouter 创建router实例对象
// createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue'
import SubCategory from '../views/SubCategory/index.vue'
import Detail from '../views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由：登陆页
    {
      path: '/login', 
      component: Login
    },

    // 一级路由：首页
    { path: '/', 
      component: Layout,

      children: [
        // 二级路由：home（默认二级路由设为''）
        {
          path: '', 
          component: Home
        },
        // 二级路由：导航栏分类 传入id
        { 
          path: '/category/:id', 
          component: Category
        },
        // 二级路由：产品类 传入id
        {
          path: '/category/sub/:id',
          component: SubCategory
        },
        // 二级路由：产品详情 传入id
        {
          path: '/detail/:id',
          component: Detail
        }
      ]
    }
  ],

  // 路由滚动行为定制（切换不同路由时 自动滚动到顶部）
  scrollBehavior() {
    return{ top:0 }
  }
})

export default router
