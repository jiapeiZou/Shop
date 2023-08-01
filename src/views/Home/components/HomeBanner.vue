<!-- Banner轮播图  组件-->

<script setup>
import { onMounted, ref } from 'vue'
import { getBannerAPI } from '../../../apis/home' // 获取轮播图 接口数据

// 获取 首页的轮播图 接口数据
const imgList = ref([])
const getBanner = async() =>{
    const result = await getBannerAPI()
    imgList.value = result.result
    // console.log(imgList.value)
}

onMounted(() => {
  getBanner()
})

</script>

<template>
  <div class="banner">
  <!-- elementPlay 中的走马灯插件 -->
    <el-carousel height="500px">
      <el-carousel-item  v-for="img in imgList" :key="img.id">
        <img :src="img.imgUrl">
      </el-carousel-item>
    </el-carousel>
  <!--  -->
  </div>
</template>

<style lang="scss" scoped>
.banner{
    width: 1240px;
    height: 500px;
    position: absolute; // 绝对定位
    left: 0;
    top: 0;
    z-index: 98;
    img {
    width: 100%;
    height: 500px;
  }
}
</style>
