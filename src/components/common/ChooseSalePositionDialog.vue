<!-- 选择销售页面弹窗--带位置修改 -->
<template>
	<div class="page">
		<el-dialog
			v-model="props.isShow"
			:destroy-on-close="true"
			:width="1100"
			:show-close="false"
			:before-close="close"
		>
			<!-- header区 -->
			<template #header>
				<div class="header">
					<div>选择销售页面</div>
					<div class="close" @click="close">
						<el-icon>
							<Close />
						</el-icon>
					</div>
				</div>
			</template>

			<div class="flex contain">
				<!-- 销售页面选择 -->
				<div class="sale-page">
					<div>
						<div class="title mb-2">销售页面</div>
						<div class="page-list">
							<div
								v-for="page in pageList"
								class="page-item"
								:class="{ 'page-active': currentPage.ID == page.ID }"
								@click="handleChange(page)"
							>
								{{ page.Name }}
							</div>
						</div>
					</div>
					<div class="title2">
						<p>未分配套餐</p>
						<div style="position: relative; width: 240px; height: 125px">
							<DragItem
								domId="drag"
								type="drag"
								:title="parentData.Name"
								:value="parentData.BusinessJson.Price"
							></DragItem>
						</div>
					</div>
				</div>
				<!-- 套餐位置 -->
				<div class="packages">
					<div class="title">{{ currentPage?.Name }}</div>
					<div class="box">
						<div
							class="flex flex-wrap"
							:style="{ width: `${currentPage?.Cols * 246}px` }"
						>
							<DragItem
								class="flex-shrink mr6 mb6"
								v-for="c in pageLocationList[currentPage?.ID]"
								type="empty"
								title="50代币充值"
								value="0.01"
							></DragItem>
						</div>
					</div>
				</div>
			</div>

			<!-- footer区 -->
			<template #footer>
				<div class="footer">
					<button class="btn-grey btn mr12" @click="close">关闭</button>
					<button class="btn-blue btn">保存</button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import { getSalePageDataByChannel } from '../../api/sales'
import DragItem from './DragItem.vue'
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	channleId: String,
})

const parentData = inject('data')

const emits = defineEmits(['update:isShow', 'confirm'])

// 关闭弹窗
const close = () => {
	console.log(123123)
	emits('update:isShow', false)
}

// 点击确定按钮
const onConfirm = () => {
	emits('confirm')
}

const list = ref([
	{ id: 1, name: 'Card 1' },
	{ id: 2, name: 'Card 2' },
	{ id: 3, name: 'Card 3' },
	{ id: 4, name: 'Card 4' },
	{ id: 5, name: 'Card 5' },
	{ id: 6, name: 'Card 6' },
	{ id: 7, name: 'Card 7' },
	{ id: 8, name: 'Card 8' },
	{ id: 9, name: 'Card 9' },
	{ id: 10, name: 'Card 10' },
])
const log = (event) => {
	console.log(event)
}

watch(
	() => props.isShow,
	(val) => {
		if (val) {
			init()
		}
	},
)

const pageList = ref([])
const pageLocationList = ref({})
let currentPage = ref({})
const init = async () => {
	const res = await getSalePageDataByChannel({
		Channel: props.channleId,
	})
	pageList.value = res.Pages
	currentPage.value = pageList.value[0]
	pageLocationList.value = res.PackageLocations
}
const handleChange = (page) => {
	currentPage.value = page
}
</script>

<style lang="scss" scoped>
.page {
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

	.contain {
		border-bottom: 1px solid #eeeeee;
		min-height: 600px;

		.sale-page {
			padding: 10px 15px;
			width: 280px;
			border-right: 1px solid #eeeeee;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 15px;
				font-weight: bold;
				color: #2f3339;
			}

			.page-list {
				.page-item {
					padding: 10px 15px 10px 34px;
					font-size: 15px;
					display: flex;
					align-items: center;
					border-radius: 6px;
					cursor: pointer;
					margin-bottom: 5px;
					word-break: break-all;
				}

				.page-active {
					background: #7eaefe;
					color: #fff;
				}
			}
		}

		.packages {
			padding: 10px 15px;
			overflow: auto;
			max-height: 600px;

			.title {
				font-size: 20px;
				margin-bottom: 20px;
			}

			.box {
				position: relative;
			}
		}
	}
}
</style>
