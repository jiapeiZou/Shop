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
</template>

<style lang="scss" scoped>
</style>
