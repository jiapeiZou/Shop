<template>
    <!-- 引入 吸顶导航栏组件 -->
    <LayoutFixed />
    <!-- 引入顶部导航栏组件 -->
    <LayoutNav />
    <!-- 引入头部组件 -->
    <LayoutHeader />
    <!-- 二级路由出口 -->
    <router-view />
    <!-- 引入底部区域组件 -->
    <LayoutFooter />
</template>

<script setup>
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
</script>

<style>

</style>