import Request from './request'
import { config } from './config'
import type { ContentType } from 'axios'
import type { IBaseRes, RequestSingleConfig, RequestConfig } from './types'

// =============   第一个请求    ===================
const api = new Request(config)

// 将请求包一层 转换成 请求 响应的方式
interface IReq<K, T> extends RequestConfig<IBaseRes<T>> {
	data?: K
}

export const request = <K = any, T = any>(config: IReq<K, T>): Promise<IBaseRes<T>> => {
	return new Promise((resolve, reject) => {
		const { method = 'GET' } = config
		if (method === 'get' || method === 'GET') {
			config.params = config.data
		}
		// config.headers?.['Content-Type'] = 'text/plain'
		api.request<IBaseRes<T>>(config)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}
