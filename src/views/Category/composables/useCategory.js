//  封装: 分类页产品数据 逻辑

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router' // 获取当前页面的路由ID
import { getCategoryAPI }  from '../../../apis/category' // 获取分类导航 接口数据
import { onBeforeRouteUpdate } from 'vue-router' // Vue Router 4 提供生命周期函数 === 监听路由的变化 ，解决路由缓存  路由只有参数变化时，组件被复用时调用

export function useCategory() {

    // 获取当前页面ID
    const route = useRoute()
    const categoryId = route.params.id

    const categoryData = ref( {} )

    // 获取分类导航栏接口数据
    const getCategory = async( id = categoryId ) => {
        const result = await getCategoryAPI ( id )
            categoryData.value = result.result
            console.log(categoryData.value)
    }
    onMounted( () => getCategory() )


    // 解决路由缓存：点击导航栏中的分类项  url变化了，但页面没有自动刷新.  路由缓存 是指：路由只有参数变化时，组件实例被复用
    // onBeforeRouteUpdate生命周期函数 === 监听路由的变化
    // 函数提供的to： 为更新的路由数据
    onBeforeRouteUpdate( (to) => {
        console.log(to) // to 是指变化后的新路由数据
        getCategory(to.params.id)
       // 监听都路由变化时 就调用接口函数 并传入新的路由的数据
    })

    return{ categoryData }
}