// axios 基础封装
import axios from 'axios';
import router from '@/router'; // 这里没用 useRouter 使用范围：1.setup 函数中 2. composable 函数中 （因为它是Vue 3 的 Composition API 而设计的 ）
import { useUserStore } from '../stores/userStore'; // 存储在 pinia 中 的用户数据（token 从此取）
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from 'element-plus'; // 消息提示插件

// ----- 接口基地址 接口超时时间
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 拦截器

// ---- axios请求拦截器 (token 用户认证)
httpInstance.interceptors.request.use( config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// ----- axios响应式拦截器 
httpInstance.interceptors.response.use( res => res.data, e => {
  const userStore = useUserStore()

  // 统一错误提示
  console.log('eeeee',e)
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })

  // 401状态错误拦截器（token失效）
  if( e.response.status === 401 ){
    // 1.清空过期的用户信息(数据在pinia store中)
    userStore.clearUserInfo()
    // 2.跳转到登陆页
    router.push('/login')
  }
 
  return Promise.reject(e)
})

export default httpInstance
