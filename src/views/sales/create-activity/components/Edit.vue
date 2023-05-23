<!-- 新建活动-编辑 -->
<script setup>
import { onMounted, ref } from 'vue'
import WangEdit from '../../../../components/common/WangEdit.vue'
import SaleItem from './SaleItem.vue'
import Steps from './Steps.vue'
import UploadImg from './UploadImg.vue'
import { debounce } from '/@/utils/helper.js'
import ChooseShopDialog from '/@/components/common/ChooseShopDialog.vue'
import { beforeCreatePackage } from '../../../../api/sales'
import { useRouter } from 'vue-router'
const radio1 = ref('')

const router = useRouter()

const emits = defineEmits(['go-back'])

const props = defineProps({
	id: String,
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

// 表单数据
const data = ref({
	ID: '',
	Name: 'minno1',
	Code: '54T006231',
	UseDiscount: '1',
	Remark: '',
	StartTime: '2023/04/29',
	EndTime: '3000/01/01 23:59:59',
	BusinessJson: {
		Price: '100',
		CoinNum: '1',
		memberLevel: ['B'],
		AuthorizeSale: 0,
	},
	ApplyStoreList: [
		{
			PromotionDataID: '10001_001',
			StoreID: '93G257YH0002B00',
			StoreNo: '001',
			StoreName: '云管家001店',
			HandleState: 0,
			OrganizationID: null,
			TaskID: null,
			TaskStatus: null,
			SourceFlag: 0,
			ID: '4UJT9J2IU1EG0ZE1ZPM2S1G2Z3S37NRMWSVUS2',
			CreateTime: '/Date(1682751072387)/',
			ModifyTime: '/Date(1682751072387)/',
			ModifyOperatorID: null,
			DirtyFlag: 0,
			RowState: 4,
			Tag: null,
		},
	],
	ReportLabelList: ['3:4UJT7BOIY21S11NHYXQEH6BDR05RSFS8EY3ZX4'],
	PartnerID: '9E5DJ9KX0002200',
	ImageData: {
		MainPic:
			'/AemsCloudResource/93G24LFI0001700/2023/c6af7162-31c3-49e8-9862-95c27552c07b.png',
		EnclosurePics: [],
	},
	SubTitle: '',
	AttachInfoHtml: '',
	PromotionAddinID: 'de8820b3-962d-4c03-b6f5-ddb54b9482e4',
	Category: 0,
	PromotionChannel: [
		{
			ID: '6C85F90A-75DE-45E7-8F37-F34AEF74CCE3',
			ProductID: '',
		},
	],
	PromotionPositionInfo: [
		{
			PageName: '店长精选',
			PromotionDataID: '7e41b561-ea6f-40cf-bd0f-9b55e9489e71',
			PageNo: 'D1',
			PageID: '93HIV3BJ0001B00',
			RowIndex: '2',
			ColIndex: '2',
			BgColor: 'rgb(45, 100, 194)',
		},
	],
})
// 保存
const handleSave = () => {
	const param = {
		...data.value,
	}
}

// 关闭
const handleClose = () => {
	router.back()
}

const init = async () => {
	// data.value =
	await beforeCreatePackage({ AddinID: props.id })
	// data.value.AllowChannels.forEach((i) => {})
}

onMounted(() => {
	formBoxRef.value.addEventListener('scroll', handleStepChange)
	init()
})
</script>

<template>
	<div class="box">
		<div class="header">
			<div class="flex">
				<el-icon
					style="color: #4996f3; cursor: pointer"
					@click="emits('go-back')"
				>
					<ArrowLeftBold />
				</el-icon>
				<span class="header-name">创建 - 代币入会套餐</span>
				<Steps ref="stepRef"></Steps>
			</div>
			<div class="flex">
				<div class="btn btn-grey mr10" @click="handleClose">关闭</div>
				<div class="btn btn-blue mr10" @click="handleSave">保存</div>
				<div class="btn btn-blue">保存并新增</div>
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
						<div class="form-label">活动名称:</div>
						<div class="form-item-content">
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
						<div class="form-label">活动编号:</div>
						<div class="form-item-content">
							<el-input v-model="data.Code"></el-input>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">活动时间:</div>
						<div class="form-item-content">
							<el-date-picker
								v-model="data.StartTime"
								type="daterange"
								range-separator="~"
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
							<div class="btn btn-blue ml10">删除</div>
							<!-- 表格 -->
							<div class="table w-100 mt14">
								<el-table
									:data="data.ApplyStoreList"
									border
									empty-text="暂无数据"
								>
									<el-table-column type="selection"></el-table-column>
									<el-table-column label="编号" prop="qty"></el-table-column>
									<el-table-column
										label="名称"
										prop="goods_name"
									></el-table-column>
									<el-table-column label="操作">
										<template #default>
											<div class="btn-blue btn-table">删除</div>
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
						<div class="form-label">支付金额:</div>
						<div class="form-item-content">
							<el-input v-model="data.BusinessJson.Price" class="w200">
								<template #suffix>元</template>
							</el-input>
						</div>
					</div>
					<div class="form-item-inline">
						<div class="form-label">获得代币:</div>
						<div class="form-item-content">
							<el-input v-model="data.BusinessJson.CoinNum" class="w200">
								<template #suffix>枚</template>
							</el-input>
						</div>
					</div>
					<div class="form-item mt14">
						<div class="form-label">活动对象:</div>
						<div class="form-item-content">
							<el-radio-group v-model="radio1">
								<el-radio label="1" size="large">不限制</el-radio>
								<el-radio label="2" size="large">仅限会员</el-radio>
							</el-radio-group>
							<div class="form-item-box p16">
								<el-radio-group v-model="radio1">
									<el-radio label="1" size="large">全部会员</el-radio>
								</el-radio-group>
								<div class="br mt5 mb5"></div>
								<el-radio-group v-model="radio1" class="flex">
									<el-radio
										style="width: 23%"
										size="large"
										:label="3"
										v-for="i in 9"
									>
										Option A
									</el-radio>
								</el-radio-group>
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
					<template v-for="(data, index) in data.AllowChannels">
						<SaleItem v-model:data="data.AllowChannels[index]"></SaleItem>
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
						<div class="form-label">支付金额:</div>
						<div class="form-item-content">
							<el-input class="w200"></el-input>
						</div>
					</div>
					<div class="form-item-inline mr40">
						<div class="form-label">其他:</div>
						<div class="form-item-content">
							<el-input class="w500"></el-input>
						</div>
					</div>
				</div>
			</div>
			<!-- /其他 -->
		</div>

		<!-- 选择门店弹窗 -->
		<ChooseShopDialog
			v-model:isChooseDialogShow="isChooseShopDialogShow"
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
</style>
