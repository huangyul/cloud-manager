<!-- 选择门店弹窗 -->
<template>
	<div class="items-choose-page">
		<el-dialog
			v-model="props.isChooseDialogShow"
			:destroy-on-close="true"
			:width="1000"
			:show-close="false"
			:before-close="close"
		>
			<!-- header区 -->
			<template #header>
				<div class="header">
					<div>选择门店</div>
					<div class="close" @click="close">
						<el-icon>
							<Close />
						</el-icon>
					</div>
				</div>
			</template>

			<!-- 条件区域 -->
			<div class="pr24 pl24 pt16">
				<el-row>
					<el-col :span="8">
						<el-form-item :label-width="120" label="门店名称">
							<el-input v-model="searchList.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label-width="120" label="门店编号">
							<el-input v-model="searchList.code"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label-width="120" label="门店组">
							<el-select v-model="searchList.type_id" clearable>
								<el-option label="123" value="123"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="flex-row-right mt2">
					<button class="btn-blue btn mr12" @click="doSearch()">查询</button>
					<button class="btn-grey btn" @click="onReset()">重置</button>
				</div>
			</div>

			<div class="table p16">
				<!-- 表格 -->
				<el-table
					:data="tableData"
					height="400"
					border
					@selection-change="onSelectChange"
					ref="tableRef"
					empty-text="暂无数据"
				>
					<el-table-column type="selection" width="50" />
					<el-table-column
						label="门店编号"
						min-width="160"
						prop="master_no"
					></el-table-column>
					<el-table-column
						label="门店名称"
						prop="ShortName"
						min-width="120"
					></el-table-column>
					<el-table-column
						min-width="120"
						label="门店组"
						prop="ShortName"
					></el-table-column>
				</el-table>

				<!-- 分页-->
				<div class="page">
					<el-pagination
						v-model:current-page="currentPage"
						v-model:page-size="pageSize"
						small="small"
						:page-sizes="[10, 20, 30, 40]"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
						@size-change="doSearch()"
						@current-change="doSearch()"
					/>
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
import { nextTick, onMounted, ref, watch } from 'vue'
import { getStoreList } from '/@/api/basic/index'
const props = defineProps({
	isChooseDialogShow: {
		type: Boolean,
		default: false,
	},
	defaultStore: {
		type: Array,
		default() {
			return []
		},
	},
})

const emits = defineEmits(['update:isChooseDialogShow', 'confirm'])

// 表格数据
let tableData = ref([])
let pageSize = ref(10)
let currentPage = ref(1)
let total = ref(0)
let selectData = ref([])
let beforeSearchData = ref([])
const tableRef = ref(null)

const doSearch = async () => {
	beforeSearchData.value = selectData.value
	console.log('beforeSearchData', beforeSearchData.value)
	const res = await getStoreList(
		{
			OrgType: 1, // TODO  1-只查询门店，2-所有组织
			Code: searchList.value.code,
			Name: searchList.value.name,
			OrgGroupID: searchList.value.supply_id,
		},
		currentPage.value,
		pageSize.value,
	)
	tableData.value = res.List
	total.value = res.TotalRows
	nextTick(() => {
		if (tableRef.value) {
			selectData.value = beforeSearchData.value
			console.log(selectData.value)
			selectData.value.forEach((row) => {
				const r = tableData.value.find((r) => r.ID == row.ID)
				tableRef.value.toggleRowSelection(r, true)
			})
		}
	})
}

const onSelectChange = (selection) => {
	console.log(selection)
	selectData.value = selection
}

const searchList = ref({
	name: '',
	code: '',
	type_id: '',
	supply_id: '',
})
const init = async () => {
	doSearch()
}

const onReset = () => {
	for (let key in searchList.value) {
		searchList.value[key] = ''
	}
}

// 关闭弹窗
const close = () => {
	emits('update:isChooseDialogShow', false)
}

// 点击确定按钮
const onConfirm = () => {
	emits('confirm', selectData.value)
	close()
}

watch(
	() => props.isChooseDialogShow,
	(value) => {
		if (value) {
			nextTick(() => {
				console.log(props.defaultStore)

				selectData.value = props.defaultStore
				props.defaultStore.forEach((row) => {
					console.log('init', row)
					tableRef.value.toggleRowSelection(row, true)
				})
			})
		}
	},
	{ immediate: true, deep: true },
)

onMounted(() => {
	init()
})
</script>

<style lang="scss" scoped>
.items-choose-page {
	::v-deep .el-dialog {
		border-radius: 4px;
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
			cursor: pointer;
		}
	}
}
</style>
