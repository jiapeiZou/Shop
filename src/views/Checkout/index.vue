
<script setup>
import { ref, onMounted } from 'vue'
import { getCheckInfoAPI } from '../../apis/checkout'
// import { useCartStore } from '../../stores/cartStore'
// const cartStore = useCartStore()

const checkInfo = ref({}) // 订单对象
const defaultAddress = ref({}) // 默认地址对象
const getCheckInfo = async () => {
    const result = await getCheckInfoAPI()
    checkInfo.value = result.result
    console.log('.........', checkInfo.value)

    const item  = checkInfo.value.userAddresses.filter(item => item.isDefault === 0)
    defaultAddress.value = item

    console.log('/////', defaultAddress.value)

}
onMounted(() => getCheckInfo())

</script>

<template>
    <div class="checkout">
        <div class="container">
             <!-- 收货地址 -->
           <h3 class="title">收货地址</h3>
           <div class="address">
              <div class="text">
                <!-- <div class="none" >需要先添加收货地址才可提交订单。</div> -->
                <ul v-for="i in defaultAddress" :key="i.index">
                    <li><span>收&nbsp;货&nbsp;人&nbsp;:</span>{{ i.receiver }}</li>
                    <li><span>联系方式:</span>{{ i.contact }} </li>
                    <li><span>收货地址:</span>{{ i.fullLocation }}</li>
                </ul>
              </div>
              <div class="button">
                <el-button>切换地址</el-button>
                <el-button>添加地址</el-button>
              </div>
           </div>
           <!-- 商品信息 -->
           <h3 class="title">商品信息</h3>
           <div class="goodsinfo">
                <table class="goods">
                    <thead class="grey">
                        <tr>
                            <th width="520">商品信息</th>
                            <th width="170">单价</th>
                            <th width="170">数量</th>
                            <th width="170">小计</th>
                            <th width="170">实付</th>
                        </tr>
                    </thead>
                    <tbody class="detail">
                        <tr v-for="item in checkInfo.goods" :key="item.Id">
                            <td><a href="javascript:;">
                                    <img :src="item.picture" >
                                    <div class="imgtext">
                                        <p>{{ item.name }}</p>
                                        <p>{{ item.attrsText }}</p>
                                    </div>
                                </a></td>
                            <td>&yen;{{ item.price }}</td>
                            <td>{{ item.count }}</td>
                            <td>&yen;{{ item.totalPrice }}</td>
                            <td>&yen;{{ item.totalPayPrice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 配送时间 -->
            <h3 class="title">配送时间</h3>
                <div class="time">
                    <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
                    <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
                    <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
                </div>
            <!-- 支付方式 -->
            <h3 class="title">支付方式</h3>
                <div class="time">
                    <a class="my-btn active" href="javascript:;">在线支付</a>
                    <a class="my-btn" href="javascript:;">货到付款</a>
                    <span class="z">货到付款需付5元手续费</span>
                </div>

            <!-- 金额明细 -->
            <h3 class="title">金额明细</h3>
               <div class="money">
                    <div class="box">
                        <div class="box-text">
                            <div class="left">商品件数：</div>
                            <div class="right">{{checkInfo?.summary?.goodsCount}}件</div>
                        </div>
                        <div class="box-text">
                            <div class="left">商品总价：</div>
                            <div class="right">&yen;{{ checkInfo?.summary?.totalPrice }}</div>
                        </div>
                        <div class="box-text">
                            <div class="left">运 &nbsp;&nbsp;&nbsp;&nbsp; 费：</div>
                            <div class="right">&yen;{{ checkInfo?.summary?.postFee }}</div>
                        </div>
                        <div class="box-text">
                            <div class="left">应付总额：</div>
                            <div class="right last">&yen;{{ checkInfo?.summary?.totalPayPrice }}</div>
                        </div> 
                    </div>
               </div>
            <!-- 提交 -->
            <div class="submit">
                <el-button type="primary">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
.checkout{
    margin-top: 20px;
    padding: 0 100px;
    .container{
        padding: 0 20px;
        background: #fff;
        .title{
            font-size: 16px;
            line-height: 70px;
            font-weight:normal;
            border-bottom: 1px solid #f5f5f5;
        }
        .address{
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
            .text{
                color: #333;
               
                li{
                    line-height: 30px;
                    span{
                        margin-right: 5px;
                        color: #999;
                    }
                }
            }
            .button{
                margin-top: 50px;
                margin-right: 20px;
            }
        }
        .goodsinfo{
            margin-top: 20px;
            .goods{
                border-collapse: collapse; // 去掉表单的边框线
                border: 1px solid #f5f5f5 ;
            }
            .grey{
                background: #f5f5f5;
            th{
                line-height: 50px;
            }
            }
            td{
                padding: 20px;
                text-align: center;
                .imgtext{
                   margin-top: 15px;
                }
                &:first-child{
                    text-align: left;
                }
                a{
                    display: flex;
                }
                img {
                    width: 70px;
                    height: 70px;
                    margin-right: 20px;
                    }
            }

        }
        .time{
            display: flex;
            justify-content: left;
            padding: 20px;
            .z{
               color: #999;
               margin-top: 15px;
            }
            .my-btn{
                width: 228px;
                height: 50px;
                border: 1px solid #e4e4e4;
                text-align: center;
                line-height: 48px;
                margin-right: 25px;
                color: #666666;
                display: inline-block;
                &.active,
                &:hover { 
                    border-color: $xtxColor;
                }
            }
        }
      .money{
            height: 260px;
            background: #fff;
            padding: 20px;
            position: relative;
            border-bottom: 1px solid #f5f5f5;
        .box{
            position: absolute;
            right:50px;
            .box-text{
                display: flex;
              .left{
                line-height: 50px;
                width: 120px;
                text-align: right;
              }
              .right{
                line-height: 50px;
                width: 200px;
                text-align: right;
              }
              .last{
                    font-size: 20px;
                    color: $priceColor;
                }
            }
        }
      }
      .submit{
        height: 80px;
        text-align: right;
        line-height: 80px;
        margin-right: 40px;
      }
    }
}
</style>