import httpInstance from '../utils/http'

// 获取一级分类列表数据 get请求，需要传入ID
export   const getCategoryAPI = ( id ) => {
    return  httpInstance({
        url: '/category',
        params: { id } // 参数
    })

}

// 获取二级分类 筛选列表数据 get请求，需要传入ID
export const getCategoryFilterAPI = ( id ) => {
    return httpInstance({
        url: '/category/sub/filter',
        params: { id }
    })
}