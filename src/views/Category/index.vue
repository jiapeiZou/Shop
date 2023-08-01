<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router' // 获取当前页面的路由ID
import { getCategoryAPI }  from '../../apis/category' // 获取分类导航 接口数据
import { getBannerAPI } from '../../apis/home' // 获取轮播图 接口数据

// 获取当前页面ID
const route = useRoute()
const categoryId = route.params.id
// console.log(categoryId)

// 获取分类导航栏接口数据
const categoryData = ref( {} )
const getCategory = async(  ) => {
  const result = await getCategoryAPI ( categoryId )
  categoryData.value = result.result
  // console.log(result)
}
onMounted( () => getCategory() )

// 获取 分类页的轮播图 接口数据
const bannerList = ref([])
const getBanner = async() => {
  const result = await getBannerAPI( {distributionSite:'2'} )
  bannerList.value = result.result
  console.log(bannerList.value)
}
onMounted(() => getBanner())
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑组件  -->
      <div class="breakcrumb">
        <el-breadcrumb separator= ">" >
          <el-breadcrumb-item :to="{ path:'/' }"> 首页 </el-breadcrumb-item>
          <el-breadcrumb-item> {{ categoryData.name }} </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- separator 属性定义了分隔符 面包屑组件可以显示当前页面在系统层级结构中的位置，并能向上返回。-->

      <!-- 轮播图 banner -->
      <div class="banner">
        <el-carousel height="500px">
          <el-carousel-item  v-for="img in bannerList" :key="img.id">
            <img :src="img.imgUrl">
          </el-carousel-item>
        </el-carousel>
      <!-- elementPlay 中的走马灯插件 -->
      </div>


    </div>
  </div>

</template>

<style lang="scss" scoped>
.breakcrumb{
  span{
    margin-top: 20px;
    font-size: 18px;
  }
  
}
.banner{
    margin-top: 30px;
    width: 1240px;
    height: 500px;
   
    img {
    width: 100%;
    height: 500px;
  }
}
</style>
