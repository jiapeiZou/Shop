// 管理用户数据相关

import { defineStore } from 'pinia' // pinia 状态管理库
import { ref } from 'vue'
import { loginAPI } from '../apis/user';

export const useUserStore = defineStore('user', () => {

    // 1.定义管理用户数据的state
    const userIfon = ref({})

    // 2. 定义获取接口数据的action同步异步函数
    const getUserIfon = async( { account, password } ) => {
    const result = await loginAPI({ account, password })
    }

    // 3.以对象的格式把state,action 返回出去
    return { userIfon,  getUserIfon }
})