<template>
	<button @click="handleClick">发送get请求</button>
	<button @click="handlePostClick">发送post请求</button>

	<div>postInfo:{{ postInfo ?? '666' }}</div>

	<div>getInfo:{{ getInfo ?? '666' }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getList, postList } from './api/list/home'

const getInfo = ref()
const handleClick = async () => {
	const res = await getList({ name: 'jack', age: 18 })
	console.log('打印***res---getList', res)
	getInfo.value = res
}

const postInfo = ref()
const handlePostClick = async () => {
	const res = await postList({ name: 'jack', age: 18 })
	postInfo.value = res
}
</script>
<style scoped></style>
