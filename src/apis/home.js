import httpInstance from '../utils/http' // 引入接口基地址 

// 获取banner轮播图数据
export function getBannerAPI( params = {} ) {  // params 参数 默认值为空对象，当未传参数时 不会报错
    // 默认为1（首页）    2（分类商品页）
    const {distributionSite = '1'} = params  // 解构赋值 ：params 是一个对象，我们尝试从这个对象中提取 distributionSite 属性。如果 params 对象中有 distributionSite 属性，那么 distributionSite 变量将被赋予它的值。如果 params 对象中没有 distributionSite 属性，那么 distributionSite 变量将被赋予默认值 '1'

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