
<!-- 公用图片预览组件：小图切换大图 放大镜 激活状态 -->

<script setup>
import { useMouseInElement } from '@vueuse/core' // 跟踪鼠标在元素中的位置和状态 
import { ref, watch } from 'vue'

// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]
// 1. 小图 切换 大图
const imgIndex = ref(0)
const enter = (index) => {
    imgIndex .value = index
    console.log(imgIndex .value)
}

// 2. 获取鼠标相对位置
const target = ref(null) // 获取 滑块所在的容器的 DOM 元素 。创建了一个可响应的引用，并将其初始化为 null。
const { elementX, elementY, isOutside } = useMouseInElement(target) // 解构  并传入一个你想要跟踪的元素（ref类型）。 useMouseInElement 返回响应性引用 

// 3.控制滑块跟随鼠标移动 （监听elementX/Y变化，一旦变化 重置left/top)
// 小图坐标
const left = ref(0)
const top = ref(0)
// 大图坐标
const positionX = ref(0)
const positionY = ref(0)
// 监听鼠标移动
watch( [elementX, elementY], () => { 
  // 如果鼠标没有移入盒子里 ，则后续代码不执行。直接return
  if(isOutside.value ) return 

  // 【有效范围内控制滑块距离】
  // 横向
  if(elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100 // (100 = 滑块宽度的1/2)
  }
  // 纵向
  if(elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100 // (100 = 滑块宽度的1/2)
  }
  // 【边界处理】
  // 横向
  if(elementX.value < 100 ) {left.value = 0}
  if(elementX.value > 300 ) {left.value = 200}
  // 纵向
  if(elementY.value < 100 ) {top.value = 0}
  if(elementY.value > 300 ) {top.value = 200}

  // 4.控制大图的显示(小图的两倍 并反向移动)
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2

})

</script>

<template>
    <div class="product-img">
        <!-- 左侧大图 -->
        <div class="middle" ref="target">
            <img :src="imageList[imgIndex]" alt="">
             <!-- 蒙层小滑块 (内联样式)-->
            <div class="layer" v-show="!isOutside" :style="{ left:`${left}px`, top:`${top}px`}"></div>
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
        <div class="large" 
            v-show="!isOutside"
            :style="[{
                backgroundImage:`url(${imageList[imgIndex]})`,
                backgroundPositionX:`${positionX}px`,
                backgroundPositionY:`${positionY}px`
                }]"
        >

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

    // 放大镜图
    .large{
        position: absolute;
        top: 0;
        left: 412px;
        width:400px;
        height:400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图 ： 盒子大小 = 2；1 将来控制背景图的移动来实现放大的效果查看 background-position
        background-size:800px 800px ;
        background-color: #f8f8f8;
    }

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