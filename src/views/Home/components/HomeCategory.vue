<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { getCategoryAPI } from '../../../apis/layout'

const list = ref([])
const getCategory = async () => {
  const rst = await getCategoryAPI()
  list.value = rst.result
  console.log(rst)
}

getCategory()

</script>

<template>
  <div class="home">
    <!-- 左 -->
    <ul class="home__menu">
      <li
        v-for="item in list"
        :key="item.id"
      >
        <router-link to="/">
          {{ item.name }}
        </router-link>
        <!-- 数组array.slice(0,2)方法   浅拷贝 从索引 0 开始 到索引位2（不包含2） 的前两个元素 -->
        <router-link
          v-for="i in item.children.slice(0,2)"
          :key="i.id"
          to="/"
        >
          {{ i.name }}
        </router-link>

        <!-- 右 -->
        <div class="shopInfo">
          <h4>分类推荐: <small> 根据你的购买记录或浏览记录推荐</small></h4>
          <ul>
            <li
              v-for="i in item.goods"
              :key="i.id"
            >
              <router-link to="/">
                <img
                  :src="i.picture"
                  alt=""
                >
                <div class="info">
                  <p class="titil">
                    {{ i.name }}
                  </p>
                  <p class="titil__text">
                    {{ i.desc }}
                  </p>
                  <p class="price">
                    <i>&yen;</i>{{ i.price }}
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// ------左
.home{
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;
    &__menu{
        li{
            color: #fff;
            padding-left: 40px;
            height: 55px;
            line-height: 55px;
            &:hover {
                background: $xtxColor;
            }
            a{
                color: #fff;
                margin-right: 4px;
                &:first-child{ // 选中a元素中的 第一个子元素
                    font-size: 16px;
                }
            }
         // 关键样式  li:hover{} ---- li 在hover状态下的shopInfo盒子 display由none-->变成block状态
         // 这里写在li样式里面，包含关系，所以可以写做 &:hover{ }
            &:hover {
                .shopInfo {
                    display: block;
                }
            }
        // 实现在没有鼠标悬浮状态时  默认li 展示第一个元素的shopInfo
            // &:first-child {
            //     .shopInfo {
            //         display: block;
            //     }
            // }
        }

        // ------右

        .shopInfo{
            display: none;

            width: 990px;
            height: 500px;
            background: rgba(255, 255, 255, 0.8);
            position: absolute; // 定位
            left: 250px;
            top: 0;
            padding: 0 0 0 15px ;

            h4 {
                color: #333;
                font-size: 20px;
                font-weight: normal;
                line-height: 80px;

                small {
                    font-size: 16px;
                    color: #666;
                }
            }

            ul{
                width: 975px;
                display: flex;
                flex-wrap: wrap; // flex 布局下：超过容器宽度 自动换行
                li{
                    width: 310px;
                    height: 120px;
                    margin-right: 15px;
                    margin-bottom: 15px;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    background: #fff;
                    display: flex;
                    &:hover {
                        background: #e3f9f4;
                    }
                    img{
                        margin-top: 10px;
                        width: 95px;
                        height: 95px;
                    }
                    a {
                        display: flex;
                    }

                    .info {
                        max-width: 200px;
                        padding: 0 10px;
                        line-height: 24px;
                        overflow: hidden;

                        .titil {
                            margin-top: 10px;
                            font-size: 16px;
                            color: #666;
                            display: block;

                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .titil__text {
                            color: #999;
                            display: block;

                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .price {
                            font-size: 22px;
                            color: $priceColor;

                            i {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
