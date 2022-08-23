import axios from 'axios'
import { Message } from 'element-ui'

// export const baseURL = 'http://localhost:8080'
export const baseURL = 'http://localhost:8080'

// 创建axios实例
const service = axios.create({
  baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// 相应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is 0, it is judged as an error.
    if (res.code === 0) {
      Message({
        showClose: true,
        message: res.msg ?? '服务器处理错误！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg ?? '请求返回错误！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

service.defaults.headers.post['Content-Type'] = 'application/json'
export default service
