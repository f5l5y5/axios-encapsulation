<template>
	<button @click="handleClick">发送get请求</button>
	<button @click="handlePostClick">发送post请求</button>
	<div>{{ postInfo ?? '666' }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getList, postList } from './api/list/home'
// import { getList, postList } from './api/list/home'
// import type { IP } from './api/list/home'

const getInfo = ref()
const handleClick = async () => {
	const res = await getList({ name: 'jack', age: 18 })
	getInfo.value = res.data
}

const postInfo = ref()
const handlePostClick = async () => {
	const res = await postList({ name: 'jack', age: 18 })
	postInfo.value = res.data
}
</script>
<style scoped></style>
