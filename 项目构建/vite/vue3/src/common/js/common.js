import axios from 'axios'
import {useLocalStorage} from '@vueuse/core'
import {ElMessage} from 'element-plus'

axios.interceptors.request.use(config => {
  // 获取token类型
  const tokenType = 'Bearer'
  // 获取token
  const token = useLocalStorage('token').value
  // 设置参数格式
  if (!config.headers['Content-Type']) {
    config.headers = {
      'Content-Type': 'application/json'
    }
  }
  // 添加token到headers
  if (token) {
    config.headers['Authorization'] = tokenType + ' ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})


export const common = {
  axios (options) {
    return new Promise((resolve, reject) => {
      const params = {
        method: options.method,
        url: `${location.origin}/${options.url}`,
        params: options.params,
        data: options.data
      }
      if (options.responseType) {
        params.responseType = options.responseType
      }
      axios(params).then(res => {
        if(res.data.code === 200) {
          resolve(res.data.data)
        } else if (Object.prototype.toString.call(res.data) === '[object ArrayBuffer]') {
          resolve(res)
        } else {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error',
          })
        }
      }).catch(err => {
        if (err && err.response) {
          ElMessage({
            showClose: true,
            message: err.response.data.message || err.response.data.data,
            type: 'error',
          })
          if (err.response.data.code) {
            // 用户登录异常code
            const commonUserCode = [100002, 401, 511]
            if (commonUserCode.includes(err.response.data.code)) {
              // common.logout()
            }
          }
        }
        reject(err)
      })
    })
  },
  logout () {
    let loginUrl = useLocalStorage('adminUrl') + '#/login'
    // 从第三方界面进入时 退出登录需通知父级iframe外层容器退出，否则直接退出到登录页
    // var pageFrom = common.getUrlParam('pageFrom')
    let pageFrom = useLocalStorage('orders_pageFrom')
    if (pageFrom) {
      window.parent.location.href = loginUrl.value
    }
  },
}
