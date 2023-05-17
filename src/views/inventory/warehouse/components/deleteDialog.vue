<template>
	<el-dialog
		v-model="props.deleteDialog"
		width="500px"
		class="dialog"
		:show-close="false"
		:close-on-click-modal="false"
	>
		<div class="my-container">
			<div class="delete-text">
				是否要删除
				<span class="delete-name">{{ props.data.fname }}</span>
				？
			</div>
			<div class="btn-list">
				<button class="btn btn-grey" @click="onCancel">取消</button>
				<button class="btn btn-blue" @click="onConfirm">确定</button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { deleteWarehouse } from '/@/api/warehouse'

const props = defineProps({
	deleteDialog: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object,
		default() {
			return {}
		},
	},
})

const emits = defineEmits(['update:deleteDialog', 'reflesh'])
const onCancel = () => {
	emits('update:deleteDialog', false)
}
const onConfirm = async () => {
	// await deleteWarehouse({ id: props.data.id })
	emits('update:deleteDialog', false)
	emits('reflesh')
}
</script>

<style lang="scss">
.dialog {
	.el-dialog__header {
		display: none !important;
	}
	.my-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.btn-list {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.btn:not(:last-child) {
				margin-right: 12px;
			}
		}
		.delete-text {
			font-size: 17px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #2f3339;
			line-height: 46px;
			.delete-name {
				color: #338cef;
				margin: 0 2px;
			}
		}
	}
}
</style>
