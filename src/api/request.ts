import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors, RequestSingleConfig } from './types'

class Request {
	private instance: AxiosInstance
	private interceptorsObj?: RequestInterceptors<AxiosResponse>

	constructor(config: RequestConfig) {
		// 1.创建axios实例
		this.instance = axios.create(config)
		// 2.传入拦截器
		this.interceptorsObj = config.interceptors

		// 全局请求类拦截器
		this.instance.interceptors.request.use(
			(req: InternalAxiosRequestConfig) => {
				req.headers.class = 'class'
				console.log('打印***类请求拦截器', req)
				return req
			},
			(error: AxiosError) => error
		)
		// 此处为了多个config传入不同的拦截器
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch
		)
		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch
		)

		//全局响应拦截器
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				console.log('打印***类响应拦截器', response)
				return response
			},
			(error: AxiosError) => error
		)
	}
	public request<T>(config: RequestSingleConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 单个请求设置拦截器在这里
			if (config.interceptors?.requestInterceptors) {
				console.log('打印***请求拦截 单个接口 ====>', config)
				config = config.interceptors.requestInterceptors(config)
			}
			this.instance
				.request<any, T>(config)
				.then(res => {
					console.log('打印***响应拦截 单个接口 ====>', res)

					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors(res)
					}
					resolve({ ...res, err: null })
				})
				.catch((err: any) => {
					reject(err)
				})
		})
	}
}

// 实例请求 ----> 类请求 ----> 实例响应 ----> 类响应
export default Request
