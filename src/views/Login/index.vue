<!--  表单校验（账户名+密码+协议） -->

<script setup>

import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'; // 消息提示插件
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '../../stores/user' // pinia 状态管理库
const userStore = useUserStore()
const router = useRouter()

// 1.准备表单对象
const form = ref({
  account:'' ,
  password:'' ,
  agree: true
})
// 2.准备规则对象
const rules = {
  account:[
    {required:true, massage:'用户名不能为空', trigger:'blur'} // require必填:（布尔值） trigger验证逻辑的触发方式 : blur/change (鼠标挪走 不聚焦时，就做出判断是否正确。 还有一种是最后点击提交时)
  ],
  password:[
    {required:true, massage:'密码不能为空', trigger:'blur'},
    {min:6, max:14, massage:'密码长度为6-14个字符', trigger:'blur'}
  ],
  agree:[
    { // 自定义校验逻辑（勾选协议/通过  不勾选/不通过）
      validator:(rule, value, callback) => {
        console.log(value)
        // value 当前输入的数据
        // callback 校验处理函数
        if(value){
          callback() // 通过 则调用回调函数
        }else{
          callback( new Error('请勾选协议') ) // 不通过 则调用函数，并返回错误error
        }
      }
    }
  ]
}

// 3. 统一校验 点击登陆时

// 获取form组件Dom实例
const formRef = ref(null)
const doLogin = () => {
  const { account, password } = form.value // 结构赋值（接口只需要其中两个数据）

  // 调用实例方法
  formRef.value.validate(async (valid) => {
    console.log('11111',valid)
  // valid:所以表单都通过校验 才为true (防止用户直接点击登陆按钮，直接跳过表单校验)

   if(valid){
    // 1，发送post请求
    await userStore.getUserInfo({ account, password })
    // 2，用户提示 成功（ElMessage插件）
    ElMessage({ message: '登陆成功', type: 'success' })
    // 3.跳转 首页
    router.push( {path:'/'} )
   }
   else{

   }
   })
}

</script>

<template>
  <div>
    <header class="login-header">
      <div class="container">
        <h1 class="logo">
          <router-link to="/">小兔鲜</router-link>
        </h1>
        <router-link to="/" class="entry">
          进入网站首页
          <p class="iconfont icon1">&#xe860;</p>
          <p class="iconfont icon2">&#xe860;</p>
        </router-link>
      </div>
    </header>

    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登陆</a>
        </nav>

        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :rules="rules" :model="form"  label-position="right" label-width="60px" status-icon>
              <el-form-item  label="账户" prop="account">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"/>
              </el-form-item>
              <el-form-item  prop="agree" label-width="22px">
                <el-checkbox  v-model="form.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn"  @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.login-header{
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container{
    display: flex;
    align-items: flex-end; // 贴在底部
    justify-content: space-between;
  }
  .logo{
    width: 200px;
    a{
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;

    }
  }
  .entry{
      display: flex;
      width: 140px;
      margin-bottom: 38px;
      font-size: 16px;
      p{
        font-size: 18px;
        color: $xtxColor;
        letter-spacing: -5px; // 文本字符之间的间距 文本中的每个字符都会向前一个字符靠近5像素 更紧凑，
      }
    }
}

.login-section{
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper{
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0); // 向右移动100px
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

     nav{
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      // display: flex;
      padding: 0 40px;
      // text-align: right;
      // align-items: center;

      a{
        display: block;
        font-size: 18px;
        text-align: center;
        padding-top: 14px;
      }
     }
     .subBtn{
      width: 100%;
      color: #fff;
      background: $xtxColor;
     }
  }
}
.account-box{
  .form{
    padding: 0 20px 20px 20px;
  }
}

.login-footer{
  padding: 30px 0 50px;
  background: #fff;
  text-align: center;
  p{
    color:#999;
    padding-top:20px ;

    a{
      color:#999;
      padding: 0 10px;
      line-height: 1;
       ~a {
        border-left: 1px solid #ccc; // 相邻兄弟选择器 , 指定元素 a 之后的所有同级兄弟元素 都有左边框, (只有第一个没有)
       }
    }
  }
}
</style>
