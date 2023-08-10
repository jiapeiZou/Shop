<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/userStore'
const router = useRouter()
const UserStore = useUserStore()


const confirm = () => { // el-popconfirm 中自带的 （confirm 点击确认按钮时触发）
  console.log('要退出了')
  // 退出登陆业务逻辑信息
    // 1. 清除用户信息 触发action
    UserStore.clearUserInfo( )
    // 2. 跳转到登陆页
    router.push('/login')
}



</script>

<template>
  <!--nav元素 它用于包含页面的 主要导航链接。语义化 -->
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模版渲染 区分登陆状态 与未登陆状态 -->
        <!-- 适配思路：判断localstorage中是否有token 登陆时显示v-if这一块  未登陆时显示v-else那块 -->
        <template v-if="UserStore.userInfo.token" >
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"> &#xe7ae; </i>
              {{ UserStore.userInfo.account }}
            </a>
          </li>
          <!-- <el-popconfirm> 气泡确认框 是 Element UI 组件库中的一个组件，它用于创建一个点击触发的确认框 -->
          <li>
            <el-popconfirm
              title="确定退出吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="confirm"
            >
              <template #reference>
                <a href="javascript:;" > 退出登陆 </a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;"> 我的订单 </a></li>
          <li><a href="javascript:;"> 会员中心 </a></li>
        </template>

        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')"> 请先登陆 </a></li>
          <li><a href="javascript:;"> 帮助中心 </a></li>
          <li><a href="javascript:;"> 关于我们 </a></li>
          <!-- 这个超链接使用了 href="javascript:;"，这是一个常用的技巧，用来创建一个 "伪链接"，当你点击这个链接时，它实际上不会导向任何页面，而只是执行 JavaScript 代码。在这个例子中，它实际上并不执行任何 JavaScript 代码，因为 ; 后面是空的。 -->
        </template>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

.app-topnav {
  background: #333;
}
ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;
}
li {
    a {
        border-right:2px solid #666; // ｜符号
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        // 图标
        i {
            font-size:14px;
            margin-right:2px;
        }
        // a 标签的伪类 ，鼠标放上去时变化的颜色
        &:hover {
            color: $xtxColor;
        }
    }
}

</style>
