
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCheckInfoAPI, createOrderAPI } from '../../apis/checkout'
import { getNewCartAPI } from '../../apis/cart'
import { useCartStore } from '../../stores/cartStore'
const cartStore = useCartStore()
const router = useRouter()

const checkInfo = ref({}) // 订单对象
const defaultAddress = ref({}) // 默认地址对象

const getCheckInfo = async () => {
// 获取商品详情接口
    const result = await getCheckInfoAPI()
    checkInfo.value = result.result
// 适配默认地址 从地址列表中筛选出 isDefault === 0
    const item  = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
    defaultAddress.value = item
}
onMounted(() => getCheckInfo())

// 控制弹框打开
const showDialog = ref(true) 

// 切换地址
const activeAddress = ref({})
const changeActive = (item) => {
    activeAddress.value = item // 当前被点击的那项
}
const confirm = () => {
    defaultAddress.value = activeAddress.value
    activeAddress.value = {}
    showDialog.value = false
}
const cancel = () => {
   showDialog.value = false
}

// 提交订单
const handleCreatOrder = async () => {
    const res = await createOrderAPI({
        deliveryTimeType: 1,
        payType: 1,
        payChannel: 1,
        buyerMessage: '',
        goods: checkInfo.value.goods.map(item => {
            return {
               skuId: item.skuId,
               count: item.count,
            }
        }),
        addressId: defaultAddress.value.id,
    })
    // 获取到后端返回的ID
    const orderId = res.result.id
    // 跳转到支付页 并携带订单ID
    router.push({
        path:'/pay',
        query: {
            id: orderId
        }
    })
    //  获取最新购物车列表 （清除已购的流程 后端操作了）
       const result = await getNewCartAPI()
        cartStore.cartList = result.result
}

</script>

<template>
    <div class="checkout">
        <div class="container">
             <!-- 收货地址 -->
           <h3 class="title">收货地址</h3>
           <div class="address">
              <div class="text">
                <!-- <div class="none" >需要先添加收货地址才可提交订单。</div> -->
                <ul >
                    <li><span>收&nbsp;货&nbsp;人&nbsp;:</span>{{ defaultAddress.receiver }}</li>
                    <li><span>联系方式:</span>{{ defaultAddress.contact }} </li>
                    <li><span>收货地址:</span>{{ defaultAddress.fullLocation }}</li>
                </ul>
              </div>
              <div class="button">
                <el-button @click="showDialog = true" >切换地址</el-button>
                <el-button >添加地址</el-button>
                <!-- 切换地址 弹框 -->   
                <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
                    <div class="addressWrapper">
                        <div class="text item"  @click="() => changeActive(i)" v-for="i in checkInfo.userAddresses" :key="i.id"  :class="{ active: activeAddress.id === i.id }">
                            <ul>
                                <li><span>收<i />货<i />人：</span>{{ i.receiver }} </li>
                                <li><span>联系方式：</span>{{ i.contact }}</li>
                                <li><span>收货地址：</span>{{  i.fullLocation }}</li>
                            </ul>
                        </div>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="cancel">取消</el-button>
                            <el-button type="primary" @click="confirm"> 确定 </el-button>
                        </span>
                    </template>
                </el-dialog>
                 <!-- 添加地址 弹框 -->      

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
                <el-button type="primary" @click="handleCreatOrder">提交订单</el-button>
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

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>