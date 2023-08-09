<script setup>
import { useCartStore } from '../../stores/cart'
const cartStore = useCartStore()

const checkChange = (val, item) => {
    // console.log(val,item)
    cartStore.singleCheck(val, item)
}

const handleCheckAllChange = (bool) => {
    cartStore.allCheck(bool)
}
</script>

<template>
    <div class="cart">
        <div class="heade">
            <table>
                <thead>
                    <tr class="thead">
                        <th class="check iconfont">
                            <!-- 全选框 -->
                            <el-checkbox :model-value="cartStore.cartAllCheck"  @change="(bool) => handleCheckAllChange(bool)" size="large" />
                        </th>
                        <th width="400">商品信息</th>
                        <th width="220">单价</th>
                        <th width="180">数量</th>
                        <th width="180">小计</th>
                        <th width="140">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tbody" v-for="item in cartStore.cartList" :key="item.id">
                        <td class="check iconfont">
                            <!-- 单选框 -->
                            <el-checkbox  :model-value="item.selected"  @change="(val) => checkChange(val,item)" size="large"  />
                        </td>
                        <td class="img">
                            <router-link to="/"> <img :src="item.picture" alt="" /> </router-link>
                            <span>{{ item.name }}</span>
                        </td>
                        <td> &yen;{{ item.price }} </td>
                        <td>
                            <el-input-number v-model="item.count" :min="0"  />     
                        </td>
                        <td class="all"> &yen;{{ (item.count*item.price).toFixed(2) }} </td>
                        <td class="del"> 删除 </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="foot">
            <div class="total">
                共 {{cartStore.allCount}}件商品，已选择 {{cartStore.selectedCount}} 件，商品合计：
                <span class="yuan">&yen; {{cartStore.selectedPrice.toFixed(2)}}</span>
            </div>
            <div class="button">
                <el-button >下单结算</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart{
    margin-top: 20px;
    padding: 0 120px;
    .heade{
        background: #fff;
        padding: 20px;
       td{
        padding: 10px;
       }
       th{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
       }
       .check{
        color: $xtxColor;
        font-size: 20px;
       }
        tbody{
            text-align: center;
            .img{
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            img {
                width: 100px;
                height: 100px;
                margin-right: 5px;
                text-align: left;
                }
            .all{
                color: $priceColor;
                font-size: 16px;
            }
            .del{
                color: $xtxColor;
            }
        }

    }

    .foot{
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .total{
            font-size: 16px;
            margin-top: 5px;
            .yuan{
                font-size: 18px;
                color: $priceColor
            }
        }
        .button{
            .el-button{
                background: $xtxColor;
                color: #fff;
            }
        } 
    }
}
</style>