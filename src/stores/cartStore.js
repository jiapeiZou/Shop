
// pinia  本地购物车数据（未登陆状态）+ 接口购物车数据（登陆状态）

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { postCartAPI, getNewCartAPI, delCartAPI} from '../apis/cart'

export const useCartStore = defineStore('cart',()=>{
    const userStore = useUserStore()
    const isLogin = computed(() => !!userStore.userInfo.token )// 获取用户信息 根据是否有token 判断是否登陆 如果 userStore.userInfo.token 存在且其值为真，isLogin 将返回 true，否则返回 false

    // 1.定义state
    const cartList = ref([])

    // 2. 定义action同步异步函数

    // >>>>> 添加购物车 （ 通过判断：传过来的商品对象中的 skuId 能否在 cartList 中找到）
    const addCart = async( goods ) => {
        const { skuId, count } = goods
        // 已登陆
        if(isLogin.value){
           await postCartAPI({ skuId, count })  // --调用加入购物车接口
           const result = await getNewCartAPI() // --调用获取购物车列表接口
           cartList.value = result.result       // --接口购物车列表 覆盖 本地购物车列表
           console.log(result)
        }
        // 未登陆
        else{
            // --已添加过此商品 - count+
            const item = cartList.value.find(( item ) => item.skuId === goods.skuId)
            if( item ){
                item.count += goods.count
            }
            // --未添加过 - 直接 push
            else{
                cartList.value.push(goods)
            }
            console.log("ccccc",cartList)
        }
    }

    // >>>>> 删除商品(关键：获取当前商品ID)
    const delCart = async(skuId) => {
        // 已登陆
        if(isLogin.value) {
            // 删除接口 id 要求为数组
            await delCartAPI( [skuId] )
            // 重新获取最新购物车列表 渲染
            const res = await getNewCartAPI()
            cartList.value = res.result
        } 
        // 未登陆
        else{
            cartList.value = cartList.value.filter(( item ) => item.skuId !== skuId )
        }
    }

    // 3.计算属性
    const allCount = computed(() => cartList.value.reduce(( a, c ) => a + c.count , 0 ))
    const allPrice = computed(() => cartList.value.reduce(( a, c ) => a + c.count*c.price , 0 ))
    // 筛选被勾选的商品 并计算其总数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected === true).reduce((a, c) => a + c.count, 0))
    // 筛选被勾选的商品 并计算其总价
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected === true).reduce((a, c) => a + c.count*c.price ,0))

    // >>> 单选功能 (单选框中 )
    const singleCheck = ( val, item ) => {
       // val: el-checkbox 单选框 返回 此项的勾选状态 布尔值
       // item: 当前商品
       // 通过skuId找到要要修改的那一项 然后把它的selected值 修改为 传过来的 val
       const ckeckItem = cartList.value.find((i) => i.skuId === item.skuId)
       ckeckItem.selected = val
    }

    // >>>>> 全选框功能
    // 单选决定全选：判断cartList中的每一项勾选状态都为true时 ，全选框才为true
    const cartAllCheck = computed(() => cartList.value.every((i) => i.selected === true))
    // 全选决定单选 ：cartList的每一项勾选状态 = 全选框状态
    const allCheck = (bool) => {
        cartList.value.forEach((i) => i.selected = bool)
    }

    // >>>>> 清空购物车
    const clearCart = () => {
        cartList.value = []
    }

    return { 
        cartList, allCount, allPrice, cartAllCheck, selectedCount, selectedPrice,
        addCart, delCart, singleCheck, allCheck, clearCart }
},
{ persist:true })  // 数据持久化