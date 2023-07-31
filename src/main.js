// 引入初始化样式文件
import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/iconfont.css' // 引入iconfont
import { lazyPlugin } from './directives' // 引入懒加载指令 


const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(lazyPlugin) // 注册插件

app.mount('#app')


// 注册 自定义全局组件
// 使用v-img-lazy 在所有组件中都可使用，img-lazy为指令名
//app.directive('img-lazy',{ 
        // mounted 声明周期函数  在挂载（即第一次渲染） DOM 之后调用
        // el: 指令绑定的那个元素 （img）
        // binding: binding.value 指令等号后面绑定的表达式的值 （图片的url） console.log(el,binding.value)
    //mounted(el,binding){
        // vueUse 中的插件: 判断元素是否进入视口（ 判断依据：参数isIntersecting 为布尔值 ，true时进入 false时没有进入） 
       // useIntersectionObserver( el ,([{ isIntersecting }])=>{
           // if(isIntersecting){
                // 进入视口区域 元素的src = binding.value(指令等号后面绑定的表达式的值 )
              //  el.src = binding.value
          //  }
       // })
   // }
//})

// 把逻辑封装在directives里了，这里直接导入

