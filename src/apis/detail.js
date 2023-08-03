import httpInstance from '../utils/http'

// 获取商品详情
export const getDetailAPI = (id) => {
   return httpInstance({
    url:'/goods',
    params: { id }
   })
}


// 获取热榜商品
export const getHotAPI = ({ id, type, limit = 3 }) =>{
   return httpInstance({
      url:'/goods/hot',
      params:{
         id,    // --商品ID
         type,  // --1:代表24小时热榜 2:代表周热榜
         limit  // --获取个数
      }
   })
}