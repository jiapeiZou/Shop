<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getHotAPI } from '../../../apis/detail'
// defineProps(
//     {
//         product:{
//             type: Object
//         }
//     }
// )

const route = useRoute()
const Id = route.params.id

const prodectList = ref([])

const paramsData = ref({
    id: Id,
    type: 1,
})

const getHot = async() => {
    const result = await getHotAPI(paramsData.value)
    prodectList.value = result.result
    console.log(prodectList.value)
}

onMounted( () => getHot () )

</script>

<template>
        <div class="product-hot">
        <div>
            <h3>周日榜单</h3>
            <router-link to="/" class="product-item"  v-for="item in prodectList" :key="item.id">
                <img :src="item.picture" alt="">
                <p class="name">{{ item.name }}</p>
                <p class="desc">{{ item.desc }}</p>
                <p class="price">&yen;{{ item.price }}</p>
            </router-link>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.product-hot{
    width: 250px;
    background: $helpColor;
    color: #fff;
    
    margin-left: 20px;
    font-weight: normal;
    h3{
       padding-left: 20px;
       line-height: 70px;
    }
}
.product-item{
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    &:hover{
        transform: translate3d(0 ,-5px ,0);
        box-shadow: 0 3px 8px  rgb(0 0 0 / 20%);
      }

    img{
        height: 160px;
        width: 160px;
    }
    p{
        padding-top: 10px;
        line-height: 18px;
        overflow: hidden; //  隐藏溢出内容
        text-overflow: ellipsis; // 超出部分用省略号
        white-space: nowrap; // 不换行
    }
    .name{
            font-size: 16px;
        }
    .desc{
        color: #999;
    }
    .price{
        color: $priceColor;
        font-size: 20px;
    }
}
</style>