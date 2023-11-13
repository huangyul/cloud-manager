<template>
	<div class="section">
		<div class="top-bar">
			<div class="title">今日销售额类别占比</div>
			<div class="tags">
				<div
					class="item"
					:class="{ on: type === 'all' }"
					@click="changeType('all')"
				>
					全部渠道
				</div>
				<div
					class="item"
					:class="{ on: type === 'onLine' }"
					@click="changeType('onLine')"
				>
					线上
				</div>
				<div
					class="item"
					:class="{ on: type === 'store' }"
					@click="changeType('store')"
				>
					门店
				</div>
			</div>
		</div>
		<div class="wrap">
			<div class="chart-wrap">
				<div class="chart-dom" ref="chartDomRef"></div>
			</div>
			<div class="data" v-if="data">
				<div class="item" v-for="(item, $index) in data[type]" :key="$index">
					<div class="label">
						<span :style="{ backgroundColor: item.itemStyle.color }" />
						{{ item.name }}
					</div>
					<div class="value">{{ item.value }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { getHomeDataApi } from '/@/api/home/index.js'
import moment from 'moment'

const chartDomRef = ref()
const myChart = ref()
const data = shallowRef()
const type = ref('all')
let today = moment().format('YYYY-M-D')

const colorList = ['#3BA1FF', '#31C25D', '#FACC14', '#F04A66', '#823EDF']

const changeType = (value) => {
	if (value === type.value) return
	type.value = value
	setOption()
}

const getData = () => {
	return
	getHomeDataApi({
		mer_id: '10001',
		proc_name: 'qry_home_data_channel',
		prms: {
			mer_id1: '10001',
			store_id1: '10001_001',
			begin_date: today,
			end_date: today,
			// begin_date: '2022-8-1',
			// end_date: '2022-8-6',
		},
	}).then((res) => {
		let onLine = []
		let store = []
		res.map((item, index) => {
			let _data = {
				name: item.fname,
				value: item.amount,
				itemStyle: {
					color: colorList[index],
				},
			}
			if (item.channel == 'online') {
				onLine.push(_data)
			} else [store.push(_data)]
		})

		data.value = {
			all: onLine.concat(store),
			onLine,
			store,
		}

		setOption()
	})
}

const setOption = () => {
	myChart.value.setOption({
		overflow: 'none',
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['80%', '50%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: false,
					position: 'center',
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '40',
						fontWeight: 'bold',
					},
				},
				labelLine: {
					show: false,
				},
				data: data.value[type.value],
				minAngle: 2,
			},
		],
	})
}

const init = () => {
	myChart.value = echarts.init(chartDomRef.value)
}

defineExpose({ getData })

onMounted(() => {
	init()
	getData()
})
</script>

<style lang="scss" scoped>
.section {
	padding: 18px 20px;
	height: 450px;
	background: #ffffff;
	border: 1px solid #e6e6e6;
}
.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 50px;
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
			color: #fff;
			background: #4996f3;
		}
	}
}
.wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.data {
		width: 40%;
		.item {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			.label {
				color: #2f3339;
				font-weight: bold;
				span {
					display: inline-block;
					width: 10px;
					height: 10px;
					background: #3ba1ff;
					border-radius: 50%;
					margin-right: 7px;
				}
			}
			.value {
				color: #696c70;
			}
		}
	}
}
.chart-wrap {
	width: 300px;
	height: 300px;
	position: relative;
	.chart-dom {
		position: absolute;
		top: 0;
		left: 0;
		width: 300px;
		height: 300px;
	}
}
</style>
