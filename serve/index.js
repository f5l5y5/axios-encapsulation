const Koa = require('koa')
// 使用直接执行 就不需要new
const router = require('koa-router')()
const cors = require('koa-cors')

const app = new Koa()
app.use(cors())

let index = 0
router.get('/getList', ctx => {
	// if (index % 2) {
	// 	ctx.body = {
	// 		code: 1,
	// 		data: {
	// 			name: 'get',
	// 			age: 20
	// 		},
	// 		msg: 'success'
	// 	}
	// } else {
	throw new Error('错误')
	// 	let timer = setTimeout(() => {
	// 		ctx.body = {
	// 			code: 0,
	// 			data: {
	// 				name: 'get',
	// 				age: 30
	// 			},
	// 			msg: 'success'
	// 		}
	// 	}, 2000)
	// 	clearTimeout(timer)
	// }
	// index++
})
// 动态路由
router.post('/postList', ctx => {
	ctx.body = {
		code: 1,
		data: {
			name: 'post',
			age: 18
		},
		msg: 'success'
	}
})

// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
	console.log('http://localhost:3000')
})
