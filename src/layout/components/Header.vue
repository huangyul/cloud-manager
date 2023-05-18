<template>
	<div class="header">
		<!-- 左侧标签列 -->
		<div class="header-left">
			<div class="title">世软科技</div>
			<Tagview></Tagview>
		</div>
		<!-- 右侧功能区 -->
		<div class="header-right">
			<div class="func-item">
				审批
				<span class="number">8</span>
			</div>
			<div class="func-item">
				任务
				<span class="number">10</span>
			</div>
			<div class="func-item">
				<img src="/images/layout/help.png" />
				帮助
			</div>
			<!-- 个人信息下拉 -->
			<el-dropdown>
				<span class="el-dropdown-link func-item">
					陈佩佩
					<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>Action 1</el-dropdown-item>
						<el-dropdown-item>Action 2</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import Tagview from './tagview.vue'
</script>

<style lang="scss" scoped>
.header {
	height: 40px;
	background: linear-gradient(90deg, #659efd, #57b1ef);
	display: flex;
	justify-content: space-between;
	align-items: center;
	.header-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.title {
			width: 90px;
			height: 40px;
			font-size: 16px;
			font-family: FZZhengHeiS-EB-GB;
			font-weight: bold;
			color: #ffffff;
			text-shadow: 0px 1px 1px rgba(24, 70, 146, 0.1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.header-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.func-item {
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #ffffff;
			display: flex;
			align-items: center;
			.number {
				padding: 0 6px;
				background: #f9c02e;
				border-radius: 9px;
				margin-left: 4px;
			}
		}
		.func-item:not(:last-child) {
			margin-right: 24px;
		}
		.func-item:last-child {
			margin-right: 10px;
		}
	}
}
</style>
