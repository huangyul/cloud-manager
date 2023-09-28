<!-- 套餐销售列表 -->
<template>
	<div class="">
		<div class="top-action">
			<!-- TODO 判断用户是否有新建权限 -->
			<button class="flex btn btn-green flex-col-center" @click="openDialog()">
				<el-icon class="mr6">
					<Plus />
				</el-icon>
				创建活动
			</button>
		</div>

		<MySearch
			:searchList="searchList"
			:options="searchOptions"
			@search="getSearchCondition"
			@reset="handleSearchReset"
			@click-expend="resetHeight()"
			class="mt8"
		></MySearch>

		<div class="table p16">
			<!-- 明细表格 -->
			<el-table
				style="width: 100%"
				:data="tableData"
				border
				:height="tableHeight"
				@sort-change="sortChange"
				sum-text="合计"
				empty-text="暂无数据"
				ref="tableRef"
			>
				<el-table-column
					label="活动名称"
					min-width="140"
					sortable="custom"
					prop="Name"
				>
					<template #default="{ row }">
						<span
							class="text-blue-500 underline cursor-pointer"
							@click="openDialog(row)"
						>
							{{ row.Name }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					label="活动编号"
					min-width="140"
					sortable="custom"
					prop="Code"
				></el-table-column>
				<el-table-column
					label="方案类型"
					min-width="120"
					sortable="custom"
					prop="PromotionAddinID"
				>
					<template #default="{ row }">
						{{ templateMap[row.PromotionAddinID] }}
					</template>
				</el-table-column>
				<el-table-column
					label="价格"
					min-width="180"
					sortable="custom"
					prop="Price"
				>
					<template #default="{ row }">{{ row.Price }}元</template>
				</el-table-column>
				<el-table-column
					label="活动打折"
					min-width="120"
					sortable="custom"
					prop="UseDiscount"
				>
					<template #default="{ row }">
						{{ discountMap[row.UseDiscount] }}
					</template>
				</el-table-column>
				<el-table-column
					label="活动日期"
					min-width="200"
					sortable="custom"
					prop="StartTime"
				>
					<template #default="{ row }">
						{{ moment(row.StartTime).format('YYYY-MM-DD') }}~{{
							moment(row.EndTime).format('YYYY-MM-DD')
						}}
					</template>
				</el-table-column>
				<el-table-column
					label="状态"
					min-width="100"
					sortable="custom"
					prop="StatuDesc"
				>
					<template #default="{ row }">
						<span :class="[`status-${row.StatuDesc}`]">
							{{ statusMap[row.StatuDesc] }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" min-width="200">
					<template #default="{ row }">
						<div class="flex">
							<div class="table-btn" v-if="row.StatuDesc == 'A'">提交</div>
							<div
								class="table-btn"
								v-if="row.StatuDesc == 'A'"
								@click="handleDelete(row)"
							>
								删除
							</div>
							<div class="table-btn" v-if="row.StatuDesc != 'A'">变更</div>
							<div class="table-btn" v-if="row.StatuDesc == 'E'">上架</div>
							<div class="table-btn" v-if="row.StatuDesc == 'C'">下架</div>
							<div class="table-btn" v-if="row.StatuDesc != 'A'">跟踪</div>
						</div>
					</template>
				</el-table-column>
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
	</div>
</template>

<script setup>
import MySearch from '/@/components/common/MySearch.vue'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
	deletePackage,
	getSalePackageList,
	getSalePackageListOptions,
} from '../../../api/sales'
import moment from 'moment'
import { useElTable } from '../../../hooks/basic'
import { ElMessage } from 'element-plus'
import { resetTableHeight } from '/@/utils/element'
const router = useRouter()
const route = useRoute()

const searchList = ref({
	Name: {
		type: 'text',
		value: '',
		label: '活动名称',
	},
	Code: {
		type: 'text',
		value: '',
		label: '活动编号',
		placeholder: ' ',
	},
	Time: {
		type: 'daterange',
		value: [],
		label: '时间',
		placeholder: ' ',
		format: '$Tag$Time',
		tags: ['Start', 'End'],
	},
	PromotionDataStatus: {
		type: 'select',
		value: '',
		label: '状态',
		placeholder: ' ',
	},
	PromotionAddinID: {
		type: 'select',
		value: '',
		label: '方案类型',
		placeholder: '请选择或输入门店名称编号',
		filterable: true,
	},
	LabelList: {
		type: 'select-tag',
		width: 2,
		value: '',
		label: '标签',
		placeholder: ' ',
	},
})
let sort = ref({})
// 搜索条件
let searchCondition = ref({})
// 搜索条件中的下拉选项
let searchOptions = ref({
	PromotionDataStatus: [],
	PromotionAddinID: [],
})
// 获取搜索条件
const getSearchCondition = (value) => {
	searchCondition.value = value
	doSearch()
}
// 重置搜索
const handleSearchReset = (value) => {
	searchList.value = value
}

// 表格数据
let tableData = ref([])
let pageSize = ref(10)
let currentPage = ref(1)
let total = ref(0)
const tableRef = ref(null)
useElTable(tableRef)
let tableHeight = ref(0)
const resetHeight = () => {
	nextTick(() => {
		tableHeight.value = resetTableHeight(tableRef.value)
	})
}

// 表格排序
const sortChange = ({ order, prop }) => {
	if (order == 'ascending') {
		sort.value = {
			[prop]: 1,
		}
	} else if (order == 'descending') {
		sort.value = {
			[prop]: -1,
		}
	} else {
		sort.value = {}
	}
	if (prop == 'StartTime') {
		sort.value = {
			ModifyTime: sort.value[prop],
		}
	}
	doSearch()
}

// 创建活动
const openDialog = (item) => {
	let query = item
		? {
				id: item.ID,
				category: item.PromotionAddinID,
				categoryName: templateMap.value[item.PromotionAddinID],
		  }
		: null
	router.push({ name: 'CreateActivity', query })
}

const doSearch = async () => {
	const res = await getSalePackageList(
		{
			Category: 0, // 套餐是0
			...searchCondition.value,
		},
		currentPage.value,
		pageSize.value,
		sort.value,
	)
	tableData.value = res.List
	total.value = res.Total.TotalRows
}

const statusMap = ref({})
const templateMap = ref({})
const discountMap = ref({
	0: '是',
	1: '否',
})
const init = async () => {
	const res = await getSalePackageListOptions({
		Category: 0,
	})
	searchOptions.value.PromotionDataStatus = []
	searchOptions.value.PromotionAddinID = []
	res.PromotionAddins.forEach((i) => {
		templateMap.value[i.ID] = i.Name

		searchOptions.value.PromotionAddinID.push({
			value: i.ID,
			label: i.Name,
		})
	})
	Object.entries(res.StatusDesc).forEach(([key, value]) => {
		statusMap.value[key] = value

		searchOptions.value.PromotionDataStatus.push({
			value: key,
			label: value,
		})
	})
	nextTick(() => {
		resetHeight()
	})
}

/**
 * table操作
 */
const handleDelete = async (item) => {
	await deletePackage({
		ID: item.ID,
	})
	ElMessage.success('删除成功')
	doSearch()
}

watch(
	() => route.path,
	(val) => {
		doSearch()
	},
	{ immediate: true },
)

onMounted(() => {
	init()
})
</script>

<style lang="scss" scoped>
.status-A {
	color: #f59c00;
}

.status-C {
	color: #06b35d;
}

.status-E {
	color: #ff4d4d;
}
</style>
