//  封装: banber轮播图 接口数据 逻辑

import { onMounted, ref } from 'vue'
import { getBannerAPI } from '../../../apis/home' // 获取轮播图 接口数据

export function useBanner () {
        
    const bannerList = ref([])

    const getBanner = async() => {
    const result = await getBannerAPI( {distributionSite:'2'} )
    bannerList.value = result.result
    //console.log(bannerList.value)
    }

    onMounted(() => getBanner())// 只在页面初次渲染时执行
 
    return{ bannerList }
}
