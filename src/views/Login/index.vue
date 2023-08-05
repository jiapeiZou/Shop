

<script setup>

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
            <el-form label-position="right" label-width="60px" status-icon>
              <el-form-item  label="账户">
                <el-input/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input/>
              </el-form-item>
              <el-form-item label-width="22px">
                <el-checkbox  size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn">点击登录</el-button>
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
