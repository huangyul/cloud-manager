<template>
	<div style="border: 1px solid #ccc">
		<Toolbar
			style="border-bottom: 1px solid #ccc"
			:editor="editorRef"
			:defaultConfig="toolbarConfig"
			:mode="mode"
		/>
		<Editor
			style="height: 500px; overflow-y: hidden"
			v-model="valueHtml"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="handleCreated"
			@onchanged="handleChanged"
		/>
	</div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const props = defineProps({
	data: {
		type: Object,
		default() {
			return {}
		},
	},
})

const emits = defineEmits(['update:data'])

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
	valueHtml.value = props.data
})

const toolbarConfig = {}
toolbarConfig.excludeKeys = [
	'emotion',
	'insertLink',
	'group-video',
	'insertTable',
]
const editorConfig = {
	placeholder: '请输入内容...',
	MENU_CONF: {
		uploadImage: {
			// 自定义上传
			async customUpload(file, insertFn) {
				console.log(file)
				// TODO
				// 最后将图片插入
				insertFn(url, alt, href)
			},
			onBeforeUpload(file) {
				console.log('onBeforeUpload', file)
				return false
			},
		},
	},
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})

const handleCreated = (editor) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChanged = () => {
	emits('update:data', valueHtml.value)
}
</script>
