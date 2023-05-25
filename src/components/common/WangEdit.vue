<template>
	<div style="border: 1px solid #ccc">
		<Toolbar
			style="border-bottom: 1px solid #ccc"
			:editor="editorRef"
			:defaultConfig="toolbarConfig"
			mode="default"
		/>
		<Editor
			style="height: 300px; overflow-y: hidden"
			v-model="valueHtml"
			:defaultConfig="editorConfig"
			mode="default"
			@onCreated="handleCreated"
		/>
	</div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const props = defineProps({
	data: {
		type: String,
		default: '',
	},
})

const emits = defineEmits(['update:data'])

// 内容 HTML
const valueHtml = ref('')

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

onMounted(() => {
	setTimeout(() => {
		valueHtml.value = props.data
	}, 500)
})

watch(valueHtml, (val, oldVal) => {
	if (oldVal && val != oldVal && oldVal != '<p></br></p>') {
		emits('update:data', val)
	}
})

const handleCreated = (editor) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
