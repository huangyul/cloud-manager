<template>
	<div class="page">
		<div class="top-bar">
			<div>
				当前营业时间
				<span class="date">{{ currentDate }}</span>
			</div>
			<div class="time-reflesh">
				<p class="time">刷新时间：{{ refreshTime }}</p>
				<el-button type="primary" @click="refreshHandle">刷新</el-button>
			</div>
		</div>

		<Discovery ref="discovery" />

		<!-- 总营业额 -->
		<Summation ref="summation" />

		<!-- 饼图 -->
		<div class="row">
			<CakeSale class="section-card" ref="cakesale" />
			<RankedCard class="section-card" ref="rankedcard" />
		</div>

		<!-- 客单价 -->
		<CategoryCard ref="categorycard" />

		<!-- 趋势 -->
		<!-- <TrendCard /> -->
	</div>
</template>

<script setup>
import Summation from './components/summation.vue'
import CakeSale from './components/cake-sale.vue'
import CategoryCard from './components/category-card.vue'
import RankedCard from './components/ranked-card.vue'
//import TrendCard from './components/trend-card.vue'
import Discovery from './components/discovery.vue'
import { nextTick, ref } from 'vue'
import moment from 'moment'
import { getCTime } from '/@/utils/helper'
import { computed } from 'vue'

const refreshTime = ref(
	getCTime(new Date().toLocaleString().replaceAll('/', '-')),
)
const discovery = ref(null)
const summation = ref(null)
const cakesale = ref(null)
const rankedcard = ref(null)
const categorycard = ref(null)
let isInit = ref(true)

const currentDate = computed(() => {
	return new Date().toLocaleDateString().replaceAll('/', '-')
})

const refreshHandle = () => {
	nextTick(() => {
		refreshTime.value = getCTime(
			new Date().toLocaleString().replaceAll('/', '-'),
		)
		discovery.value.getData()
		summation.value.getData(
			summation.value.currentDate[0],
			summation.value.currentDate[1],
		)
		rankedcard.value.getData()
		cakesale.value.getData()
		categorycard.value.getData(
			categorycard.value.currentDate[0],
			categorycard.value.currentDate[1],
		)
	})
}
</script>

<style lang="scss" scoped>
.page {
	background: #f8fafc;
	padding: 0 16px 16px;
}

.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	color: #696c70;
	font-size: 14px;
	margin-right: 14px;

	.date {
		margin-left: 10px;
	}

	.time-reflesh {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.time {
			color: #696c70;
			font-size: 14px;
			margin-right: 14px;
		}
	}
}

.row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;

	.card-section {
		width: 49%;
		height: 201px;
		background: #ffffff;
		border: 1px solid #e6e6e6;
		padding: 18px 20px;

		.title {
			font-size: 16px;
			font-weight: bold;
			color: #2f343a;
			margin-bottom: 16px;
		}
	}
}

.section-card {
	width: 49%;
}
</style>
