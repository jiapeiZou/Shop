
// pinia  本地购物车数据（未登陆状态）

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',()=>{
    // 1.定义state
    const cartList = ref([])

    // 2. 定义action同步异步函数
    // 添加购物车 （ 通过判断：传过来的商品对象中的 skuId 能否在 cartList 中找到）
    const addCart = ( goods ) => {
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

    // 3.删除商品(关键：获取当前商品ID)
    const delCart = (skuId) => {
        cartList.value = cartList.value.filter(( item ) => item.skuId !== skuId )
    }

    // 4.计算属性
    const total = computed(() => {
        let count = 0;
        let price = 0;
        for(let i = 0; i < cartList.value.length; i++) {
            // 1.总数量
            count += cartList.value[i].count;
            // 2.总价
            price += cartList.value[i].price * cartList.value[i].count;
        }
        return { count, price } 
    })

    return { cartList, addCart, delCart, total }
},
{ persist:true })  // 数据持久化