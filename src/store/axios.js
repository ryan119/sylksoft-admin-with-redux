import axios from 'axios'
import { API_HOST, WEB_HOST } from 'src/conf'
import { commonAlertError } from '../actions/common'
import { useErrorLogger, useInfoLoggerInFunction } from '../libs/hooks'

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX
console.log('api host: ', WEB_HOST)

export const mxmtAPI = axios.create({
  baseURL: `${API_HOST}`
})

export const instance = axios.create({
  baseURL: `${WEB_HOST}${API_PREFIX}`
})

export const setupAxiosInterceptor = (store, axiosInstance, router) => {
  axiosInstance.interceptors.request.use(
    async function(config) {
      await useInfoLoggerInFunction(`[axios req url] ${config?.url}`)
      if(config.method === 'post') {
        //console.log('config: ', config)
        //await useInfoLoggerInFunction(`[axios req header] ${JSON.stringify(config?.headers, null, 2)}`)
        //await useInfoLoggerInFunction(`[axios req data] ${JSON.stringify(config?.data)}`)
      }
      return config
    },
    function(error) {
      console.log('Error in Config :', error)
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    async function(response) {
      //console.log('response: ', response)
      //await useInfoLoggerInFunction(`[axios response url] ${JSON.stringify(response?.config.url, null, 2)}`)
      //await useInfoLoggerInFunction(`[axios response headers] ${JSON.stringify(response?.headers)}`)
      return response
    },
    async function(error) {
      //console.log('axios interceptor error', error.response.status)
      await useErrorLogger(`[Axios Interceptor Error]  ${JSON.stringify(error)}`)
      if (error?.response?.status === 401) {
        //router.push('/login')
        //先導去index login
        store.dispatch(commonAlertError(null, 'Token驗證失敗，請重新登入', () => router.push('/login')))
      }
      return Promise.reject(error)
    }
  )
}

