
<script setup>
import { getLikeListAPI } from '../../../apis/user' // 猜你喜欢接口
import ProductItem from '../../Home/components/ProductItem.vue' // 封装 产品卡片 子组件
import { useUserStore } from '../../../stores/userStore'
import { ref, onMounted } from 'vue'
const userStore = useUserStore()

const likeList = ref([])
const getLikeList = async() => {
    const res = await getLikeListAPI({ limit:4 })
    likeList.value = res.result
}

onMounted(() => getLikeList())

</script>

<template>
    <div class="container">

        <div class="header">
            <div class="user">
                <img :src="userStore.userInfo?.avatar">
                <p>{{ userStore.userInfo?.account }}</p>
            </div>
            <div class="icons">
                <a class="item" >
                    <span class="icon iconfont">&#xe660;</span>
                    <p>会员中心</p>
                </a>
                <a class="item">
                    <span class="icon iconfont">&#xe8b7;</span>
                    <p>安全设置</p>
                </a>
                <a class="item">
                    <span class="icon iconfont">&#xe64b;</span>
                    <p>地址管理</p>
                </a>
            </div>
        </div>

        <div class="conter">
            <h4>猜你喜欢</h4>
            <div class="goods">
                <ProductItem :product="goods"  v-for="goods in likeList" :key="goods.id" />
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.container{
    width: 1000px;
    display: flex;
    flex-direction: column;
}
.header{
    display: flex;
    height: 132px;
    background: url(../../../assets/images/center-bg.png) no-repeat center / cover;
    .user{
        display: flex;
        flex: 1;
        line-height: 132px;
        img {
            width: 85px;
            height: 85px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 60px;
            margin-top: 25px;
        }
        p {
            padding-left: 26px;
            font-size: 18px;
            font-weight: normal;
            color: white;
         }
    }
    .icons{
        display: flex;
        text-align: center;
        .item{
            display: block;
            color: white;
            width: 100px;
            margin-right: 20px;
            margin-top: 25px;
            .icon{
                font-size: 32px;
            }
        }
    }
}
.conter{
    h4{
        margin-left: 20px;
        height: 70px;
        line-height: 70px;
    }
}
.goods{
    display: block;
    width: 1000px;
    margin-bottom: 20px;
    // height: 300px;
    a{
        display: inline-block;
        width: 250px;
        height: 160px;
    }
}
</style>