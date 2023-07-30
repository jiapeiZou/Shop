<!-- panel 嵌板   新鲜好物，热门产品...的公用内部结构，由调用它的组件 插槽来自定制 -->

<script setup>
// 定义prpos 接收父组件传入的参数
defineProps({
    title: { type:String }, // 主标题
    subTitle: { type:String } // 副标题
})


</script>

<template>
    <div class="panel">
        <div class="container">
            <!-- 主标题&副标题 -->
            <div class="head">
                <h3>{{ title }}<small>{{ subTitle }}</small> </h3>
            </div>
            <!-- 主体内容区 插槽-->
            <div>
               <slot> </slot>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.panel{
    background-color: #fff;
    .head{
        padding: 40px 0;
        display: flex;
        // align-items: flex-end; // 弹性项目在容器的交叉轴上的结束位置对齐

        h3{
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;
            
            small{
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>