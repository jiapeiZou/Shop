
// 封装购物车相关接口
import httpInstance from '../utils/http'

// 加入购物车
export const postCartAPI = ({ skuId, count }) => {
    return httpInstance({
        url:'/member/cart',
        method: 'POST',
        data: {
           skuId,
           count
        }
    })
}

// 删除购物车
export const delCartAPI = ( ids )=> {
    return httpInstance({
        url:'/member/cart',
        method: 'DELETE',
        data: { ids } // ids 类型为 []
    })
}

// 合并购物车 (登陆后 把未登陆状态下 如果有加入购物车的数据，渲染出来)
export const mergeCartList = ( data ) => {
      return httpInstance({
        url:'/member/cart/merge',
        method: 'POST',
        data // dada结构[ {skuId: , selected: , count: }, …… ]
      })
}

// 获取最新的购物车列表
export const getNewCartAPI = () => {
    return httpInstance({
        url:'/member/cart'
    })
}

