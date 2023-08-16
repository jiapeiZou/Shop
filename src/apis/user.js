import httpInstance from '../utils/http'

// 用户登陆 接口请求
export const loginAPI = ( {account, password} ) => {
    return httpInstance({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

// 猜你喜欢接口
export const getLikeListAPI = ( {limit = 4} )=>{ // 默认为4
    return httpInstance({
        url: '/goods/relevant',
        params: {
            limit 
        }
    })
}