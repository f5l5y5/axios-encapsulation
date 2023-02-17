import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestInterceptors<T> {
	//请求拦截
	requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
	requestInterceptorsCatch?: (err: AxiosError) => any

	//响应拦截
	responseInterceptors?: (response: T) => T
	responseInterceptorsCatch?: (err: AxiosError) => any
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>
}

// 返回参数定义
export interface IBaseRes<T = any> {
	code: number
	data: T
	msg: string
	err: boolean
}

// 将请求包一层 转换成 请求 响应的方式
export interface IReq<P, T> extends RequestConfig<IBaseRes<T>> {
	data?: P
}
