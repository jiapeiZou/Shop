import httpInstance from '../utils/http' // 引入接口基地址 

// 获取banner轮播图数据
export function getBannnerAPI() {
   return httpInstance({
        url:'/home/banner'
    })
}

export function getNewAPI() {
    return httpInstance({
        url:'/home/new'
    })
}

export function getHotAPI() {
    return httpInstance({url:'/home/hot'})
}

export function getProductAPI() {
    return httpInstance({url:'/home/goods'})

}