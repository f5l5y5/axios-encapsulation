import axios from 'axios'
import pend from '@sunrisecn/axios-abort'

const config = {
	baseURL: 'http://localhost:3000',
	timeout: 12000
}

/*
{
	url:[] 进入push  结果未返回直接shift后取消  结果已返回则直接删除 不需要取消
}



*/

// 存放数据
// const pendingMap = new Map()

// /**
//  * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
//  * @param {*} config
//  */
// function addPending({ url, method }) {
// 	const key = `${url}-${method}`
// 	const controller = new AbortController()
// 	const controllerList = []
// 	if (pendingMap.has(key)) {
// 		pendingMap.get(key).push(controller)
// 	} else {
// 		controllerList.push(controller)
// 		pendingMap.set(key, controllerList)
// 	}
// 	return controller.signal
// }

const _axios = axios.create(config)

_axios.interceptors.request.use(
	config => {
		// console.log('打印***config-interceptors', pendingMap)
		pend.judge({ url: config.url, method: config.method })
		// const key = `${config.url}-${config.method}`
		// const controllerList = pendingMap.get(key)
		// if (controllerList.length > 1) {
		// 	controllerList[0].abort()
		// 	controllerList.shift()
		// }
		return config
	},
	error =>
		// Do something with request error
		Promise.reject(error)
)

// Add a response interceptor
_axios.interceptors.response.use(
	response => {
		// removePending(response.config)
		// pendingMap.delete(`${response.config.url}-${response.config.method}`)
		// console.log('打印***response-pendindMap', pendingMap)
		pend.remove({ url: response.config.url, method: response.config.method })
		return response
	},
	error => {
		// Do something with response error
		// error.config && removePending(error.config)
		return Promise.reject(error)
	}
)

class Request {
	// NOTE:处理接口缓存逻辑(优先返回缓存数据)
	async get(url, params, config) {
		const res = await _axios
			.get(url, {
				...config,
				params,
				signal: pend.add({ url, method: 'get' })
			})
			.catch(err => Promise.reject(err))
		return res?.data
	}

	async post(url, data, config) {
		const res = await _axios
			.post(url, data, {
				...config,
				signal: pend.add({ url, method: 'post' })
			})
			.catch(err => Promise.reject(err))
		return res?.data
	}
}

export const request = new Request()
