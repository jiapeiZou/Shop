
//  pinia 管理用户数据相关

import { defineStore } from 'pinia' // pinia状态管理库
import { ref } from 'vue'
import { loginAPI } from '../apis/user'; // 接口
import { useCartStore } from './cartStore' // 购物车Store

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()

    // 1.定义管理用户数据的state
    const userInfo = ref({})

    // 2. 定义获取接口数据的action同步异步函数
    const getUserInfo = async( { account, password } ) => {
    const result = await loginAPI({ account, password })
    userInfo.value = result.result
    }
    // 退出登陆时 
    const clearUserInfo = () => {
        // 清除用户信息
        userInfo.value = {}
        // 清空购物车
        cartStore.clearCart() 
    } 

    // 3.以对象的格式把state,action 返回出去
    return { userInfo,  getUserInfo, clearUserInfo }
    
}, {
    persist: true, // 数据持久化
})