// createPouter 创建router实例对象
// createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue'
import SubCategory from '../views/SubCategory/index.vue'
import Detail from '../views/Detail/index.vue'
import CartList from '../views/CartList/index.vue'
import Checkout from '../views/Checkout/index.vue'
import Pay from '../views/Pay/index.vue'
import PayBack from '../views/PayBack/index.vue'
import Member from '../views/Member/index.vue'
import Userinfo from '../views/Member/components/Userinfo.vue'
import UserOrder from '../views/Member/components/UserOrder.vue'

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
        // 二级路由：home（ 当出现路由嵌套时 可设置 默认二级路由设为''）
        {
          path: '', 
          component: Home
        },
        // 二级路由：导航栏分类 传入id
        { 
          path: 'category/:id', 
          component: Category
        },
        // 二级路由：产品类 传入id
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        // 二级路由：产品详情 传入id
        {
          path: 'detail/:id',
          component: Detail
        },
        // 二级路由：购物车
        {
          path: 'cartlist',
          component: CartList
        },
         // 二级路由：结算
        {
          path: 'checkout',
          component: Checkout
        },
        // 二级路由：支付
        {
          path: 'pay',
          component: Pay
        },
        // 二级路由：支付成功
        {
          path:'paycallback',
          component: PayBack
        },
         // 二级路由：会员中心
        {
          path: 'member',
          component: Member,
          children: [
            // 三级路由
            // 三级路由：个人中心
            {
              path: '',  //（ 当出现路由嵌套时 可设置 默认二级路由设为''）
              component: Userinfo
            },
            // 三级路由：我的订单
            {
              path: 'order',
              component: UserOrder
            },
          ]
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
