<script setup>
import { ref } from 'vue'

// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]
// 悬浮侧小图 显示相应大图
const imgIndex = ref(0)
const enter = (index) => {
    imgIndex .value = index
    console.log(imgIndex .value)
}


</script>

<template>
    <div class="product-img">
        <!-- 左侧大图 -->
        <div class="middle">
            <img :src="imageList[imgIndex]" alt="">
             <!-- 蒙层小滑块 -->
            <div class="layer"></div>
        </div>

        <!-- 右侧小图列表 （获取下标  激活状态） -->
        <ul class="small">
            <li 
            v-for=" ( img, index ) in imageList" 
            :key="index" 
            @mouseenter="() => enter(index)"
            :class="{ active: index === imgIndex }"   
            >
                <img :src="img" alt="">
            </li>
        </ul>

        <!-- 放大镜图 --> 
        <div class="large">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.product-img{
    width:480px;
    height:400px;
    display: flex;
    position: relative;
    .middle{
        width:400px;
        height:400px;
        background: #f5f5f5;
    }
    // .large{
    //     position: absolute;
    //     top: 0;
    //     left: 412px;
    //     width:400px;
    //     height:400px;
    //     z-index: 500;
    //     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //     background-repeat: no-repeat;
    //     // 背景图 ： 盒子大小 = 2；1 将来控制背景图的移动来实现放大的效果查看 background-position
    //     background-size:800px 800px ;
    //     background-color: #f8f8f8;
    // }

    .layer{
        width:200px;
        height:200px;
        background: rgba(0,0,0,0.2);
        left: 0;
        top: 0;
        position: absolute;
    }

    .small{
        width: 80px;

        li{
            width:68px;
            height:68px;
            margin: 0 0 12px 15px;
            background: rgba(0,0,0,0.2);
            cursor: pointer; //????

            &:hover{
                border: 2px solid $xtxColor;
            }

            &.active{
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>