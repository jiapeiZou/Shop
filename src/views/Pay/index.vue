
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import { getOrderAPI } from '../../apis/pay'
const route = useRoute()
const orderId = route.query.id // 获取路由上'?'号后的参数


// 调订单接口 获取数据渲染
const payInfo = ref()
const getPayInfo = async( ) => {
   const result = await getOrderAPI( orderId )
   payInfo.value = result.result
}
onMounted(() => getPayInfo( ))


// 跳转支付: 携带订单id以及回跳地址 跳转到 支付地址

// API的基础地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 支付完成后的回调地址。
const backURL = 'http://127.0.0.1:5173/paycallback'
// 对backURL进行了URI编码，将其存储在redirectUrl中 是对回调地址进行URI编码后的结果。URI编码是为了确保URL中的特殊字符不会破坏URL的结构
const redirectUrl = encodeURIComponent(backURL)
// 用户将要访问的支付地址
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`

</script>

<template>
    <div class="pay" >
        <div class="container">
            <!--付款信息 -->
            <div class="pay-info">
                <div class="icon iconfont">&#xe605;</div>
                <div class="remind">
                   <p class="text">订单提交成功！请尽快完成支付。</p>
                   <p class="time">支付还剩 <span> </span>, 超时后将取消订单</p>
                </div>
                <div class="price">
                    <span>应付总额：</span>
                    <span>&yen; {{ payInfo.payMoney.toFixed(2) }}</span>
                </div>
            </div>
            <!-- 付款方式 -->
            <div class="pay-type">
                <h3>选择以下支付方式付款</h3>
                <div class="item">
                    <p>支付平台</p>
                    <a class="btn iconfont wei" href="javascript:;">&#xe689; 微信支付</a>
                    <a class="btn iconfont zfb" :href="payUrl">&#xe617;支付宝</a>
                </div>
                <div class="item">
                    <p>支付方式</p>
                    <a class="btn" href="javascript:;">招商银行</a>
                    <a class="btn" href="javascript:;">工商银行</a>
                    <a class="btn" href="javascript:;">建设银行</a>
                    <a class="btn" href="javascript:;">农业银行</a>
                    <a class="btn" href="javascript:;">交通银行</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.pay{
    padding: 0 100px;
    .container{
        margin-top: 20px;
        .pay-info{
            padding: 50px;
            background: #fff;
            display: flex;
            justify-content: space-between;
            // line-height: 30px;
            // height: 200px;
            .icon{
                 font-size: 70px;
                 text-align: center;
                 color:$xtxColor;
            }
            .remind{
                margin-left: 5px;
                 flex: 1;
                 padding-top:25px ;
                 .text{
                    font-size:18px ;
                    color:#333;
                    font-weight: bolder;
                 }
                 .time{
                    margin-top: 5px;
                    color:#999;
                 }
            }
            .price{
                padding-top:30px ;
                span{
                    margin-right:10px;
                    color:#999;
                    &:last-child{
                        // margin-left: 5px;
                        color: $priceColor;
                        font-size:20px ;
                    }
                }
            }
        }

        .pay-type{
            margin-top: 20px;
            padding: 0 50px 50px 50px;
            background: #fff;
            h3{
                font-weight: normal;
                height: 70px;
                font-size: 16px;
                line-height: 70px;
                text-align: left;
                border-bottom: 1px solid  #f5f5f5;
            }
            .item{
                font-size: 14px;
                p{
                    height: 70px;
                    font-size: 16px;
                    line-height: 70px;
                    text-align: left; 
                }
                .btn{
                    width: 140px;
                    height: 40px;
                    border: 1px solid #e4e4e4;
                    text-align: center;
                    line-height: 40px;
                    margin-right: 10px;
                    color: #666666;
                    display: inline-block;

                    &.active,
                    &:hover { 
                        border-color: $xtxColor;
                    }
                }
                .zfb{
                    font-size: 16px;
                    color: #2f99fb;
                }
                .wei{
                    font-size: 16px;
                    color: #08c935;
                }
            }
        }
    }
}
</style>