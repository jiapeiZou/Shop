import httpInstance from '../utils/http' // 引入接口基地址 

// 获取banner轮播图数据
export function getBannerAPI( params = {} ) {
    // 默认为1（首页）    2（分类商品页）
    const {distributionSite = '1'} = params

    return httpInstance({
            url:'/home/banner',
            params: {
                distributionSite
            }
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