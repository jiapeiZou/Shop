<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router' // 获取当前页面的路由ID
import { getCategoryAPI }  from '../../apis/category'


// 获取当前页面ID
const route = useRoute()
const categoryId = route.params.id
// console.log(categoryId)

// 获取接口数据
const categoryData = ref( {} )
const getCategory = async(  ) => {
  const result = await getCategoryAPI ( categoryId )
  categoryData.value = result.result
  // console.log(result)
}
onMounted( () => getCategory() )

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

    </div>
  </div>

</template>

<style lang="scss">

</style>
