
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 获取当前页面 路由参数
import { getCategoryFilterAPI } from '../../apis/category' // 获取分类导航 接口数据

const route = useRoute()
const snbCategoryId = route.params.id

const categoryList = ref([])
const getCategoryData = async(id = snbCategoryId ) => {
    const result = await getCategoryFilterAPI(snbCategoryId)
    categoryList.value = result.result
    console.log("======",categoryList.value)
}
onMounted(()=> getCategoryData())


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
            <!-- 筛选 -->
            <el-tabs>
                <el-tab-pane label="最新商品" name="publishTime">  </el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum">  </el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum">  </el-tab-pane>
            </el-tabs>
            <!-- 产品列表 -->
            <div class="product">
                
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
</style>