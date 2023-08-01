<script setup>
import productItem from '../Home/components/ProductItem.vue' // 获取 产品卡片 子组件
import { useBanner } from './composables/useBanner'
import { useCategory } from './composables/useCategory'

const { bannerList } = useBanner()
const { categoryData } = useCategory()

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
      </div>
      <!-- elementPlay 中的走马灯插件 -->

      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in categoryData.children" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" >
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>

     <!-- 产品 -->
     <div class="goods-list" v-for="item in categoryData.children" :key="item.id">
      <div class="head">
        <h3>-{{item.name}}-</h3>
      </div>
       <!-- 产品卡片 子组件 -->
      <div class="product">
        <productItem v-for="product in item.goods" :key="product.id" :product="product"/>
      </div>
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
.sub-list{
    margin-top: 20px;
    background-color: #fff;

    h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  ul{
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap; // 超出换行

    li{
      width: 168px;
      height: 160px;

      a{
        text-align: center;
        display: block; 
        font-size: 16px;

        &:hover{
          color: $xtxColor;
        }

        img{
        height: 100px;
        width:100px ;
      }

      p{
        font-size: 12px;
        line-height: 40px;
      }

      }
    }
  }
}

.goods-list{
  margin-top: 20px;
  background-color: #fff;
  .head{
    font-size: 20px;
    color: #666;
    text-align: center;
    line-height: 100px;

    h3{
      font-weight: normal;
    }
  }
  .product{
    display: flex;
    padding: 0 10px 10px 20px ;
    justify-content: space-around;
    overflow: scroll;
      a{
        height: 300px;
        width: 240px;
        margin: 0 10px 10px 0;
      }
}
}

</style>
