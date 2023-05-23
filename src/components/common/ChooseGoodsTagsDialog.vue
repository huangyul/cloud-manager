<!-- 选择商品便签弹窗 -->
<template>
	<div class="itmes-page">
		<el-dialog
			v-model="props.isShow"
			:destroy-on-close="true"
			:width="900"
			:show-close="false"
			:before-close="close"
		>
			<!-- header区 -->
			<template #header>
				<div class="header">
					<div>选择商品标签</div>
					<div class="close" @click="close">
						<el-icon><Close /></el-icon>
					</div>
				</div>
			</template>
			<div class="pt11 pb11 pr20 pl20 flex-row-between">
				<div class="left mr16">
					<div class="search">
						<span class="tips">请选择商品标签，可多选</span>
						<div class="input-box">
							<input
								class="input"
								type="text"
								placeholder="搜索"
								v-model="key"
							/>
							<el-icon><Search /></el-icon>
						</div>
					</div>
					<div class="content">
						<el-scrollbar height="408px" v-if="tagListShow.length > 0">
							<div
								class="item"
								v-for="(item, index) in tagListShow"
								:key="index"
							>
								<div class="item-left">{{ item.name }}</div>
								<div class="item-right">
									<div
										:class="[
											'right-item',
											{ 'right-item-active': tagMap.has(tag.value) },
										]"
										v-for="tag in item.tags"
										:key="tag"
										@click="handleSelectTag(tag, item)"
									>
										{{ tag.name }}
									</div>
								</div>
							</div>
						</el-scrollbar>
						<div v-else class="no-more">无数据</div>
					</div>
				</div>
				<div class="right">
					<div class="total">
						<div class="total-num">已选标签（{{ selectedTagNum }}）</div>
						<button @click="handleClearTags">清空</button>
					</div>
					<div class="content">
						<div v-for="i in selectedTags" class="mb16">
							<template v-if="i.tags.length > 0">
								<div class="title">{{ i.name }}</div>
								<div class="value-list">
									<div class="value" v-for="t in i.tags" :key="t.value">
										{{ t.name }}
										<el-icon @click="handleSelectTag(t, i)"><Close /></el-icon>
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
			<!-- footer区 -->
			<template #footer>
				<div class="footer">
					<button class="btn-grey btn mr12" @click="close">关闭</button>
					<button class="btn-blue btn" @click="onConfirm">保存</button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getTags } from '../../api/basic'
import { deepClone } from '../../utils/helper'
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	tagType: {
		type: String,
		default: 'FrmPromotionData0', // 营销方案: FrmPromotionData1    销售套餐: FrmPromotionData0
	},
})

const emits = defineEmits(['update:isShow', 'confirm'])

const tagList = ref([
	{
		name: '用途',
		value: 1,
		tags: [
			{ name: '礼品兑换', value: 1 },
			{ name: '彩票兑换', value: 2 },
			{ name: '礼物机', value: 3 },
		],
	},
	{
		name: '五一优惠活动',
		value: 2,
		tags: [
			{ name: '不用劳动', value: 4 },
			{ name: '要努力劳动', value: 5 },
		],
	},
	{
		name: '仓库',
		value: 3,
		tags: [
			{ name: '仓库1', value: 6 },
			{ name: '仓库1', value: 13 },
			{ name: '仓库1', value: 7 },
			{ name: '仓库1', value: 14 },
			{ name: '仓库1', value: 8 },
			{ name: '仓库1', value: 15 },
			{ name: '仓库1', value: 9 },
			{ name: '仓库1ssssssssssssss', value: 17 },
			{ name: '仓库1', value: 10 },
			{ name: '仓库1', value: 18 },
			{ name: '仓库1', value: 11 },
			{ name: '仓库1', value: 20 },
			{ name: '仓库1', value: 12 },
		],
	},
])
const tagListShow = ref([])
// 已选择的标签
const selectedTags = ref([])
const tagMap = ref(new Map())
const selectedTagNum = computed(() => {
	let num = 0
	selectedTags.value.forEach((t) => {
		num += t.tags.length
	})
	return num
})
const handleSelectTag = (tag, parent) => {
	const selectedTagsMap = new Map(selectedTags.value.map((t) => [t.value, t]))

	if (tagMap.value.has(tag.value)) {
		tagMap.value.delete(tag.value)

		const parentIndex = selectedTags.value.findIndex(
			(t) => t.value === parent.value,
		)
		if (parentIndex !== -1) {
			const parentTags = selectedTags.value[parentIndex].tags
			const tagIndex = parentTags.findIndex((t) => t.value === tag.value)
			if (tagIndex !== -1) {
				parentTags.splice(tagIndex, 1)
				if (parentTags.length === 0) {
					selectedTags.value.splice(parentIndex, 1)
				}
			}
		}
	} else {
		tagMap.value.set(tag.value, tag.name)

		if (selectedTagsMap.has(parent.value)) {
			selectedTagsMap.get(parent.value).tags.push({ ...tag })
		} else {
			selectedTags.value.push({
				name: parent.name,
				value: parent.value,
				tags: [{ ...tag }],
			})
		}
	}
}

// const handleSelectTag = (tag, parent) => {
// 	let m = new Map()
// 	selectedTags.value.forEach((t) => {
// 		m.set(t.value, t.name)
// 	})
// 	if (tagMap.value.has(tag.value)) {
// 		tagMap.value.delete(tag.value)
// 		for (let i = 0; i < selectedTags.value.length; i++) {
// 			if (selectedTags.value[i].value == parent.value) {
// 				selectedTags.value[i].tags.forEach((value, index, arr) => {
// 					if (value.value == tag.value) {
// 						arr.splice(index, 1)
// 					}
// 				})
// 				break
// 			}
// 		}
// 	} else {
// 		tagMap.value.set(tag.value, tag.name)
// 		if (m.has(parent.value)) {
// 			for (let i = 0; i < selectedTags.value.length; i++) {
// 				if (selectedTags.value[i].value == parent.value) {
// 					selectedTags.value[i].tags.push({ ...tag })
// 					break
// 				}
// 			}
// 		} else {
// 			selectedTags.value.push({
// 				name: parent.name,
// 				value: parent.value,
// 				tags: [tag],
// 			})
// 		}
// 	}
// }
const handleClearTags = () => {
	tagMap.value.clear()
	selectedTags.value = []
}
// 表格数据
let tableData = ref([{ id: 1 }])
let pageSize = ref(10)
let currentPage = ref(1)
let total = ref(0)

let key = ref('')
watch(key, (val) => {
	if (val) {
		tagListShow.value = []
		tagListShow.value = tagList.value.filter((item) =>
			item.tags.some((tag) => tag.name.includes(val)),
		)
	} else {
		tagListShow.value = tagList.value
	}
})

// 关闭弹窗
const close = () => {
	emits('update:isShow', false)
}

// 点击确定按钮
const onConfirm = () => {
	const res = selectedTags.value.filter((tag) => tag.tags.length > 0)
	emits('confirm', res)
	close()
}

const init = async () => {
	await getTags(props.tagType)
}

const fillTag = (arr) => {
	selectedTags.value = deepClone(arr)
	tagMap.value.clear()
	selectedTags.value.forEach((t) => {
		t.tags.forEach((tag) => {
			tagMap.value.set(tag.value, tag.anme)
		})
	})
}

watch(props.isShow, () => {
	console.log(123123)
})

defineExpose({
	fillTag,
})

onMounted(() => {
	tagListShow.value = tagList.value
	// TODO 处理获取后的数据
	init()
})
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
	border-radius: 4px;
	background: #f8fafc;
}
::v-deep .el-dialog__header {
	padding: 0;
	margin: 0;
}
::v-deep .el-dialog__body {
	padding: 0;
}
.header {
	border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
	height: 39px;
	background: #f1f2f3;
	box-shadow: 0px 1px 0px 0px #dddddd;
	font-size: 16px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #5e6166;
	padding: 0 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	.tag {
		font-size: 15px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #ffffff;
		padding: 6px 10px;
		border-radius: 3px;
	}
	.green {
		background: #0cba63;
	}
	.red {
		background: #ff4f4f;
	}
	.orange {
		background: #ff9604;
	}
	.close {
		color: #99a2a7;
		opacity: 0.75;
		cursor: pointer;
	}
}
.footer {
	display: flex;
	justify-content: flex-end;
}
.input-tags {
	width: 100%;
	height: 32px;
	background: #ffffff;
	border: 1px solid #d8d8d8;
	border-radius: 4px;
	padding: 4px;
	display: flex;
	align-content: center;
	justify-content: space-between;
	.tag-list {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.tag:not(:last-child) {
			margin-right: 4px;
		}
		.tag {
			background: #e1eefd;
			height: 24px;
			border-radius: 2px;
			display: flex;
			align-items: center;
			font-size: 12px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #318cf9;
			padding: 7px 8px 5px 8px;
		}
		.el-icon {
			cursor: pointer;
		}
	}
	.choose-btn {
		height: 24px;
		background: #4996f3;
		border-radius: 2px;
		color: #ffffff;
		line-height: 24px;
		border: none;
	}
}

.left {
	width: 604px;
	.search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.input-box {
			position: relative;
			.input {
				width: 208px;
				height: 32px;
				background: #ffffff;
				border: 1px solid #d8d8d8;
				border-radius: 4px;
				outline: none;
				font-size: 14px;
				padding: 0 9px;
				padding-right: 30px;
			}

			.el-icon {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.tips {
			font-size: 15px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #696c70;
		}
		input::input-placeholder {
			color: #97999c;
		}
	}
	.content {
		width: 604px;
		height: 440px;
		background: #ffffff;
		border: 1px solid #e6e6e6;
		padding: 16px;
		overflow: auto;
		.item {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: stretch;
			.item-left {
				width: 160px;
				background: #eef1f6;
				margin-right: 6px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 13px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #2f343a;
				margin-bottom: 6px;
			}
			.item-right {
				margin-bottom: 6px;
				width: 426px;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;
				background: #eef1f6;
				padding: 6px 14px 12px 14px;

				.right-item {
					padding: 7px;
					font-size: 13px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #696c70;
					margin-right: 6px;
					margin-top: 6px;
					cursor: pointer;
				}
				.right-item-active {
					padding: 7px;
					color: #ffffff;
					background: #4996f3;
					border-radius: 4px;
				}
			}
		}
		.no-more {
			text-align: center;
			margin-top: 30px;
			color: #97999c;
		}
	}
}
.right {
	width: 240px;
	.total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
		margin-bottom: 16px;
		.total-num {
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #696c70;
		}
		button {
			width: 50px;
			height: 28px;
			background: #ebeced;
			border: 1px solid #dddddd;
			border-radius: 4px;
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #5e6166;
			cursor: pointer;
		}
	}
	.content {
		width: 240px;
		height: 440px;
		background: #ffffff;
		border: 1px solid #e6e6e6;
		padding: 13px 12px;
		overflow-y: auto;
		.title {
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #434343;
		}
		.title:not(:first-child) {
			margin-top: 16px;
		}
		.value-list {
			margin-top: 12px;
			.value {
				width: 216px;
				background: #e1eefd;
				border-radius: 4px;
				padding: 8px 10px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				font-size: 12px;
				color: #318cf9;
				display: flex;
				justify-content: space-between;
				align-items: center;
				i {
					cursor: pointer;
				}
			}
			.value:not(:last-child) {
				margin-bottom: 5px;
			}
		}
	}
}
</style>
