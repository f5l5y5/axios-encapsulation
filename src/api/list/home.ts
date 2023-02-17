import { request } from '../index'

export interface IP {
	name: string
	age: number
}

interface IGetRes {
	name: string
	age: number
}

export const getList = (data: IP) =>
	request<IP, number>({
		url: '/getList',
		method: 'get',
		data,
		interceptors: {
			requestInterceptors: config => {
				config.headers.single = 'outer'
				console.log('打印***单个最外层接口请求拦截', config)
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

export const postList = (data: IP) =>
	request<IP, number>({
		url: '/postList',
		method: 'post',
		data,
		interceptors: {
			requestInterceptors: config => {
				console.log('打印***单个接口请求拦截', config)
				config.headers.single = 'outer'
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

// // 重写返回类型
// interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse<R>> {
//   data?: T
// }
// /**
//  * @description: 函数的描述
//  * @generic D 请求参数
//  * @generic T 响应结构
//  * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
//  * @returns {Promise}
//  */
// const ywzRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
//   const { method = 'GET' } = config
//   if (method === 'get' || method === 'GET') {
//     config.params = config.data
//   }
//   return request.request<YWZResponse<T>>(config)
// }
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

// export default ywzRequest
