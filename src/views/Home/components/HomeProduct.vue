<script setup>
import HomePanel from '../components/HomePanel.vue' // 导入 公用内部结构
import { getProductAPI } from '../../../apis/home'  // 导入 接口请求 
import ProductItem from './ProductItem.vue';  // 导入 产品卡片结构样式 组件
import { ref }  from 'vue'

const productList = ref([])
const getProduct = async() =>{
  const result = await getProductAPI()
  productList.value = result.result
  console.log(productList.value);
}

getProduct()

</script>

<template>
  <div class="product">
    <HomePanel  v-for="item in productList"  :key="item.id" :title="item.name" >

      <div class="box">
        <div class="big-picture">
          <router-link to="/">
            <img v-img-lazy="item.picture">
            <strong class="label">
              <span>{{item.name}}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </router-link>
        </div>

        <ul class="product-list">
          <li v-for="inner in item.goods" :key="inner.id">
            <!-- 产品样式子组件 -->
            <ProductItem :product="inner"/> 
          </li>
        </ul>
      </div>

    </HomePanel>
  </div>
</template>

<style lang="scss" scoped>
.product{
  background: #fff;
  margin-top: 20px;
  .box{
  display: flex;
  .big-picture{
    width: 240px;
    height: 610px;
    margin-right: 10px;
    position: relative;

    transition: all 0.5s; // 该元素下的所有 将在0.5秒内 平缓过度到hover状态

    &:hover{
      transform: translate3d(0, -10px, 0);
      box-shadow: 0 3px 8px (rgb(0 0 0 / 20%));

    }

    img{
      width: 100%;
      height: 100%;
    }
    .label{
      width:188px ;
      height: 66px;
      font-size: 18px;
      font-weight: normal;
      color: #fff;
      line-height: 66px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;

      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%); // 往回移动自己高度的一半 实现y轴上的居中

        span{
          margin:0 5px ;
          text-align: center;
          font-size: 14px;
          white-space: nowrap;

          &:first-child{
            height: 66px;
            width: 76px;
            font-size: 18px;
            background-color: rgba(0, 0, 0, 0.9);
          }
        }
    }
  }

  .product-list{
    
    width: 990px;
    display: flex;
    flex-wrap:wrap; // 超出容器宽度时 可换行

    li{
      height: 300px;
      width: 240px;
      margin: 0 10px 10px 0;

      // &:nth-last-child(-n+4){
      //   margin-bottom: 0;
      // }
      &:nth-child(4n){
        margin-right: 0;
      }

     

     
    }

  }
}
}

</style>
