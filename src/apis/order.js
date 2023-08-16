
// 获取订单接口
import httpInstance from '../utils/http';

/*
params:{
    orderState: 0,   对应的 tab 切换时的状态
    page: 1,         想获取的页数
    pageSize: 2      每页的条数
}
*/

export const getUserOrderAPI = ( params ) => {
    return httpInstance({
        url: '/member/order',
        method: 'GET',
        params 
    })
}