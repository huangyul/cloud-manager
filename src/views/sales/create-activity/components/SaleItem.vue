<template>
	<div class="flex-align-center flex-row-between mb14">
		<el-checkbox
			v-model="isChecked"
			class="w-40"
			:label="data.Name"
		></el-checkbox>
		<div
			class="flex items-center justify-start sale-item"
			v-if="isChecked && !data.IsRelatePage"
		>
			<div class="label">商品ID:</div>
			<el-input></el-input>
		</div>
		<div
			class="flex-align-center flex-row-left sale-item"
			v-if="isChecked && data.IsRelatePage"
		>
			<div class="label">销售页面:</div>
			<div class="mr-4 sale-item-page">
				<div>{{}}</div>
			</div>
			<div class="btn btn-blue" @click="chooseSale">选择</div>
		</div>

		<!-- 选择销售页面 -->
		<ChooseSaleDialog
			v-model:isShow="isChooseSaleDilaogShow"
			:channleId="data.ID"
			@confirm="saleConfirm"
		></ChooseSaleDialog>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChooseSaleDialog from '../../../../components/common/ChooseSalePositionDialog.vue'

const props = defineProps({
	data: {
		type: Object,
		defaunt() {
			return {}
		},
	},
})

const emits = defineEmits(['update:data', 'confirm'])

const isChecked = computed({
	get: () => {
		return props.data.isCheck
	},
	set: (value) => {
		emits('update:data', Object.assign(props.data, { isCheck: value }))
	},
})

/**
 * 选择销售页面
 */
let isChooseSaleDilaogShow = ref(false)
const chooseSale = () => {
	isChooseSaleDilaogShow.value = true
}
const saleConfirm = (val) => {
	emits('confirm', val)
}
</script>

<style lang="scss" scoped>
.sale-item {
	flex: 1;
	font-size: 14px;
	color: #2f3339;

	.sale-item-page {
		width: 512px;
		height: 32px;
		background: #ffffff;
		border: 1px solid #d8d8d8;
		border-radius: 4px;
	}

	::v-deep .el-input {
		max-width: 512px;
		margin-right: 8px;
	}

	.label {
		width: 100px;
		text-align: right;
		margin-right: 10px;
	}
}
</style>
