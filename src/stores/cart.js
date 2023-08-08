
// pinia  本地购物车数据（未登陆状态）

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',()=>{
    // 1.定义state
    const cartList = ref([])

    // 2. 定义action同步异步函数
    const addCart = ( goods ) => {
        // 添加购物车 （ 通过判断：传过来的商品对象中的 skuId 能否在 cartList 中找到）
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

    return { cartList, addCart }
},
{ persist:true })  // 数据持久化