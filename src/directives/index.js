
// app.directive  自定义 img-lazy（懒加载）全局指令   在main.js中使用

import { useIntersectionObserver } from '@vueuse/core' // 导入vueuse中的 判断元素是否进入视口的插件
// useIntersectionObserver 对于元素的监听 是一直存在的，每次滑过页面 都会进行判断 。存在内存浪费 。需要手动调用stop() 

export const lazyPlugin = {
    install(app) {
    // 懒加载 指令逻辑 app.directive('指令名', 指令配置对象)
        
        app.directive('img-lazy',{ // 【img-lazy为指令名】 使用v-img-lazy 在所有组件中都可使用
            // mounted 声明周期函数  在挂载（即第一次渲染） DOM 之后调用
            // el: 指令绑定的那个元素 （img）
            // binding: binding.value 指令等号后面绑定的表达式的值 （图片的url） console.log(el,binding.value)
            mounted(el,binding){
                // vueUse 中的插件: 判断元素是否进入视口（ 判断依据：参数isIntersecting 为布尔值 ，true时进入 false时没有进入） 
               const {stop} = useIntersectionObserver( el ,([{ isIntersecting }])=>{
                    if(isIntersecting){
                        // 进入视口区域 元素的src = binding.value(指令等号后面绑定的表达式的值 )
                        el.src = binding.value
                        // 通过结构赋值 获取useIntersectionObserver中的stop方法 ，当页面完成第一次后 不再监听
                        stop()
                    }
                })
            }
        })
    }
}

