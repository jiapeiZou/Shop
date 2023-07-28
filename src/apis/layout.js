import  httpInstance  from '../utils/http'

// 头部 分类栏接口请求
export function getCategoryAPI () {
    return httpInstance({
        url: '/home/category/head'
    })
}