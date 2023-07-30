<script setup>
import  HomePanel  from '../../Home/components/HomePanel.vue' // // 导入 公用内部结构
import { getHotAPI }  from '../../../apis/home'
import { ref } from 'vue'

// 获取 hot 接口数据
const hotList = ref([])
const getHot = async()=>{
  const result = await getHotAPI()
  hotList.value = result.result
  // console.log(hotList.value)
}

getHot()

</script>

<template>
  <div>
    <HomePanel title="人气推荐" sub-title="人气爆款，不容错过">
      <ul class="box">
        <li v-for="item in hotList" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" >
             <p class="name">{{ item.title }}</p>
             <p class="text">{{ item.alt }}</p>
          </router-link>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<style lang="scss" scoped>
.box{
  height: 406px;
  display: flex;
  justify-content: space-between;
  li{
    width: 306px;
    height: 406px;
    background: #ffffff;
    transition: all 0.5s; // 动画效果 所有可以进行过渡的 CSS 属性（all）将在半秒（.5s）的时间内平滑过渡到 hover时的状态

    &:hover{
      transform: translate3d(0 , -3px , 0); // 移动 x轴:0  y轴:3px z轴:0
      box-shadow:  0 3px 8px rgb(0 0 0 / 20%); // 阴影： 上0 左右3px  下8px 
    }
    img{
      width: 306px;
      height: 306px;
    }
    .name{
      margin: 0 8px ;
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      overflow: hidden; // 隐藏溢出内容
      white-space: nowrap; // 不换行
      text-overflow: ellipsis; // 超出部分用省略号

    }
    .text{
      margin: 0 8px ;
      font-size: 20px;
      padding-top: 12px;
      text-align: center;
      color: #dcdbdb;
    }
  }
}
</style>
