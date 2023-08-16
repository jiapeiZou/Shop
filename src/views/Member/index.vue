<script setup>

</script>

<template>
   <div class="container">
    <!-- 左 -->
       <div class="member">
            <h4>我的账户</h4>
            <div class="links">
                <router-link to="/member"> 个人中心 </router-link>
            </div>
            <h4>交易管理</h4>
            <div class="links">
                <router-link to="/member/order"> 我的订单 </router-link>
            </div>
       </div>
    <!-- 右（三级路由 -->
       <div class="article">
          <router-view />
       </div>
   </div>
</template>

<style lang="scss" scoped>
.container{
    // padding:0 100px;
    display: flex;
}
.member{
         margin-top: 20px;
         background: #fff;
         width: 220px;
         margin-right: 20px;
         border-radius: 2px;
        h4{
            font-size: 18px;
            font-weight: 400;
            padding: 20px 52px 5px;
            border-top: 1px solid #f6f6f6;
        }
        .links{
            padding: 0 52px 10px
        }
        a{
            display: block;
            line-height: 1;
            padding: 15px 0;
            font-size: 14px;
            color: #666;

            &:hover{
                color: $xtxColor;
            }
            // .router-link-exact-active 是Vue Router自动为完全匹配的路由添加的类。
             &.active,&.router-link-exact-active {
          color: $xtxColor;
            }
            }
    }
    .article {
        margin-top: 20px;
        width: 1000px;
        background-color: #fff;
        }
</style>