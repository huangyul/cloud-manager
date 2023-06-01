<script setup>
import { inject } from 'vue'

const props = defineProps({
	icon: {
		type: String,
		default: '',
	},
	name: String,
	type: String,
	data: {
		type: Object,
		default() {
			return {}
		},
	},
})

const generateUrl = (url) => {
	return `/images/sale/Sales_icon/${url}.png`
}

const { setEdit, setList } = inject('created')
const handleCreate = (id, name) => {
	setEdit(id, name)
}
</script>

<template>
	<div class="box">
		<img :src="generateUrl(props.data.UrlPath)" />
		<p class="name">{{ props.data.Name }}</p>
		<div class="box-btn" @click="handleCreate(props.data.ID, props.data.Name)">
			立即创建
		</div>
	</div>
</template>

<style lang="scss" scoped>
.box {
	width: 180px;
	height: 200px;
	background: #ffffff;
	border: 1px solid #e6e6e6;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 20px;
	img {
		width: 56px;
		height: 56px;
		border-radius: 50%;
	}
	.name {
		font-size: 15px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #2f3339;
		text-align: center;
	}
	.box-btn {
		width: 120px;
		height: 32px;
		background: #4996f3;
		text-align: center;
		line-height: 32px;
		cursor: pointer;
		border-radius: 4px;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ffffff;
	}
}
</style>
