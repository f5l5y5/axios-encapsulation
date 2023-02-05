import Request from './request'
import type { RequestConfig, IBaseRes } from './types'

const config: RequestConfig = {
	baseURL: 'http://localhost:3000',
	timeout: 1000 * 60 * 5,
	interceptors: {
		requestInterceptors: config => {
			config.headers.new = 'new'
			console.log('打印***实例化请求拦截器', config)
			return config
		},
		responseInterceptors: response => {
			console.log('打印***实例化响应拦截器')
			return response
		}
	}
}

const api = new Request(config)

interface IReq<T, R> extends RequestConfig<IBaseRes<R>> {
	data?: T
}

export const request = <D = any, T = any>(config: IReq<D, T>) => {
	const { method = 'GET' } = config
	if (method === 'get' || method === 'GET') {
		config.params = config.data
	}
	return api.request<IBaseRes<T>>(config)
}
