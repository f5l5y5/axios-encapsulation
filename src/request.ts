import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
	private instance: AxiosInstance
	private interceptorsObj?: RequestInterceptors<AxiosResponse>

	constructor(config: RequestConfig) {
		// 1.创建axios实例
		this.instance = axios.create(config)
		// 2.传入拦截器
		this.interceptorsObj = config.interceptors

		// 此处为了多个config传入不同的拦截器
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch
		)
		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch
		)
	}
	public request<T>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 单个请求设置拦截器在这里 问题是类型不兼容
			if (config.interceptors?.requestInterceptors) {
				this.instance.interceptors.request.use(config.interceptors.requestInterceptors)
			}
			this.instance
				.request<any, T>(config)
				.then(res => {
					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors(res)
					}
					resolve(res)
				})
				.catch((err: AxiosError) => {
					reject(err)
				})
		})
	}
}

// 实例请求 ----> 类请求 ----> 实例响应 ----> 类响应
export default Request
