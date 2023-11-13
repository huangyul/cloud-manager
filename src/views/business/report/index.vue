<template>
	<div class="page">
		<div class="actions">
			<el-radio-group m-x-4>
				<el-radio size="large">
					<template #default>
						<div flex items-center>
							未结账日期
							<el-tooltip
								class="box-item"
								effect="dark"
								content="若当天未结账，则在第二天凌晨5点自动生成一个账期，5点以后的订单归为第二天营业收入"
							>
								<img src="/images/common/question_tips.png" ml-1 />
							</el-tooltip>
						</div>
					</template>
				</el-radio>
				<el-radio size="large">全部日期</el-radio>
			</el-radio-group>
			<el-select mr-4></el-select>
			<button class="mr-3 checkout">结账</button>
			<button
				w-20
				h-9
				border="1 solid #dddddd"
				rounded-1
				text="[#5E6166]"
				cursor-pointer
				bg="[#F4F5F6]"
			>
				导出
			</button>
		</div>

		<HeaderSection />

		<div
			bg="[#ffffff]"
			rounded-1
			class="shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]"
			p-6
		>
			<div text="[#2F343A] 4" font-bold>收银员录入</div>
			<SimpleTable mt-3></SimpleTable>
		</div>

		<div class="wrap">
			<div class="section">
				<div class="tabs">
					<div
						class="item"
						:class="{ on: tabIndex === 0 }"
						@click="tabIndex = 0"
					>
						收银员录入
					</div>
					<div class="bor"></div>
					<div
						class="item"
						:class="{ on: tabIndex === 1 }"
						@click="tabIndex = 1"
					>
						营业额组成
					</div>
				</div>

				<component :is="tabIndex ? SimpleTable : ComplexTable" />
			</div>
			<!-- 排行榜 -->
			<div class="rankings">
				<Rankings />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderSection from './components/header-section.vue'
import Rankings from './components/rankings/index.vue'
import ComplexTable from './components/complex-table.vue'
import SimpleTable from './components/simple-table.vue'

const tabIndex = ref(0)
</script>

<style lang="scss" scoped>
.page {
	background: #f8fafc;
	padding: 16px;

	.actions {
		margin-bottom: 20px;
		display: flex;
		align-items: center;

		.date-btn {
			display: flex;

			div {
				height: 36px;
				font-size: 14px;
				line-height: 36px;
				text-align: center;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #318cf9;
				background: #ffffff;
				border: 1px solid #4996f3;
				cursor: pointer;
			}

			div:nth-child(1) {
				width: 110px;
				border-radius: 4px 0px 0px 4px;
			}

			div:nth-child(2) {
				width: 110px;
				border-radius: 0px 4px 4px 0px;
			}

			.active {
				background: #318cf9;
				color: #ffffff;
				font-weight: bold;
			}
		}

		.checkout {
			cursor: pointer;
			width: 80px;
			height: 36px;
			background: #ff6161;
			border-radius: 4px;
			border: none;
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #ffffff;

			&:hover {
				opacity: 0.8;
			}
		}

		.export {
			cursor: pointer;
			width: 80px;
			height: 36px;
			background: #dddddd;
			border-radius: 4px;
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #5e6166;
			border: none;

			&:hover {
				opacity: 0.8;
			}
		}
	}
}

.wrap {
	display: flex;

	.section {
		flex: 1;
		width: calc(100% - 16px - 320px);

		.tabs {
			display: flex;
			align-items: center;
			margin-bottom: 16px;

			.item {
				font-size: 15px;
				font-weight: bold;
				color: #95979a;
				position: relative;
				z-index: 3;
			}

			.bor {
				width: 1px;
				height: 16px;
				background: #c4c4c4;
				margin: 0 20px;
			}

			.on {
				color: #2f3339;
				font-size: 16px;

				&::after {
					content: '';
					display: block;
					width: 84px;
					height: 6px;
					background: #f9c02e;
					border-radius: 3px;
					position: absolute;
					bottom: -3px;
					left: -2px;
					z-index: 2;
				}
			}
		}
	}

	.rankings {
		width: 320px;
		margin-left: 16px;
	}
}
</style>
