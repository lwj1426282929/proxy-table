import axios from 'axios'
import { Notification } from 'element-ui'

const instance = axios.create({
  responseType: 'json'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    return Promise.reject(error)
  },
);

// 返回拦截器
instance.interceptors.response.use(
  response => {
    let message = response.data.message;
    if (message && message !== 'success') {
      Notification({
        title: '错误',
        message
      })
    }
    return response.data
  },
  error => {
    Notification({
      title: '错误',
      message: error
    });
    return Promise.reject(error)
  },
);

export default instance
