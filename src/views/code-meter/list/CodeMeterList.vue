<!-- 套餐销售列表 -->
<template>
	<div class="">
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
				:summary-method="getSummaries"
				show-summary
			>
				<el-table-column
					label="抄表日期"
					min-width="120"
					sortable="custom"
					prop="business_date"
				>
					<template #default="{ row }">
						{{ moment(row.business_date).format('YYYY-MM-DD') }}
					</template>
				</el-table-column>
				<el-table-column
					label="机位编号"
					min-width="120"
					sortable="custom"
					prop="code"
				/>
				<el-table-column
					label="游戏机名称"
					min-width="120"
					sortable="custom"
					prop="device_name"
				/>
				<el-table-column
					label="游戏机编号"
					min-width="120"
					sortable="custom"
					prop="device_code"
				/>
				<el-table-column
					label="投币码表读数"
					min-width="160"
					sortable="custom"
					prop="coin_in_counting_amount"
				/>
				<el-table-column
					label="投币计数"
					min-width="160"
					sortable="custom"
					prop="coin_in_counting_amount_diff"
				>
					<template #header>
						投币计数
						<el-tooltip
							effect="dark"
							content="投币计数说明：上次抄表至本次抄表期间投币总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="礼品码表A读数"
					min-width="170"
					sortable="custom"
					prop="礼品码表A"
				/>
				<el-table-column
					label="礼品码表A计数"
					min-width="180"
					sortable="custom"
					prop="礼品码表A_上次"
				>
					<template #header>
						礼品码表A计数
						<el-tooltip
							effect="dark"
							content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="礼品码表B读数"
					min-width="170"
					sortable="custom"
					prop="礼品码表B"
				/>
				<el-table-column
					label="礼品码表B计数"
					min-width="180"
					sortable="custom"
					prop="礼品码表B_上次"
				>
					<template #header>
						礼品码表B计数
						<el-tooltip
							effect="dark"
							content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="礼品码表C读数"
					min-width="170"
					sortable="custom"
					prop="礼品码表C"
				/>
				<el-table-column
					label="礼品码表C计数"
					min-width="180"
					sortable="custom"
					prop="礼品码表C_上次"
				>
					<template #header>
						礼品码表C计数
						<el-tooltip
							effect="dark"
							content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="礼品码表D读数"
					min-width="170"
					sortable="custom"
					prop="礼品码表D"
				/>
				<el-table-column
					label="礼品码表D计数"
					min-width="180"
					sortable="custom"
					prop="礼品码表D_上次"
				>
					<template #header>
						礼品码表D计数
						<el-tooltip
							effect="dark"
							content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="礼品码表E读数"
					min-width="170"
					sortable="custom"
					prop="礼品码表E"
				/>
				<el-table-column
					label="礼品码表E计数"
					min-width="180"
					sortable="custom"
					prop="礼品码表E_上次"
				>
					<template #header>
						礼品码表E计数
						<el-tooltip
							effect="dark"
							content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
							placement="top-start"
						>
							<img
								src="/images/common/question_tips.png"
								class="inline-block"
							/>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column
					label="抄表人"
					min-width="120"
					sortable="custom"
					prop="operator"
				/>
				<el-table-column
					label="门店"
					min-width="120"
					sortable="custom"
					prop="UseDiscount"
				/>
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
import { useElTable } from '../../../hooks/basic'
import { ElMessage } from 'element-plus'
import { resetTableHeight } from '/@/utils/element'
import { getCodeMeterList } from '/@/api/code-meter'
import moment from 'moment'
import { getStoreList } from '/@/api/basic'
const router = useRouter()
const route = useRoute()

const searchList = ref({
	data: {
		type: 'daterange',
		value: [],
		label: '抄表日期',
		placeholder: ' ',
		format: '$Tag$Time',
		tags: ['begin', 'end'],
	},
	machine_slot_code: {
		type: 'text',
		value: '',
		label: '机位编号',
	},
	game_machine_name: {
		type: 'text',
		value: '',
		label: '游戏机名称',
		placeholder: ' ',
	},
	game_machine_code: {
		type: 'text',
		value: '',
		label: '游戏机编号',
		placeholder: ' ',
	},

	operator_id: {
		type: 'select',
		value: '',
		label: '操作员',
		placeholder: ' ',
	},
	store_id: {
		type: 'select',
		value: '',
		label: '门店',
		placeholder: '请选择或输入门店名称编号',
		filterable: true,
	},
})
let sort = ref('')
// 搜索条件
let searchCondition = ref({})
// 搜索条件中的下拉选项
let searchOptions = ref({
	PromotionDataStatus: [],
	PromotionAddinID: [],
	store_id: [],
})
// 获取搜索条件
const getSearchCondition = (value) => {
	searchCondition.value = value
	searchCondition.value.end_date = searchCondition.value.EndTime
	searchCondition.value.begin_date = searchCondition.value.StartTime
	Reflect.deleteProperty(searchCondition.value, 'EndTime')
	Reflect.deleteProperty(searchCondition.value, 'StartTime')
	if (!searchCondition.value.end_date)
		Reflect.deleteProperty(searchCondition.value, 'end_date')
	if (!searchCondition.value.begin_date)
		Reflect.deleteProperty(searchCondition.value, 'begin_date')
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
const summary = ref({})
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
		sort.value = prop
	} else if (order == 'descending') {
		sort.value = `-${prop}`
	} else {
		sort.value = ''
	}
	// if (prop == 'StartTime') {
	//   sort.value = {
	//     ModifyTime: sort.value[prop],
	//   }
	// }
	doSearch()
}

const getSummaries = (param) => {
	const { columns, data } = param
	const sums = []
	columns.forEach((column, index) => {
		if (index === 0) {
			sums[index] = '合计'
			return
		} else {
			if (Reflect.has(summary.value, column.property)) {
				sums[index] = summary.value[column.property]
			}
		}
	})
	return sums
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
	const res = await getCodeMeterList({
		condition: searchCondition.value,
		page_size: pageSize.value,
		page_index: currentPage.value,
		sort: sort.value,
	})
	tableData.value = res.data.result.datas
	total.value = res.data.result.total
	summary.value = res.data.result.summary
}

const statusMap = ref({})
const templateMap = ref({})
const discountMap = ref({
	0: '是',
	1: '否',
})
const init = async () => {
	const res = await getStoreList(
		{
			OrgType: 1, // TODO  1-只查询门店，2-所有组织
			Code: '',
			Name: '',
			OrgGroupID: '',
		},
		1,
		99999,
	)
	res.List.forEach((i) => {
		searchOptions.value.store_id.push({
			label: i.Name,
			value: i.Code,
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
	ElMessage.success('删除成功')
	doSearch()
}

watch(
	() => route.path,
	(val) => {
		// doSearch()
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
