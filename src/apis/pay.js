
// 支付接口
import httpInstance from "../utils/http";

export const getOrderAPI = ( id ) => {
    return httpInstance({
        url: `/member/order/${ id }`
    })
}

