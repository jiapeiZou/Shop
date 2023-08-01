import httpInstance from '../utils/http'

// 分类的get请求，需要传入ID
export   function getCategoryAPI ( id ) {
    return  httpInstance({
        url: '/category',
        params: { id }
    })

}