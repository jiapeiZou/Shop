// axios 基础封装
import axios from 'axios'
import { useUserStore } from '../stores/user' // 存储在 pinia 中 的用户数据（token 从此取）
import 'element-plus/theme-chalk/el-message.css'
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
  // // 统一错误提示
  console.log(e)
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance
