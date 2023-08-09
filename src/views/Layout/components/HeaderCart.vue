<script setup> 
import { useCartStore } from '../../../stores/cart'
const cartStore = useCartStore()

</script>

<template>
    <div class="cart">
        <!-- 购物车 -->
        <a class="curr" href="javascript:;">
            <i class="icon  iconfont">&#xe73d;</i>
            <em>{{ cartStore.cartList.length }}</em>
        </a>
        <!-- 清单 -->
        <div class="layer">
            <!-- 商品列表 -->
            <div class="list">
                 <div class="item" v-for="i in cartStore.cartList" :key="i">
                    <RouterLink to="">
                        <img :src="i.picture" alt="" />
                        <div class="center">
                        <p class="name ellipsis-2">
                            {{ i.name }}
                        </p>
                        <p class="attr ellipsis">{{ i.attrsText }}</p>
                        </div>
                        <div class="right">
                        <p class="price">&yen;{{ i.price }}</p>
                        <p class="count">x{{ i.count }}</p>
                        </div>
                    </RouterLink>
                    <i class="iconfont" @click="cartStore.delCart(i.skuId)">&#xe668;</i>
                </div>
            </div>
             <!-- 统计区 -->
            <div class="foot">
                <div class="total">
                    <p>共 {{ cartStore.allCount }} 件商品</p>
                    <p>&yen; {{ cartStore.allPrice.toFixed(2) }}</p>
                </div>
                    <el-button @click="$router.push('/cartlist')">去购物车结算</el-button>
            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
.cart{
    width: 50px;
    position: relative;
    z-index: 600;
    
    .curr{
        display: block;
      
        line-height: 32px;
        text-align: center;
        position: relative;
        .icon{
            font-size: 22px;
        }
        em{
            font-style: normal;
            position: absolute;
            right: 0;
            top: 0;
            padding: 1px 6px;
            line-height: 1;
            background: $helpColor;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            font-family: Arial;
        }
    }
    &:hover {
    .layer {
      opacity: 1; // 使其完全不透明
      transform: none;
    }
  }
  .layer{
    opacity: 0; // 透明
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;

    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;

      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }

        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>