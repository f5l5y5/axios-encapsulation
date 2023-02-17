import type { RequestConfig } from '../src/types'

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
			return Promise.reject(error)
		},
		responseInterceptors: response => {
			return response
		},
		responseInterceptorsCatch: error => {
			// 将错误传递到上层
			return Promise.reject(error)
		}
	}
}
