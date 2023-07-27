<script setup>

</script>

<template>
    <footer class="app__footer"> 
        <div class="contact">
            <div class="container">
               <!-- 联系我们 -->
                <div class="contact__item">
                    <div class="contact__item__text">客服服务</div>
                    <div class="contact__item__img">
                        <div class="box1">
                            <div class="icon iconfont">&#xe7c7;</div>
                            <div class="text"> 在线客服 </div>
                        </div>
                        <div class="box1">
                            <div class="icon iconfont">&#xe675;</div>
                            <div class="text"> 问题反馈 </div>
                        </div>
                    </div>
                </div>

                <div class="contact__item">
                    <div class="contact__item__text">关注我们</div>
                    <div class="contact__item__img">
                        <div class="box1">
                            <div class="icon iconfont">&#xe65c;</div>
                            <div class="text"> 公众号 </div>
                        </div>
                        <div class="box1">
                            <div class="icon iconfont">&#xe600;</div>
                            <div class="text"> 微博 </div>
                        </div>
                    </div>
                </div>

                <div class="contact__item">
                    <div class="contact__item__text">下载APP</div>
                    <div class="contact__item__img">
                        <div class="box1">
                            <img class="img" src="@/assets/images/qrcode.jpg" />
                        </div>
                        <div class="box3">
                            <div class="text1"> 扫描二维码 </div>
                            <div class="text2"> 立马下载APP </div>
                            <a href="javascript:;">下载页面</a>
                        </div> 
                    </div>
                </div>

                <div class="contact__item">
                    <div class="contact__item__text">服务热线</div>
                    <div class="contact__call">
                        <div class="number">400-0000-000</div>
                        <div class="time">周一至周日 8:00-18:00</div>
                    </div>
                </div>
            </div>
        </div>
    <!-- 其他 -->
    <div class="extra">
        <div class="extra__area">
            <div class="extra__area__text"><i class="iconfont icon-footer01">&#xe606;</i>价格亲民</div>
            <div class="extra__area__text"><i class="iconfont icon-footer01">&#xe63f;</i>物流快捷</div>
            <div class="extra__area__text"><i class="iconfont icon-footer01">&#xe8ce;</i>品质新鲜</div>
        </div>
<!-- 版权信息 -->
        <div class="bottom">
            <p class="bottom__text">
                <a href="javascript:;">关于我们</a>
                <a href="javascript:;">帮助中心</a>
                <a href="javascript:;">售后服务</a>
                <a href="javascript:;">配送与验收</a>
                <a href="javascript:;">商务合作</a>
                <a href="javascript:;">搜索推荐</a>
                <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
    </div>
</footer>

</template>

<style lang="scss" scoped>
.app__footer{
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;
}
.contact{
    display: flex;
    background: #fff;
    &__item{
        height: 190px;
        text-align: center;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        color: #999;
    }
}
.container{
    margin: 0;
    padding: 60px 0 40px 25px;
      display: flex;
}
.contact__item__text{
    line-height: 1;
    font-size: 18px;
    text-align: center;
}
.contact__item__img{
    display: flex;
}
.box1{
    margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
}
.icon{
    color: #666;
    flex: 1;
    font-size: 40px;
}
.text{
    text-align: center;
}
.img{
    background: #fff;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
}
.box3{
    margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      font-size: 14px;
      a{
        display: block;
        line-height: 1;
        color:#fff;
        background: $xtxColor;
        border-radius: 2px;
        margin-top: 5px;
        padding: 6px 10px;
      }
}
.contact__call{
    padding-top: 60px;
      font-size: 22px;
      width: 204px;
    //   height: auto;
}
.number{
color:#666 ;
}
.time{
    font-size: 14px;
    color: #999;
}
.extra{
    background-color: #333;
    &__area{
       display: flex;
       justify-content: space-around;
       height: 178px;
        line-height: 58px;
        padding: 60px 100px;
        border-bottom: 1px solid #434343;
       &__text{
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
       }
    }
}
.bottom{
    // height: 170px;
    padding: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    &__text{
       display: flex;
       justify-content: center;
       margin-bottom: 12px;
       a{
        color: #999;
        line-height: 1;
        padding: 0 10px;
        border-right: 1px solid #999;
            &:last-child {
            border-right: none; //  去掉最后一个a元素的｜符号
            }
       }
    }
}
.icon-footer01{
    padding-bottom: 5px;
    margin-right: 5px;
    font-size: 30px;
    color: #fff;
}
</style>
