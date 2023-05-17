<!-- 方案列表页 -->
<script setup>
import { getProgrammeTemplateList } from '../../../../api/sales'
import { onMounted, ref } from 'vue'
import Item from './Item.vue'

const data = ref({})

const init = async () => {
	const res = await getProgrammeTemplateList({
		ParamDict: {
			Category: 1, //0-套餐，1-方案，3-加购套餐，9-资产转换
		},
	})
	// 使用 reduce() 方法对数组进行分组
	data.value = res.List.reduce((result, item) => {
		const groupName = item.GroupName
		const group = result.find((group) => group.name === groupName)
		if (!group) {
			result.push({ name: groupName, children: [item] })
		} else {
			group.children.push(item)
		}
		return result
	}, []).sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
}

onMounted(() => {
	init()
})
</script>

<template>
	<div class="page">
		<div class="title">选择一个方案创建</div>
		<div class="type" v-for="(item, index) in data">
			<div class="type-name">{{ item.name }}</div>
			<div class="list">
				<Item :data="i" class="item" v-for="i in item.children"></Item>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	padding: 24px 30px;
	.title {
		font-size: 16px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #2f3339;
	}
	.type {
		margin-top: 30px;
		.type-name {
			font-size: 15px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #63666b;
			display: flex;
			margin-bottom: 13px;
			text-align: center;
			&::before {
				content: '';
				margin-right: 7px;
				display: block;
				width: 4px;
				height: 15px;
				background: #f9c02e;
			}
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			.item {
				margin: 16px 16px 0 0;
			}
		}
	}
}
</style>
