<script setup>
import { ref } from 'vue'
import { getCategoryAPI } from '../../../apis/layout' // 获取接口数据



// 获取 一级 导航分类list
const categoryList = ref([])
const getCategory = async () => {
  const result = await getCategoryAPI()
  categoryList.value = result.result
  // console.log(categoryList.value)
}
getCategory()


</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">
          小兔鲜
        </router-link>
      </h1>

      <ul class="app-header-nav">
        <li
          v-for="item in categoryList"
          :key="item.id"
          class="home"
        >
          <router-link :to= "`/category/${item.id}?name=${item.name}`" >
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <div class="search">
        <div class="icon iconfont">
          &#xe601;
        </div>
        <input
          type="text"
          placeholder="搜一搜"
        >
      </div>
      <!-- 头部购物车 -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header{
    background: #fff;
    .container {
        margin-left: 100px;
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;

    a {
      display: block; // 将元素设置为块级元素
      height: 132px;
      width: 100%;
      text-indent: -9999px; // 将元素内的文本内容向左缩进-9999像素，这通常用于隐藏元素中的文本，例如替换文本的logo图像。
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    } // 复合背景属性，它设定了背景图像的URL，背景不重复，其位置居中并且距离顶部18px，背景尺寸使用contain使得背景图像总是完整的显示，即使它的宽度或高度要被缩小（保持其宽高比）。
  }
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
    li{
    margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
}
}
}
.search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

//   .cart {
//     width: 50px;

//     .curr {
//       height: 32px;
//       line-height: 32px;
//       text-align: center;
//       position: relative;
//       display: block;

//       .icon-cart {
//         font-size: 22px;
//       }

//       em {
//         font-style: normal;
//         position: absolute;
//         right: 0;
//         top: 0;
//         padding: 1px 6px;
//         line-height: 1;
//         background: $helpColor;
//         color: #fff;
//         font-size: 12px;
//         border-radius: 10px;
//         font-family: Arial;
//       }
//     }
//   }

</style>
