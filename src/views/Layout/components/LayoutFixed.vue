<script setup>
import { ref } from 'vue'
import { getCategoryAPI } from '../../../apis/layout'
// vueUse插件 获取鼠标滚动距离
import { useScroll } from '@vueuse/core'
// 解构 获取竖向Y轴滚动距离
const { y } = useScroll(window)

const list = ref([])
const getCategory = async() =>{
  const result = await getCategoryAPI()
  list.value = result.result
  console.log(list.value)
}

getCategory()
</script>

<template>
  <header
    v-if=" y>78 ? true : false"
    class="app-header"
  >
    <div class="container">
      <h1 class="logo">
        <router-link to="/">
          小兔鲜
        </router-link>
      </h1>
      <ul class="app-header-nav">
        <!--  -->
        <li class="home">
          <router-link to="/">
            首页
          </router-link>
        </li>

        <!-- 激活状态显示 active-class="active" -->
        <li class="home" v-for="item in list" :key="item.id">
          <router-link :to="`/category/${item.id}`"  active-class="active">
            {{ item.name }}
          </router-link>
        </li>

        <!--  -->
        <li class="home1">
          ｜
        </li>

        <li class="home">
          <router-link to="/">
            品牌
          </router-link>
        </li>

        <li class="home">
          <router-link to="/">
            专题
          </router-link>
        </li>

      </ul>
     
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header{
    background-color: #fff;
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    border-bottom: 1px solid #e4e4e4;
    z-index: 999;

    .container {
        margin: 0;
        margin-left: 100px;
        height: 80px;
        display: flex;
  }
  .logo {
    margin-right:20px;
    width: 80px;
    height: 80px;

    a {
      display: block; // 将元素设置为块级元素
      width: 120px;
      height: 80px;
      text-indent: -9999px; // 将元素内的文本内容向左缩进-9999像素，这通常用于隐藏元素中的文本，例如替换文本的logo图像。
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    } // 复合背景属性，它设定了背景图像的URL，背景不重复，其位置居中并且距离顶部18px，背景尺寸使用contain使得背景图像总是完整的显示，即使它的宽度或高度要被缩小（保持其宽高比）。
  }
  .home1{
    font-weight: 700;
        margin-top: 30px;
        font-size: 14px;
        line-height: 32px;
        height: 32px;
        color:$xtxColor ;
  }


  .list{
    display: flex;

    a{
      display: flex;

    }
  }
  .app-header-nav {
    padding-left: 40px;
    display: flex;
    li{
      width: 38px;
      margin-left: 40px;
      a {
        font-weight: 700;
        margin-top: 30px;
        font-size: 14px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
// 激活状态显示 active-class="active" 点击当前元素时，让他一直处于active 时的状态
      .active { 
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
}
}
}
</style>
