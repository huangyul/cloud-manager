<!-- 套餐销售列表 -->
<template>
	<div class="top-action">
		<!-- TODO 判断用户是否有新建权限 -->
		<button class="btn btn-green flex flex-col-center" @click="openDialog">
			<el-icon class="mr6"><Plus /></el-icon>
			创建活动
		</button>
	</div>

	<MySearch
		:searchList="searchList"
		:options="searchOptions"
		@search="getSearchCondition"
		@reset="handleSearchReset"
		class="mt8"
	></MySearch>

	<div class="table p-2">
		<!-- 明细表格 -->
		<el-table
			style="width: 100%"
			:data="tableData"
			border
			@sort-change="sortChange"
			sum-text="合计"
			empty-text="暂无数据"
		>
			<el-table-column
				label="活动名称"
				min-width="140"
				sortable="custom"
				prop="Name"
			></el-table-column>
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
			></el-table-column>
			<el-table-column
				label="价格"
				min-width="180"
				sortable="custom"
				prop="Price"
			></el-table-column>
			<el-table-column
				label="活动打折"
				min-width="120"
				sortable="custom"
				prop="UseDiscount"
			></el-table-column>
			<el-table-column
				label="活动日期"
				min-width="100"
				sortable="custom"
				prop="StartTime"
			></el-table-column>
			<el-table-column
				label="状态"
				min-width="100"
				sortable="custom"
				prop="StatuDesc"
			></el-table-column>
		</el-table>

		<!-- 分页-->
		<div class="page">
			<el-pagination
				v-model:currentPage="currentPage"
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
</template>

<script setup>
import MySearch from '/@/components/common/MySearch.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStoreList } from '../../../api/basic'
import {
	getSalePackageList,
	getSalePackageListOptions,
} from '../../../api/sales'

const router = useRouter()

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
// 表格排序
const sortChange = ({ order, prop }) => {
	if (order == 'ascending') {
		searchCondition.value.order = {
			[prop]: 1,
		}
	} else if (order == 'descending') {
		searchCondition.value.order = {
			[prop]: -1,
		}
	} else {
		searchCondition.value.order = {}
	}
	doSearch()
}

// 创建活动
const openDialog = () => {
	router.push({ name: 'createActivity' })
}

const doSearch = async () => {
	let order = searchCondition.value.order ?? {}
	await getSalePackageList({
		ParamDict: {
			Category: 0, // 套餐是0
			...searchCondition.value,
		},
		PageSetting: {
			page_num: 1,
			page_size: 10,
		},
		SortFields: {
			...order,
		},
	})
}

const init = async () => {
	const res = await getSalePackageListOptions({
		ParamDict: {
			Category: 1,
		},
	})
	searchOptions.value.PromotionDataStatus = []
	searchOptions.value.PromotionAddinID = []
	res.PromotionAddins.forEach((i) => {
		searchOptions.value.PromotionAddinID.push({
			value: i.ID,
			label: i.Name,
		})
	})
	Object.entries(res.StatusDesc).forEach(([key, value]) => {
		searchOptions.value.PromotionDataStatus.push({
			value: key,
			label: value,
		})
	})
	// TODO
	doSearch()
}

onMounted(() => {
	init()
})
</script>

<style lang="scss" scoped></style>
