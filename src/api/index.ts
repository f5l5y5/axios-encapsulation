import Request from './request'
import { config } from './config'
import type { IBaseRes, RequestConfig } from './types'

// =============   第一个请求    ===================
const api = new Request(config)

// 将请求包一层 转换成 请求 响应的方式
interface IReq<P, T> extends RequestConfig<IBaseRes<T>> {
	data?: P
}

export const request = <K = any, T = any>(config: IReq<K, T>): Promise<IBaseRes<T>> => {
	return new Promise((resolve, reject) => {
		const { method = 'GET' } = config
		if (method === 'get' || method === 'GET') {
			config.params = config.data
			delete config.data
		}
		return api
			.request<IBaseRes<T>>(config)
			.then(res => {
				resolve({ ...res, err: false })
			})
			.catch(err => {
				console.log('打印***err - request', err)
				// reject(err)
				resolve({ code: 0, data: null as T, msg: 'fail', err: true })
			})
	})
}
