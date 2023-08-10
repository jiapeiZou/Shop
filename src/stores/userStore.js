
//  pinia 管理用户数据相关

import { defineStore } from 'pinia'; // pinia状态管理库
import { ref } from 'vue';
import { loginAPI } from '../apis/user'; // 登录接口
import { mergeCartList, getNewCartAPI } from '../apis/cart'; // 合并购物车接口
import { useCartStore } from './cartStore'; // 购物车Store

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()

    // 1.定义管理用户数据的state
    const userInfo = ref({})

    // 2. 定义获取接口数据的action同步异步函数
    // >>>>用户登录时
    const getUserInfo = async( { account, password } ) => {
        // 登录接口
        const result = await loginAPI({ account, password })
        userInfo.value = result.result
        // 合并购物车接口
        await mergeCartList(cartStore.cartList.map( item => { // 数组map方法： 每个元素都是原始数组中的元素经过一个函数处理后的结果，和原数组具有相同的长度
            return{
                skuId: item.skuId,
                selected: item.selected, 
                count: item.count
            }
        }))
        // 获取最新的购物车列表接口 
        const res = await getNewCartAPI()
        cartStore.cartList = res.result
    }
    // >>>>退出登录时 
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