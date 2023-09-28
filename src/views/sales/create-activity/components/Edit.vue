<!-- 新建活动-编辑 -->
<script setup>
import { onMounted, provide, ref, watch } from 'vue'
import WangEdit from '../../../../components/common/WangEdit.vue'
import SaleItem from './SaleItem.vue'
import Steps from './Steps.vue'
import UploadImg from './UploadImg.vue'
import { debounce, deepClone } from '/@/utils/helper.js'
import ChooseShopDialog from '/@/components/common/ChooseShopDialog.vue'
import {
	beforeCreatePackage,
	savePackage,
	getPackageDetail,
} from '../../../../api/sales'
import { useRoute, useRouter } from 'vue-router'
import { useMultipleTabStore } from '/@/store/modules/multipleTab'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['go-back'])

const props = defineProps({
	id: String,
	name: String,
})

// 内容展开
const isExpand = ref({
	baseInfo: true,
	activityDetail: true,
	salesChannel: true,
	other: true,
})
const handleExpand = (type) => {
	isExpand.value[type] = !isExpand.value[type]
}

// 描点滚动
const formBoxRef = ref(null)
const baseInfoRef = ref(null)
const activityDetailRef = ref(null)
const salesChannelRef = ref(null)
const otherRef = ref(null)
const stepRef = ref(null)
const handleStepChange = debounce(() => {
	const top = formBoxRef.value.scrollTop
	const sections = [
		{ id: 'baseInfo', ref: baseInfoRef.value },
		{ id: 'activityDetail', ref: activityDetailRef.value },
		{ id: 'salesChannel', ref: salesChannelRef.value },
		{ id: 'other', ref: otherRef.value },
	]
	sections.forEach((section) => {
		if (
			section.ref.offsetTop - top >= 70 &&
			section.ref.offsetTop - top <= 180
		) {
			stepRef.value.changeCur(section.id)
		}
	})
}, 100)

/**
 * 选择门店
 */
let isChooseShopDialogShow = ref(false)
const selectStore = ref([])
const onSelectChange = (val) => {
	selectStore.value = val
}
const handleSaveStore = (val) => {
	const res = []
	val.forEach((i) => {
		res.push({
			StoreID: i.ID,
			StoreNo: i.master_no,
			StoreName: i.Name,
		})
	})
	data.value.ApplyStoreList = [...new Set(res)]
}
const handleDeleteStore = (item) => {
	let deleteId = []
	if (item) {
		deleteId.push(item.StoreID)
	} else {
		selectStore.value.forEach((i) => {
			deleteId.push(i.StoreID)
		})
	}
	deleteId.forEach((id) => {
		data.value.ApplyStoreList.splice(
			data.value.ApplyStoreList.findIndex((i) => i.StoreID == id),
		)
	})
}

// 表单数据
const data = ref({
	ID: '',
	Name: '',
	Code: '',
	UseDiscount: false,
	Remark: '',
	StartTime: '',
	EndTime: '',
	BusinessJson: {
		Price: '',
		CoinNum: '',
		SetNo: '',
		memberLevel: [],
		AuthorizeSale: false,
	},
	ApplyStoreList: [],
	ReportLabelList: [],
	PartnerID: '',
	ImageData: {
		MainPic: '',
		EnclosurePics: [],
	},
	SubTitle: '',
	AttachInfoHtml: '<p>123</p>',
	PromotionAddinID: props.id,
	Category: 0,
	PromotionChannel: [],
	PromotionPositionInfo: [],
})
// 保存
const handleSave = async () => {
	const param = deepClone(data.value)
	param.EndTime = param.StartTime[1]
	param.StartTime = param.StartTime[0]
	param.BusinessJson.AuthorizeSale = param.BusinessJson.AuthorizeSale ? 1 : 0
	param.UseDiscount = param.UseDiscount ? 0 : 1
	param.BusinessJson.memberLevel = selectMemberList.value
	console.log(param)
	await savePackage(param)
	ElMessage.success('保存成功')
	handleClose('SalesPackages')
}

const route = useRoute()
const router = useRouter()
const tabStore = useMultipleTabStore()

// 关闭
const handleClose = (routeName) => {
	tabStore.tabList = tabStore.tabList.filter((t) => t.path != route.path)
	const len = tabStore.tabList.length
	if (len == 0) {
		router.replace('/')
	} else {
		if (routeName) {
			router.push({ name: routeName })
		} else {
			router.replace(tabStore.tabList[len - 1].path)
		}
	}
}

/**
 * 选择会员
 */
const selectMemberList = ref([])
const selectMemberAll = ref(false)
const isIndeterminate = ref(false)
const isSelectMember = ref('2')
const handleCheckAllChange = (val) => {
	selectMemberList.value = val
		? initData.value.LeagSorts.map((i) => i.SortNo)
		: []
	isIndeterminate.value = false
}
const handleCheckChange = (value) => {
	const checkedCount = value.length
	selectMemberAll.value = checkedCount === initData.value.LeagSorts.length
	isIndeterminate.value =
		checkedCount > 0 && checkedCount < initData.value.LeagSorts.length
}
watch(isSelectMember, (val) => {
	console.log(val)
	if (val == 1) {
		selectMemberAll.value = false
		selectMemberList.value = []
		isIndeterminate.value = false
	}
})

/**
 * 销售渠道标签
 */
const handleSaleConfirm = (val, id) => {
	const isExist = data.value.PromotionChannel.findIndex((i) => i.ID == id)
	if (isExist == -1) {
		data.value.PromotionChannel.push({
			ID: id,
			ProductID: '',
		})
	}
	data.value.PromotionPositionInfo.push({
		PageName: val.pName,
		PromotionDataID: '',
		PageNo: val.no,
		PageID: val.id,
		RowIndex: val.row,
		ColIndex: val.col,
		BgColor: 'rgb(45, 100, 194)',
	})
}
const handleSaleDelete = (id) => {
	data.value.PromotionPositionInfo = data.value.PromotionPositionInfo.filter(
		(i) => i.PageID != id,
	)
}

const initData = ref({
	AllowChannels: [],
	LeagSorts: [],
	Partners: [],
})
const init = async () => {
	const res = await beforeCreatePackage({ AddinID: props.id })
	initData.value.AllowChannels = res.AllowChannels
	initData.value.AllowChannels.forEach((i) => (i.isChecked = false))
	initData.value.LeagSorts = res.LeagSorts
	res.Partners.forEach((i) => {
		initData.value.Partners.push({
			label: i.Name,
			value: i.ID,
		})
	})
	if (route.query.id) {
		const res = await getPackageDetail({ ID: route.query.id })
		data.value = { ...res }
		data.value.StartTime = [data.value.StartTime, data.value.EndTime]
		data.value.BusinessJson.AuthorizeSale =
			data.value.BusinessJson.AuthorizeSale == 1 ? true : false
		data.value.UseDiscount = data.value.UseDiscount == 0 ? true : false
		selectMemberList.value = data.value.BusinessJson.memberLevel
	}
}

onMounted(() => {
	formBoxRef.value.addEventListener('scroll', handleStepChange)
	init()
})

provide('data', data)
</script>

<template>
	<div class="box">
		<div class="header">
			<div class="flex">
				<el-icon
					v-if="!data.ID"
					style="color: #4996f3; cursor: pointer"
					@click="emits('go-back')"
				>
					<ArrowLeftBold />
				</el-icon>
				<span class="header-name">
					{{ route.query.id ? '编辑' : '创建' }} - {{ props.name }}
				</span>
				<Steps ref="stepRef"></Steps>
			</div>
			<div class="flex">
				<div class="btn btn-grey mr10" @click="handleClose()">关闭</div>
				<div class="btn btn-blue mr10" @click="handleSave">保存</div>
				<!-- <div class="btn btn-blue">保存并新增</div> -->
			</div>
		</div>

		<!-- 表单 -->
		<div class="form-box" ref="formBoxRef">
			<!-- 基本信息 -->
			<div class="form" id="baseInfo" ref="baseInfoRef">
				<div class="form-title" @click.stop="handleExpand('baseInfo')">
					基本信息
					<el-icon>
						<ArrowDownBold v-show="!isExpand.baseInfo" />
						<ArrowUpBold v-show="isExpand.baseInfo" />
					</el-icon>
				</div>
				<div class="pt20 pr60 pl20" v-show="isExpand.baseInfo">
					<div class="form-item">
						<div class="form-label label-required">活动名称:</div>
						<div class="flex items-center form-item-content">
							<el-input v-model="data.Name"></el-input>
							<el-checkbox
								class="ml30"
								v-model="data.BusinessJson.AuthorizeSale"
								label="授权销售"
							/>
							<el-checkbox
								class="ml30"
								v-model="data.UseDiscount"
								label="参与活动折扣"
							/>
							<!-- <el-tooltip
								class="box-item"
								effect="dark"
								content="Left Center prompts info"
								placement="top"
							>
								<el-icon><QuestionFilled /></el-icon>
							</el-tooltip> -->
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label label-required">活动编号:</div>
						<div class="form-item-content">
							<el-input v-model="data.Code"></el-input>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label label-required">活动时间:</div>
						<div class="form-item-content">
							<el-date-picker
								v-model="data.StartTime"
								type="daterange"
								range-separator="~"
								value-format="YYYY-MM-DD"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
							/>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">活动简介:</div>
						<div class="form-item-content">
							<el-input
								v-model="data.SubTitle"
								type="textarea"
								:rows="3"
								resize="none"
							></el-input>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">适用门店:</div>
						<div class="form-item-content">
							<div class="btn btn-blue" @click="isChooseShopDialogShow = true">
								选择门店
							</div>
							<div class="btn btn-blue ml10" @click="handleDeleteStore()">
								删除
							</div>
							<!-- 表格 -->
							<div class="table w-100 mt14">
								<el-table
									:data="data.ApplyStoreList"
									border
									empty-text="暂无数据"
									@selection-change="onSelectChange"
								>
									<el-table-column type="selection"></el-table-column>
									<el-table-column
										label="编号"
										prop="StoreNo"
									></el-table-column>
									<el-table-column
										label="名称"
										prop="StoreName"
									></el-table-column>
									<el-table-column label="操作">
										<template #default="{ row }">
											<div
												class="btn-blue btn-table"
												@click="handleDeleteStore(row)"
											>
												删除
											</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /基本信息 -->
			<!-- 活动详情 -->
			<div class="form" id="activityDetail" ref="activityDetailRef">
				<div class="form-title" @click="handleExpand('activityDetail')">
					活动详情
					<el-icon>
						<ArrowDownBold v-show="!isExpand.activityDetail" />
						<ArrowUpBold v-show="isExpand.activityDetail" />
					</el-icon>
				</div>
				<div class="pt20 pr60 pl20" v-show="isExpand.activityDetail">
					<div class="form-item-inline mr40">
						<div class="form-label label-required">支付金额:</div>
						<div class="form-item-content">
							<el-input
								@input="
									(v) => (data.BusinessJson.Price = v.replace(/[^\d.]/g, ''))
								"
								v-model="data.BusinessJson.Price"
								class="w200"
							>
								<template #suffix>元</template>
							</el-input>
						</div>
					</div>
					<div class="form-item-inline">
						<div class="form-label label-required">获得代币:</div>
						<div class="form-item-content">
							<el-input
								@input="
									(v) => (data.BusinessJson.CoinNum = v.replace(/[^\d.]/g, ''))
								"
								v-model="data.BusinessJson.CoinNum"
								class="w200"
							>
								<template #suffix>枚</template>
							</el-input>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">活动对象:</div>
						<div class="form-item-content">
							<el-radio-group v-model="isSelectMember">
								<el-radio label="1" size="large">不限制</el-radio>
								<el-radio label="2" size="large">仅限会员</el-radio>
							</el-radio-group>
							<div class="form-item-box p16" v-show="isSelectMember == 2">
								<el-checkbox
									v-model="selectMemberAll"
									:indeterminate="isIndeterminate"
									@change="handleCheckAllChange"
								>
									全部会员
								</el-checkbox>
								<div class="br mt5 mb5"></div>
								<el-checkbox-group
									size="large"
									@change="handleCheckChange"
									v-model="selectMemberList"
								>
									<el-checkbox
										:label="user.SortNo"
										v-for="user in initData.LeagSorts"
									>
										{{ user.SortName }}
									</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">图片:</div>
						<div class="form-item-content">
							<div class="form-item-box p20">
								<UploadImg></UploadImg>
							</div>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">活动介绍:</div>
						<div class="form-item-content">
							<WangEdit v-model:data="data.AttachInfoHtml"></WangEdit>
						</div>
					</div>
				</div>
			</div>
			<!-- /活动详情 -->
			<!-- 销售渠道 -->
			<div class="form" id="salesChannel" ref="salesChannelRef">
				<div class="form-title" @click="handleExpand('salesChannel')">
					销售渠道
					<el-icon>
						<ArrowDownBold v-show="!isExpand.salesChannel" />
						<ArrowUpBold v-show="isExpand.salesChannel" />
					</el-icon>
				</div>
				<div class="pl110 pt20 pb20 pr106" v-show="isExpand.salesChannel">
					<template v-for="(data, index) in initData.AllowChannels">
						<SaleItem
							v-model:data="initData.AllowChannels[index]"
							@confirm="handleSaleConfirm"
							@delete="handleSaleDelete"
						></SaleItem>
					</template>
				</div>
			</div>
			<!-- /销售渠道 -->
			<!-- 其他 -->
			<div class="form" id="other" ref="otherRef">
				<div class="form-title" @click="handleExpand('other')">
					其他
					<el-icon>
						<ArrowDownBold v-show="!isExpand.other" />
						<ArrowUpBold v-show="isExpand.other" />
					</el-icon>
				</div>
				<div class="pt20 pr60 pl20" v-show="isExpand.other">
					<div class="form-item-inline mr40">
						<div class="form-label">合作商:</div>
						<div class="form-item-content">
							<el-select v-model="data.PartnerID" class="!w-48 partner">
								<el-option
									v-for="item in initData.Partners"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</div>
					</div>
					<div class="form-item-inline mr40">
						<div class="form-label">备注:</div>
						<div class="form-item-content">
							<el-input v-model="data.Remark" class="w500"></el-input>
						</div>
					</div>
				</div>
			</div>
			<!-- /其他 -->
		</div>

		<!-- 选择门店弹窗 -->
		<ChooseShopDialog
			v-model:isChooseDialogShow="isChooseShopDialogShow"
			:defaultStore="data.ApplyStoreList"
			@confirm="handleSaveStore"
		></ChooseShopDialog>
	</div>
</template>

<style lang="scss" scoped>
* {
	user-select: none;
}

.box {
	.header {
		padding: 13px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;

		.header-name {
			margin-left: 25px;
			margin-right: 45px;
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #2f3339;
		}
	}

	.form-box {
		padding: 20px;
		height: calc(100vh - 100px);
		overflow-y: auto;

		.form {
			&:not(:first-child) {
				margin-top: 20px;
			}

			.form-title {
				cursor: pointer;
				height: 36px;
				background: rgba($color: #4996f3, $alpha: 0.2);
				padding: 12px 16px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #2f3339;
			}

			.form-item {
				display: flex;
				align-items: flex-start;

				.form-label {
					text-align: right;
					min-width: 80px;
					width: 80px;
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #2f3339;
					line-height: 32px;
					margin-right: 10px;
				}

				.form-item-content {
					flex: 1;

					::v-deep .el-input,
					::v-deep .el-date-editor {
						width: 400px;
						height: 32px;
					}

					::v-deep .el-textarea {
						width: 600px;
					}
				}

				.form-item-box {
					background: #ffffff;
					border: 1px solid #d8d8d8;
				}
			}

			.form-item-inline {
				@extend .form-item;
				display: inline-flex;
			}
		}
	}
}

::v-deep .el-checkbox.el-checkbox--large .el-checkbox__inner,
::v-deep .el-checkbox__inner {
	width: 20px;
	height: 20px;
}

::v-deep .el-checkbox__inner::after {
	box-sizing: content-box;
	content: '';
	border: 2px solid var(--el-checkbox-checked-icon-color);
	border-left: 0;
	border-top: 0;
	height: 11px;
	left: 6px;
	position: absolute;
	top: 1px;
	transform: rotate(45deg) scaleY(0);
	width: 5px;
	transition: transform 0.15s ease-in 0.05s;
	transform-origin: center;
}

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
	content: '';
	position: absolute;
	display: block;
	background-color: var(--el-checkbox-checked-icon-color);
	height: 4px;
	transform: scale(0.6);
	left: 0;
	right: 0;
	top: 7px;
}

.partner ::v-deep .el-input {
	width: 100% !important;
}
</style>
