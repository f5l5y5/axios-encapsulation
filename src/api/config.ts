import type { RequestConfig } from './types'

export const config: RequestConfig = {
	baseURL: 'http://localhost:3000',
	timeout: 1000 * 60 * 5,
	interceptors: {
		requestInterceptors: config => {
			config.headers.new = 'new'
			console.log('打印***实例化请求拦截器', config)
			return config
		},
		requestInterceptorsCatch: error => {
			console.log(error, '===========')
			// return Promise.reject(error)
		},
		responseInterceptors: response => {
			console.log('打印***实例化响应拦截器', response)
			return response
		},
		responseInterceptorsCatch: error => {
			console.log('打印***实例化响应error', error)
			// 将错误传递到上层
			return Promise.reject(error)
		}
	}
}
