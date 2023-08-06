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