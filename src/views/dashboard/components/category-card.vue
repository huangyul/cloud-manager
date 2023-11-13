<template>
	<div class="section">
		<div class="top-bar">
			<div class="title">客单价</div>
			<div class="tags">
				<div class="item" :class="{ on: type === 0 }" @click="changeType(0)">
					今日
				</div>
				<div class="item" :class="{ on: type === 1 }" @click="changeType(1)">
					近3天
				</div>
				<div class="item" :class="{ on: type === 2 }" @click="changeType(2)">
					近7天
				</div>
				<div class="item" :class="{ on: type === 3 }" @click="changeType(3)">
					近30天
				</div>
			</div>
		</div>
		<div class="chart-dom" ref="chartDomRef"></div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import moment from 'moment'
import { getHomeDataApi } from '/@/api/home/index.js'

const chartDomRef = ref()
const myChart = ref()
const type = ref(3)
let today = moment().format('YYYY-M-D')
let week3 = moment().subtract(3, 'days').format('YYYY-M-D')
let week7 = moment().subtract(7, 'days').format('YYYY-M-D')

let month30 = moment().subtract(30, 'days').format('YYYY-M-D')
const currentDate = ref([month30, today])

const changeType = (value) => {
	if (type.value === value) return
	type.value = value

	switch (value) {
		case 0:
			getData(today, today)
			currentDate.value = [today, today]
			break
		case 1:
			getData(week3, today)
			currentDate.value = [week3, today]
			break
		case 2:
			getData(week7, today)
			currentDate.value = [week7, today]
			break
		case 3:
			getData(month30, today)
			currentDate.value = [month30, today]
			break
		default:
			getData()
			break
	}
}

const getData = (begin_date, end_date) => {
	return
	getHomeDataApi({
		mer_id: '10001',
		proc_name: 'qry_home_data_customer_price',
		prms: {
			mer_id1: '10001',
			store_id1: '10001_001',
			begin_date: begin_date ?? month30,
			end_date: end_date ?? today,
		},
	}).then((data) => {
		const optionData = {
			xAxis: [],
			series: [],
		}

		data.map((data) => {
			optionData.xAxis.push(moment(data.busydate).date())
			optionData.series.push(data.pay_amout)
		})

		if (!myChart.value) {
			myChart.value = echarts.init(chartDomRef.value)
		}

		setTimeout(() => {
			myChart.value.setOption({
				xAxis: {
					type: 'category',
					data: optionData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: optionData.series,
						type: 'bar',
						barMaxWidth: 50,
					},
				],
			})
		}, 70)
	})
}
defineExpose({ getData, currentDate })

onMounted(() => {
	getData()
})
</script>

<style lang="scss" scoped>
.section {
	padding: 18px 20px;
	height: 450px;
	background: #ffffff;
	border: 1px solid #e6e6e6;
	width: 49%;
}
.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.title {
		font-size: 16px;
		color: #2f343a;
		font-weight: bold;
	}
	.tags {
		display: flex;
		.item {
			cursor: pointer;
			padding: 5px 16px;
			background: #eef1f6;
			border-radius: 4px;
			margin-left: 6px;
			font-size: 14px;
			color: #696c70;
		}
		.on {
			background: #4996f3;
			color: #fff;
		}
	}
}
.chart-dom {
	width: 100%;
	height: 400px;
}
</style>
