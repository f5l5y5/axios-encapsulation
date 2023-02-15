import { request } from './index'

export const getList = data => request.get('/getList', data)
export const postList = data => request.post('/postList', data)
