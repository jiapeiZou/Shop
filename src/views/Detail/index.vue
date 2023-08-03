<script setup>
import { ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import { getDetailAPI } from '../../apis/detail'
import DetailHotVue from './components/DetailHot.vue'; // 子组件

const route = useRoute()
const detailId = route.params.id

const detailList = ref([])

const getDetail = async() =>{
    const result = await getDetailAPI(detailId)
    console.log("!!!!!!",result)
    detailList.value = result.result
}
onMounted( () => getDetail() )
</script>

<template>
    <div class="product-detail">
        <div class="container" v-if="detailList.brand">
            <!-- 面包屑导航 -->
            <div class="bread-container" >
                <el-breadcrumb separator=">">
                    <!-- 错误原因：detailList一开始为{ }  {}.categories -> undefind -> undefind[1] -> 报错
                        解决方法 1: 可选链 ？.  2: v-if 控制渲染时机，保证满足条件时才渲染  -->
                    <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path:`/category/${detailList.categories[1].id}` }"> {{ detailList.categories?.[1].name }} </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path:`/category/sub/${detailList.categories[0].id}` }"> {{ detailList.categories?.[0].name }} </el-breadcrumb-item>
                    <el-breadcrumb-item> ins风小碎花泡泡袖 </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <!-- 商品内容 -->
            <div class="info-container" >
                <div class="product-head">
                    <div class="product-info">

                        <div class="media">
                            <!-- 图片预览区 -->

                            <!-- 统计数量 -->
                            <ul>
                                <li>
                                    <p> 销量人气 </p>
                                    <p> {{detailList.salesCount}}+ </p>
                                    <p><i class="icon iconfont">&#xe6e4;</i>销量人气</p>
                                </li>
                                <li>
                                    <p> 商品评价 </p>
                                    <p> {{detailList.commentCount}}+ </p>
                                    <p><i class="icon iconfont">&#xe69a;</i>查看评价</p>
                                </li>
                                <li>
                                    <p> 收藏人气 </p>
                                    <p> {{detailList.collectCount}}+ </p>
                                    <p><i class="icon iconfont">&#xe60b;</i>收藏商品</p>
                                </li>
                                <li>
                                    <p> 品牌信息 </p>
                                    <p> {{ detailList.brand.name }} </p>
                                    <p><i class="icon iconfont">&#xe644;</i>品牌主页</p>
                                </li>
                            </ul>
                        </div>

                        <!-- 商品信息 -->
                        <div class="spec">
                            <p>{{ detailList.name }}</p>
                            <p>{{ detailList.desc }}</p>
                            <p class="last-p">
                                <span >&yen;{{ detailList.price }}</span>
                                <span >&yen;{{ detailList.oldPrice }}</span>
                            </p>
                            <div class="grey">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>12月好物放送，app领券购买直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>无忧退货</span>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                             <!-- sku组件 -->
                             <!--  数据组件 -->
                             <!--  按钮组件 -->
                            <div>
                                <el-button>加入购物车</el-button>
                            </div>
                        </div>
                       
                    </div>
                </div>
                
                <div class="product-footer">
                    <div class="product-article"> 
                        <div class="product-tabs">
                            <nav>
                                <a href="">商品详情</a>
                            </nav>
                            <div class="product-datail">
                                <!-- 属性 -->
                                <ul>
                                    <li v-for="item in detailList.details.properties" :key="item.value">
                                        <span class="dt">{{ item.name }}</span>
                                        <span class="dd">{{ item.value }}</span>
                                    </li>
                                </ul>
                                <!-- 图片 -->
                                <img v-for="img in detailList.details.pictures" :key="img" :src="img" alt="">
                            </div>
                        </div>
                    </div>  
                    <!-- 右侧 -->
                    <div class="product-aside">
                        <!-- 24小时热榜 -->
                        <DetailHotVue :hot-type=1 />
                        <!-- 周热榜 -->
                        <DetailHotVue :hot-type=2 />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bread-container{
    margin: 20px 0;
}
.product-info{
    background: #fff;
    display: flex;

    .media{
        width: 580px;
        height: 600px;
        padding: 30px 50px;

        ul{
            display: flex;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            width: 400px;
            height: 140px;
            align-items: center;
            text-align: center;

            li{
                flex: 1;
                border-right: 1px solid #999;
                .icon{
                    margin-right: 2px;
                    color: #27ba9b;
                    font-size: 14px;
                }
                &:last-child{
                    border-right:none;
                }
                p{
                    color: #cf4444;

                    &:first-child{
                        color: #999;
                        margin-bottom: 10px;
                    }
                    &:last-child{
                        color: #666;
                        margin-top: 10px;

                        &:hover {
                            color: $xtxColor;
                            cursor: pointer; // ????
                        }
                    }

                }
            }
        }
    }

    .spec{
        flex: 1;
        padding: 30px 30px 30px 0;

        p{
            color: #999;
            margin-bottom: 10px;
            &:first-child{
                font-size: 22px;
                color: #333;
            }
        }
        .last-p{
            margin-bottom: 10px;
            span{
                color: #cf4444;
                font-size: 22px;
                &:last-child{
                    font-size: 16px;
                    margin-left: 10px;
                    color: #999;
                    text-decoration: line-through;
                    
                }
            }
        }

        .grey{
            background: #f5f5f5;
            width: 500px;
            padding: 20px 10px 0 10px;
            margin: 10px 0;

            dl{
                padding-bottom: 20px;
                display: flex;
                align-items: center;

                dt {
                    width: 50px;
                    color: #999;
                }
                dd{
                    &:last-child{
                        span{
                            margin-right: 10px;

                            &::before {
                                content: "•";
                                color: $xtxColor;
                                margin-right: 2px;
                            }
                        }
                    }              
                    a {
                        color: $xtxColor;
                    } 
                }
            }
        }
    }
}

.product-footer{
    margin-top: 20px;
    display: flex;
    .product-article{
        background: #fff;
        min-height: 600px;

        nav {
            height: 70px;
            line-height: 70px;
            display: flex;
            margin-left: 20px;
            font-size: 18px;
            border-bottom: 1px solid #f5f5f5;
        }

        .product-datail{
            margin-bottom: 30px;

            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    // margin-bottom: 10px;
                    padding: 10px;
                    width: 50%;
                    display: flex;
                    flex-wrap: wrap;
                    .dt {
                        width: 100px;
                        color: #999;
                    }

                    .dd {
                        flex: 1;
                        color: #666;
                    }
                }
            }
        }
        img {
            width: 100%;
        }
    }
}
.product-aside{
    display: flex;
    flex-direction: column;
}
</style>