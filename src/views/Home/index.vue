<script setup>
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeHotVue from './components/HomeHot.vue'
import HomeNewVue from './components/HomeNew.vue'
import HomeProductVue from './components/HomeProduct.vue'


</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeHotVue />
  <HomeNewVue />
  <HomeProductVue />
  <!-- 测试面板组件 -->

 <!-- <HomePanel  title="新鲜好物" subTitle="新鲜出炉，品质无忧" >
      </HomePanel>
  
      <HomePanel  title="新鲜好物" subTitle="新鲜出炉，品质无忧" >
      </HomePanel> -->

</template>

<style lang="scss" scoped>
</style>
