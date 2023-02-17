import Request from './request'
import type { IBaseRes, RequestConfig, IReq } from './types'

export default (config: RequestConfig) => {
	const api = new Request(config)
	return function <K = any, T = any>(config: IReq<K, T>): Promise<IBaseRes<T>> {
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
					resolve({ code: 0, data: null as T, msg: 'fail', err: true })
				})
		})
	}
}
