<!-- 封装 产品卡片 子组件-->

<script setup>
// 定义prpos 接收父组件传入的参数
defineProps({
    product:{ 
        type: Object,
        default: () => {} // 默认为空对象，当父组件没传递数据时 不会报错
    }
})

</script>

<template>
    <router-link class="product-item" to="/">
        <img v-img-lazy="product.picture" >
        <p class="title">{{ product.name }}</p>
        <p class="text">{{ product.desc }}</p>
        <p class="price">&yen;{{ product.price }}</p>
    </router-link>
</template>

<style lang="scss" scoped>
.product-item{
    transition: all 0.5s;
     display: block;
    &:hover{
        transform: translate3d(0 ,-5px ,0);
        box-shadow: 0 3px 8px  rgb(0 0 0 / 20%);
      }

      img{
        margin: 20px 40px 0;
        width: 160px;
        height: 160px;
      }
      p{
        padding: 10px 10px 0 10px;
        overflow: hidden; //  隐藏溢出内容
        text-overflow: ellipsis; // 超出部分用省略号
        white-space: nowrap; // 不换行
      }
      .title{
          text-align: center;
          font-size: 16px;
        }
        .text{
          text-align: center;
          color: #999;
          height: 29px;
        }
        .price{
          text-align: center;
          color:$priceColor;
          font-size: 20px;
        }
}
</style>