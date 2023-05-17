<template>
	<div class="title">排行榜</div>
	<div class="my-container">
		<div class="tabs">
			<div :class="['item', { on: current == 1 }]" @click="current = 1">
				礼品回收
			</div>
			<div :class="['item', { on: current == 2 }]" @click="current = 2">
				礼品兑换
			</div>
			<!-- <div class="item other">礼品机返还率</div> -->
		</div>
		<div class="list-wrap">
			<List :data="data" />
		</div>
	</div>
</template>

<script setup>
import List from './list.vue'
import { onMounted, ref, watch } from 'vue'
// import { getExchangeData, getRecoveryData } from '/@/api/member'
let current = ref(1) // 1回收 2兑换
let data = ref([])
const getData = async () => {
	// data.value = []
	// let res = null
	// if (current.value == 1) {
	//   res = await getRecoveryData({
	//     mer_id: '10001',
	//     store_id: '10001_001',
	//     start_date: '',
	//     end_date: '',
	//     leager_info: '',
	//     order_field: 'recovery_doll',
	//     order_type: 'desc',
	//     page_size: 10,
	//     page_index: 1,
	//     total: -1,
	//   })
	//   res.leagers.forEach((i) => {
	//     if (i.recovery_doll > 0) {
	//       data.value.push({
	//         label: `${i.full_name}(${i.leag_no})`,
	//         value: i.recovery_doll,
	//       })
	//     }
	//   })
	// } else if (current.value == 2) {
	//   res = await getExchangeData({
	//     mer_id: '10001',
	//     store_id: '10001_001',
	//     start_date: '',
	//     end_date: '',
	//     leager_info: '',
	//     order_field: 'doll_score',
	//     order_type: 'desc',
	//     page_size: 10,
	//     page_index: 1,
	//     total: -1,
	//   })
	//   res.leagers.forEach((i) => {
	//     if (i.doll_score > 0) {
	//       data.value.push({
	//         label: `${i.full_name}(${i.leag_no})`,
	//         value: i.doll_score,
	//       })
	//     }
	//   })
	// }
}
onMounted(async () => {
	getData()
})
watch(current, (newValue, oldValue) => {
	if (newValue != oldValue) {
		getData()
	}
})
</script>

<style lang="scss" scoped>
.title {
	margin-bottom: 14px;
	position: relative;
	font-size: 16px;
	font-weight: bold;
	color: #2f3339;
	z-index: 2;
	&::after {
		content: '';
		display: block;
		width: 52px;
		height: 6px;
		background: #f9c02e;
		border-radius: 3px;
		position: absolute;
		bottom: -3px;
		left: -2px;
		z-index: 3;
	}
}
.my-container {
	min-height: 412px;
	background: #ffffff;
	border: 1px solid #dddddd;
	border-radius: 2px;
}
.tabs {
	display: flex;
	height: 34px;
	background: #ebeced;
	.item {
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #5e6166;
		font-weight: bold;
		cursor: pointer;
	}
	.other {
		width: 124px;
	}
	.on {
		background: #ffffff;
		color: #2f3339;
	}
}
.list-wrap {
	padding: 20px;
}
</style>
