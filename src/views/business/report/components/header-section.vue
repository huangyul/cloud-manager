<template>
	<div class="disPlay-card">
		<DataCard
			title="今日营业额"
			:all="data['营业额']"
			day="12000"
			chain="10%"
			icon="/images/business/card-icon-4.png"
			background="#ff7c9f"
			boxShadow="0px 3px 10px 0px rgba(255, 124, 159, 0.4)"
		/>
		<DataCard
			title="游戏机耗币数"
			:all="data['耗币']"
			day="18000"
			chain="15%"
			icon="/images/business/card-icon-1.png"
			background="#C391FF"
			boxShadow="0px 3px 10px 0px rgba(195,145,255,0.4000)"
			:isTooltip="true"
		>
			<template #tooltip>
				<div>日均：统计当前日期往前30天的平均值</div>
				<div>日环比：较上一日增长/减少幅度</div>
			</template>
		</DataCard>
		<DataCard
			title="礼品回收数"
			:all="data['回收礼品数']"
			day="52000"
			chain="5%"
			icon="/images/business/card-icon-2.png"
			background="#66CEA1"
			boxShadow="0px 3px 10px 0px rgba(102,206,161,0.4000)"
		/>
		<DataCard
			title="礼品回收值"
			:all="data['存积分']"
			day="105"
			chain="2%"
			icon="/images/business/card-icon-3.png"
			background="#E4CD4F"
			boxShadow="0px 3px 10px 0px rgba(228,205,79,0.4000)"
			:isTooltip="true"
		>
			<template #tooltip>
				<div>礼品回收值=回收存入的礼品积分数</div>
				<div>日均：统计当前日期往前30天的平均值</div>
				<div>日环比：较上一日增长/减少幅度</div>
			</template>
		</DataCard>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DataCard from '/@/components/data-card.vue'
// import { getReportHeaderData } from '/@/api/report/index.js'

const radio = ref(0)
const value = ref(new Date())

const data = ref({})

onMounted(async () => {
	// const res = await getReportHeaderData({
	//   mer_id: '10001',
	//   proc_name: 'qry_home_data',
	//   prms: {
	//     mer_id1: '10001',
	//     store_id1: '10001_001',
	//     begin_date: new Date().toLocaleDateString().replaceAll('/', '-'),
	//     end_date: new Date().toLocaleDateString().replaceAll('/', '-'),
	//   },
	// })
	// data.value = res[0]
})
</script>

<style lang="scss" scoped>
.filter-bar {
	display: flex;
	align-items: center;
	margin-bottom: 30px;

	.switch-btn {
		margin-right: 12px;

		.label {
			display: flex;
			align-items: center;

			.icon {
				margin-left: 4px;
				width: 16px;
				height: 16px;
			}
		}
	}

	.btns {
		margin-left: 16px;
	}

	.tips {
		margin-left: 30px;
		font-size: 18px;
		font-weight: bold;

		.error {
			color: #ff4d4d;
		}
	}
}

.disPlay-card {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;

	.card {
		width: 24%;
	}
}
</style>
