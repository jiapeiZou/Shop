
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 获取当前页面 路由参数
import { getCategoryFilterAPI } from '../../apis/category' // 获取分类导航 接口数据
import { postSubCategoryAPI } from '../../apis/category' // 获取分类产品 接口数据
import ProductItem from '../Home/components/ProductItem.vue' // 获取 产品卡片 子组件

// 获取 面包屑导航数据 逻辑
const route = useRoute()
const snbCategoryId = route.params.id

const categoryList = ref([])
const getCategoryData = async(id = snbCategoryId ) => {
    const result = await getCategoryFilterAPI(snbCategoryId)
    categoryList.value = result.result
    // console.log("======",categoryList.value)
}
onMounted(()=> getCategoryData())


// 获取 分类产品列表数据 逻辑
const productList = ref([])
const data = ref({
    categoryId: snbCategoryId,
    page: 1,
    pageSize: 20, 
    sortField: 'publishTime' // publishTime（初始值） sortField值 与 Tab中的数据 双向绑定（当点击其中某个tab时，sortField就==那个tab的 name 
})
const getProductList = async() => {
    const result = await postSubCategoryAPI( data.value )
    productList.value = result.result.items
    // console.log("======", productList.value)
}
onMounted(() => getProductList())


// Tab切换 ：监听到tab 的 name 变化时，sortField更换新的name ，并重新执行新的接口数据请求 
const tabChange = () => {
    data.value.page = 1  // 更换不同的分类项时 初始化 page 为 1 
    getProductList() 
}


// 列表无限加载

//定义一个响应式数据， 控制是否停止监听
const disabled = ref(false)
// 能监听到 页面触底时 自动执行的函数 
const load = async() => { 
     // 触底时 让page + 1
     data.value.page++
     // 重新掉接口 获取新一页page的数据
     const result = await postSubCategoryAPI( data.value )
     // 扩展运算符（...）来合并 新老数据，并渲染
     productList.value = [...productList.value , ...result.result.items]
     // 当后端items中没有产品数据了 停止监听
     if(result.result.items.length === 0){
        disabled.value = true
     }
}


</script>

<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <div class="bread-box">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path:'/' }"> 首页 </el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:`/category/${categoryList.parentId}` }"> {{ categoryList.parentName }} </el-breadcrumb-item>
                <el-breadcrumb-item>  {{ categoryList.name }} </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <!-- 产品详情 -->
        <div class="sub-box">
            <!-- 【Tabs 标签页】 -->
            <el-tabs v-model="data.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime">  </el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum">  </el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum">  </el-tab-pane>
            </el-tabs>
            <!-- 【列表无限加载】 产品列表 -->
            <div class="product" 
                 v-infinite-scroll="load" 
                 :infinite-scroll-disabled="disabled"
                 >
                <ProductItem v-for="product in productList" :key="product.id"  :product="product"/>
            </div>
        </div>
        


    </div>
</template>

<style lang="scss" scoped>
.bread-box{
   margin: 20px 0;
   color: #666;
}
.sub-box{
    padding: 20px 10px;
    background-color: #fff;

}
.product{
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px 10px 20px ;
    justify-content: space-around;
      a{
        height: 300px;
        width: 240px;
        margin: 0 10px 10px 0;
      }
}
</style>