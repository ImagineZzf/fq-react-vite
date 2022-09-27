import axios from 'axios'

interface requestErrorInterface {
  status?: number,
  errorKey?: string
}

const defaultConfig = {
  alert: true, // 全局提示
  loading: false // 全局loading
}

// 错误处理
const handlerError = (error: requestErrorInterface, config = defaultConfig) => {
  // TODO: 增加错误处理逻辑，根据具体接口处理
  return
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000
})

// 请求前置拦截器
instance.interceptors.request.use((config) => {
  // TODO: getStorage从utils中获取
  // const token = getStorage()

  // if (!token) {
  //   // 判断是否有token，没有则跳转登录
  //   goToLogin()
  // } else {
  //   config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${token}`
  //   }
  // }
  return config

})

// 请求后置拦截器
instance.interceptors.response.use(
  (res) => {
    return typeof res.data === 'undefined' ? res : res.data
  },
  (err) => {
    if (axios.isCancel(err)) {
      // 请求已取消
      handlerError({
        errorKey: 'REQUEST_CANCELED'
      })
      return Promise.reject('REQUEST_CANCELED')
    }
    if (err.message.includes('timeout')) {
      // 请求超时
      handlerError({
        errorKey: 'REQUEST_TIMEOUT'
      })
      return Promise.reject('REQUEST_TIMEOUT')
    }
    const { status, data, config } = err.response
    if (typeof data === 'string' && data.includes('ENETUNREACH')) {
      // 网络已断开
      handlerError({
        errorKey: 'ENETUNREACH'
      }, config)
    } else {
      handlerError(data, config)
    }
    return Promise.reject(data)
  }
)

const request = {
  post: (url: string, data: any, options = {}) => {
    return instance({
      method: 'post',
      url,
      data,
      headers: { 'Content-Type': 'application/json;' },
      ...defaultConfig,
      ...options
    })
  },
  get: (url: string, data: any, options = {}) => {
    return instance({
      method: 'get',
      url,
      params: data,
      headers: { 'Content-Type': 'application/json;' },
      ...defaultConfig,
      ...options
    })
  },
  put: (url: string, data: any, options = {}) => {
    return instance({
      method: 'put',
      url,
      data,
      headers: { 'Content-Type': 'application/json;' },
      ...defaultConfig,
      ...options
    })
  },
  delete: (url: string, data: any, options = {}) => {
    return instance({
      method: 'delete',
      url,
      data,
      headers: { 'Content-Type': 'application/json;' },
      ...defaultConfig,
      ...options
    })
  },
  upload: (url: string, data: any, options = {}) => {
    return instance({
      method: 'post',
      url,
      data,
      headers: { 'Content-Type': 'multipart/form-data;' },
      ...defaultConfig,
      ...options
    })
  },
  postUrl: (url: string, data: any, options = {}) => {
    return instance({
      method: 'post',
      url,
      params: data,
      headers: { 'Content-Type': 'application/json;' },
      ...defaultConfig,
      ...options
    })
  }
}

export default request