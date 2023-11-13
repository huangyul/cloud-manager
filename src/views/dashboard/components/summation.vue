<template>
	<div class="board">
		<div class="title-bar">
			<div class="swtice">
				<div
					class="item"
					:class="{ on: dataType === 'sale_amount' }"
					@click="changeDataType('sale_amount')"
				>
					营收
				</div>
				<div
					class="item"
					:class="{ on: dataType === 'used_coin' }"
					@click="changeDataType('used_coin')"
				>
					耗币
				</div>
			</div>
			<div class="lable">{{ allLabel }}</div>
			<div class="tags">
				<div class="item" :class="{ on: type === 0 }" @click="changeType(0)">
					昨日
				</div>
				<div class="item" :class="{ on: type === 1 }" @click="changeType(1)">
					今日
				</div>
				<div class="item" :class="{ on: type === 2 }" @click="changeType(2)">
					本周
				</div>
				<div class="item" :class="{ on: type === 3 }" @click="changeType(3)">
					本月
				</div>
			</div>
		</div>
		<div class="board-echarts" ref="chartDomRef"></div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import moment from 'moment'
import Decimal from 'decimal.js'
import { getHomeDataApi } from '/@/api/home/index.js'

let yesterday = moment().subtract(1, 'days').format('YYYY-M-D')
let today = moment().format('YYYY-M-D')
let week1 = moment().week(moment().week()).startOf('week').format('YYYY-M-D')
let week7 = moment().week(moment().week()).endOf('week').format('YYYY-M-D')
let month1 = moment()
	.month(moment().month())
	.startOf('month')
	.format('YYYY-M-D')
let month30 = moment().month(moment().month()).endOf('month').format('YYYY-M-D')

const chartDomRef = ref()
const dataType = ref('sale_amount')
const type = ref(3)
const myChart = ref()
const allLabel = ref('')
const currentDate = ref([month1, month30])

const add = (a, b) => {
	return new Decimal(a || 0).add(b || 0).toNumber()
}

const changeDataType = (value) => {
	if (dataType.value === value) return
	dataType.value = value
	type.value = 3
	getData(month1, month30)
}

const changeType = (value) => {
	if (type.value === value) return
	type.value = value

	switch (value) {
		case 0:
			getData(yesterday, yesterday)
			currentDate.value = [yesterday, yesterday]
			break
		case 1:
			getData(today, today)
			currentDate.value = [today, today]

			break
		case 2:
			getData(week1, week7)
			currentDate.value = [week1, week7]
			break
		case 3:
			getData(month1, month30)
			currentDate.value = [month1, month30]

			break
		default:
			break
	}
}

const getData = (begin_date, end_date) => {
	return
	getHomeDataApi({
		mer_id: '10001',
		proc_name:
			dataType.value == 'sale_amount'
				? 'qry_home_data_saleamount'
				: 'qry_home_data_used_coin',
		prms: {
			mer_id1: '10001',
			store_id1: '10001_001',
			begin_date: begin_date,
			end_date: end_date,
		},
	}).then((res) => {
		if (res) {
			const optionData = {
				xAxis: [],
				series: [],
			}
			allLabel.value = ''
			let _all = 0
			res.map((data) => {
				optionData.xAxis.push(moment(data.busydate).date())
				optionData.series.push(data[dataType.value])
				_all = add(_all, data[dataType.value])
			})
			allLabel.value =
				dataType.value == 'sale_amount'
					? `总营业额：${_all}元`
					: `总耗币数：${_all}个`

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
						},
					],
				})
			}, 70)
		}
	})
}

defineExpose({ getData, currentDate })

onMounted(() => {
	getData(month1, month30)
})
</script>

<style lang="scss" scoped>
.board {
	height: 427px;
	background: #ffffff;
	border: 1px solid #e6e6e6;
	margin-bottom: 16px;
	.title-bar {
		display: flex;
		justify-content: space-between;
		padding: 16px 20px;
		.swtice {
			width: 180px;
			border: 1px solid #4996f3;
			height: 32px;
			border-radius: 4px;
			display: flex;
			overflow: hidden;
			.item {
				cursor: pointer;
				width: 50%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #318cf9;
			}
			.on {
				background: #4996f3;
				color: #fff;
			}
		}
		.tags {
			display: flex;
			.item {
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 62px;
				height: 28px;
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
		.lable {
			font-size: 16px;
			color: #2f343a;
			font-weight: bold;
		}
	}
	.board-echarts {
		height: 400px;
	}
}
</style>
