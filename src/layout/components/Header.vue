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
			<el-popover placement="bottom" :width="300" trigger="click">
				<template #reference>
					<span class="el-dropdown-link func-item">
						陈佩佩
						<el-icon class="el-icon--right"><arrow-down /></el-icon>
					</span>
				</template>
				<div>
					<div mb-4 class="text-[#2F3339] text-lg">陈佩佩</div>
					<div text="[#2F3339] sm">登录账号：</div>
					<div text="[#2F3339] sm">所属组织：</div>
					<div text="[#2F3339] sm">门店有效期：</div>
					<div
						mt-4
						flex
						justify-between
						text="[#2F3339] sm"
						border-b="[#eeeeee] 1"
						pb-4.5
					>
						<div flex-1 flex flex-col justify-center items-center>
							<div>云管家</div>
							<div>未绑定微信</div>
							<div
								mt-2
								w-22
								h-7
								rounded-1
								bg="[#30C996]"
								flex
								items-center
								justify-center
								text="[#ffffff] sm"
								cursor-pointer
							>
								立即绑定
							</div>
						</div>
						<div flex-1 flex flex-col justify-center items-center>
							<div>已绑定手机号码</div>
							<div>13222222222</div>
							<div
								mt-2
								w-22
								h-7
								rounded-1
								bg="[#FA8077]"
								flex
								items-center
								justify-center
								text="[#ffffff] sm"
								cursor-pointer
							>
								更换号码
							</div>
						</div>
					</div>
					<div>
						<div mt-4 flex items-center justify-between>
							<div>登录组织：</div>
							<el-dropdown>
								<span class="el-dropdown-link">
									世软科技
									<el-icon class="el-icon--right">
										<arrow-down />
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>Action 1</el-dropdown-item>
										<el-dropdown-item>Action 2</el-dropdown-item>
										<el-dropdown-item>Action 3</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<div mt-1 flex items-center justify-between>
							<div>切换语言：</div>
							<el-dropdown>
								<span class="el-dropdown-link">
									简体中文
									<el-icon class="el-icon--right">
										<arrow-down />
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>Action 1</el-dropdown-item>
										<el-dropdown-item>Action 2</el-dropdown-item>
										<el-dropdown-item>Action 3</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>

						<div
							border="1 solid [#dddddd]"
							rounded-1
							text="[#2F3339] sm"
							flex
							items-center
							justify-center
							h-9
							cursor-pointer
							mt-4
						>
							修改密码
						</div>
						<div
							border="1 solid [#dddddd]"
							rounded-1
							text="[#2F3339] sm"
							flex
							items-center
							justify-center
							h-9
							cursor-pointer
							mt-2
							mb-4
						>
							退出
						</div>
					</div>
				</div>
			</el-popover>
		</div>
	</div>
</template>

<script setup>
import Tagview from './tagview.vue'
</script>

<style lang="scss" scoped>
.header {
	height: 36px;
	background: linear-gradient(90deg, #659efd, #57b1ef);
	display: flex;
	justify-content: space-between;
	align-items: center;

	.header-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.title {
			width: 130px;
			height: 36px;
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
