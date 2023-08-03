<script setup>
import HomePanel from '../../Home/components/HomePanel.vue' // 导入 公用内部结构
import { getNewAPI } from '../../../apis/home'
import { onMounted, ref }  from 'vue'

// 获取接口数据
const newList = ref([])

const getNew = async() => {
  const result = await getNewAPI()
  newList.value = result.result
 console.log(newList.value)
}

onMounted(() => getNew())

</script>

<template>
  <div>
    <HomePanel title="新鲜好物" sub-title="新鲜出炉，品质无忧">
       <ul class="product-list">
          <li v-for="item in newList" :key="item.id">
            <router-link :to="`/detail/${item.id}`">
              <img  v-img-lazy="item.picture">
              <p class="name"> {{ item.name }} </p>
              <p class="price"> {{ item.price }} </p>
            </router-link>
          </li>
       </ul>
    </HomePanel>
  </div>
</template>

<style lang="scss" scoped>
.product-list{
  display: flex;
  justify-content: space-between; // flex布局下 先贴两边 再平分剩余空间
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s; // 表示 所有可以进行过渡的 CSS 属性（all）将在半秒（.5s）的时间内平滑过渡到 hover时的状态

    &:hover{ 
      transform: translate3d(0, -3px, 0); // 它可以将元素在 3D 空间内移动。函数的三个参数 x, y, z 分别表示元素在各轴上的位移
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
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
      white-space:nowrap; // 防止文本换行
      text-overflow: ellipsis; // 超出部分用省略号
    }
    .price{
      text-align: center;
      margin: 0 8px ;
      font-size: 22px;
      padding-top: 12px;
      color: $priceColor;
    }
  }
}
</style>
