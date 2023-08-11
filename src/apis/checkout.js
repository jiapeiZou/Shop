
import httpInstance from "../utils/http";

// 获取商品详情接口
export const getCheckInfoAPI = () => {
    return httpInstance({
        url:'/member/order/pre'
    })
}