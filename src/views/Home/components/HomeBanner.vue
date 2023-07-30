<!-- Banner轮播图  组件-->

<script setup>
import { onMounted, ref } from 'vue'
import { getBannnerAPI } from '../../../apis/home'

const imgList = ref([])
const getBannner = async() =>{
    const result = await getBannnerAPI()
    imgList.value = result.result
    // console.log(imgList.value)
}

onMounted(() => {
  getBannner()
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
