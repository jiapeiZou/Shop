
// 把 components 中的所有组件都进行全局化注册（注册后 可以不用再引用了，直接使用components中的所有组件）
// 通过插件的方式

import ImageView from './ImageView/index.vue';
import XtxSku from './XtxSku/index.vue';

export const componentPlugin = {
    install(app){
        //app.component('组件名', 组件配置对象)
        app.component('ImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
}