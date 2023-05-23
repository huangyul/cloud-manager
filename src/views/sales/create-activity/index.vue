<!-- 创建活动页 -->
<script setup>
import List from './components/List.vue'
import Edit from './components/Edit.vue'
import { onBeforeUnmount, provide, ref } from 'vue'

// 切换
let pageType = ref('list') // list | edit
let curId = ref('')
const setList = () => {
	pageType.value = 'list'
}
const setEdit = (id) => {
	curId.value = id
	pageType.value = 'edit'
}
onBeforeUnmount(() => {
	pageType.value = 'list'
})
provide('created', {
	setEdit,
	setList,
})
</script>

<template>
	<List v-if="pageType == 'list'"></List>
	<Edit v-if="pageType == 'edit'" @go-back="setList" :id="curId"></Edit>
</template>
