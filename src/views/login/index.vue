<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { login } from '/@/api/login'

const form = ref({
	account: '',
	password: '',
	code: '',
	mobile: '',
})

// 登录过程
// login bind choose
const step = ref('login')

// 登录方式
// 账号密码 account | 动态码登录 code | 扫码登录 scan
const mode = ref('account')

const changeLoginMode = (m) => {
	mode.value = m
}

// 扫码过程
// default success fail
const scanMode = ref('default')

const getCode = () => {}

const handleLogin = async () => {
	if (form.value.account.length == 0) {
		ElMessage.warning('账号不能为空')
		return
	}
	if (form.value.password.length == 0) {
		ElMessage.warning('密码不能为空')
		return
	}
	await login(form.value.account, form.value.password)
}
</script>

<template>
	<div
		w-screen
		h-screen
		style="background-image: url(/images/login/bg.png)"
		bg-center
		bg-cover
		bg-gradient-to-br
		from="[#57B1EF]"
		to="[#4487F6]"
		p-y-3.5
		p-x-4.5
	>
		<div flex justify-between items-center>
			<div text="5 [#ffffff]">
				<img src="/images/logo.png" />
			</div>
			<el-dropdown>
				<div flex items-center text="[#ffffff]">
					简体中文
					<el-icon>
						<arrow-down />
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>Action 1</el-dropdown-item>
						<el-dropdown-item>Action 2</el-dropdown-item>
						<el-dropdown-item>Action 3</el-dropdown-item>
						<el-dropdown-item disabled>Action 4</el-dropdown-item>
						<el-dropdown-item divided>Action 5</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

		<div text="[#ffffff] 10" font-bold text-center mt-2.5>云管家</div>
		<div text="[#ffffff] 4.5" tracking-4 text-center mt-4>游乐场运营系统</div>

		<div bg="[#ffffff]" w-191 h-118 m-x-auto mt-6 position-relative>
			<!-- 登录 -->
			<div flex h-118 v-if="step == 'login'">
				<div
					text="[#00B0CB]"
					p-y-2.5
					p-x-3
					bg="[#DCFAFF]"
					rounded-1.5
					position-absolute
					right-20
					top-7
					class="-translate-y-1/2"
				>
					{{ mode == 'scan' ? '账号密码登录' : '扫码登录' }}
					<div
						position-absolute
						class="-right-2 top-1/2 -translate-y-1/2"
						border-l="8 [#DCFAFF] solid"
						border-t="8 [#ffffff] solid"
						border-b="8 [#ffffff] solid"
					></div>
				</div>
				<div position-absolute right-0 top-0 cursor-pointer>
					<img
						v-show="mode != 'scan'"
						@click="changeLoginMode('scan')"
						src="/images/login/scan-login.png"
					/>
					<img
						v-show="mode == 'scan'"
						@click="changeLoginMode('account')"
						src="/images/login/account-login.png"
					/>
				</div>
				<div w-85 flex items-center bg="[#F2F7F9]">
					<img w-full src="/images/login/logo-icon.png" />
				</div>
				<div flex-1 p-x-18>
					<div text="[#F59C00] 8.5 center" mt-15>登录</div>
					<!-- 账号密码登录 -->
					<div v-show="mode == 'account'">
						<div mt-8.5>
							<el-input h-10 placeholder="账号" v-model="form.account">
								<template #prefix>
									<img src="/images/login/account.png" />
								</template>
							</el-input>
						</div>
						<div mt-4>
							<el-input
								h-10
								placeholder="密码"
								type="password"
								v-model="form.password"
							>
								<template #prefix>
									<img src="/images/login/password.png" />
								</template>
							</el-input>
						</div>
						<div flex mt-4>
							<el-input h-10 v-model="form.code">
								<template #prefix>
									<img src="/images/login/code.png" />
								</template>
							</el-input>
							<div w-25 ml-3></div>
						</div>
					</div>
					<!-- /账号密码登录 -->

					<!-- 动态码登录 -->
					<div v-show="mode == 'code'">
						<div mt-8.5>
							<el-input
								v-model="form.mobile"
								placeholder="手机号码"
								h-10
							></el-input>
						</div>
						<div mt-4 flex items-center>
							<el-input
								h-10
								flex-1
								v-model="form.code"
								placeholder="短信动态码"
							></el-input>
							<div
								min-w-28
								border="1 [#dcdfe6] solid"
								h-10
								box-border
								bg="[#EBEBEB]/60"
								flex
								items-center
								justify-center
								text="[#478CFF] sm"
								cursor-pointer
							>
								获取动态码
							</div>
						</div>
					</div>
					<!-- /动态码登录 -->

					<!-- 扫码登录 -->
					<div text-center v-show="mode == 'scan'">
						<div v-show="scanMode == 'default'">
							<img mt-9 w-55 h-55 bg="[#ffffff]" />
							<div mt-6 text="[#8A8C90] sm">请使用微信扫描二维码登录</div>
						</div>
						<div v-show="scanMode == 'success'">
							<img mt-9 grayscale />
							<div text-sm>
								<span text="[#06B35D]" font-bold>扫码成功!</span>
								<span text="[#8A8C90]" ml-1>请在微信中点击确认即可登录</span>
							</div>
						</div>
						<div v-show="scanMode == 'fail'">
							<img mt-9 />
							<div text-sm>
								<span text="[#478CFF]" underline cursor-pointer>
									刷新二维码
								</span>
								<span text="[#8A8C90]" ml-1>，重新扫码登录</span>
							</div>
						</div>
					</div>
					<!-- /扫码登录 -->

					<div
						rounded-5.5
						m-x-auto
						m-t-8
						bg="[#4996F3]"
						text="[#ffffff]"
						flex
						items-center
						justify-center
						w-50
						h-11
						cursor-pointer
						v-show="mode != 'scan'"
						@click="handleLogin"
					>
						登录
					</div>
					<div text-center mt-7.5>
						<span text="[#8A8C90] sm" v-show="mode != 'scan'">
							{{ mode == 'account' ? '忘记密码？' : '返回' }}
						</span>
						<span
							v-show="mode == 'account'"
							@click="changeLoginMode('code')"
							text="[#318CF9] sm"
							cursor-pointer
							underline
							ml-1
						>
							动态码登录
						</span>
						<span
							v-show="mode == 'code'"
							@click="changeLoginMode('account')"
							text="[#318CF9] sm"
							cursor-pointer
							underline
							ml-1
						>
							账号密码登录
						</span>
					</div>
				</div>
			</div>
			<!-- /登录 -->

			<!-- 绑定云管家 -->
			<div v-if="step == 'bind'" flex flex-col justify-center items-center>
				<img w-55 h-55 mt-20 />
				<div mt-8 text="[#2F3339] lg" font-bold>
					请使用微信扫描二维码绑定 云管家
				</div>
				<div mt-3>
					<span text="[#8A8C90] sm">绑定后，可以使用微信扫码登录</span>
					<span text="[#3A93FF] sm" underline ml-1 cursor-pointer>
						跳过绑定
					</span>
				</div>
			</div>
			<!-- /绑定云管家 -->

			<!-- 登录组织 -->
			<div v-if="step == 'choose'" p-7>
				<div flex justify-between items-center>
					<div text="[#2F343A] lg" font-bold>您可以登录一下组织：</div>
					<div
						border="[#67A8F7] 1 solid"
						w-20
						h-8
						rounded-1
						flex
						items-center
						justify-center
						cursor-pointer
						text="[#3A93FF] sm"
					>
						退出
					</div>
				</div>
				<el-scrollbar height="250px" mt-4>
					<div flex gap-3 flex-wrap>
						<div
							text-lg
							text="[#2F343A]"
							hover:text="[#ffffff]"
							w-57
							bg="[#EEF5FF]"
							hover:bg="[#3881D8]"
							cursor-pointer
							flex
							justify-center
							items-center
							h-20
							position-relative
							v-for="i in 10"
						>
							<div
								position-absolute
								text="[#FFFFFF] xs"
								bg="[#93BBEB]"
								top-0
								right-0
								p-0.5
								rounded-bl-1
							>
								激活
							</div>
							世软集团
						</div>
					</div>
				</el-scrollbar>
				<el-divider>
					<span>或登录其他系统</span>
				</el-divider>
				<el-scrollbar height="90px" mt-4>
					<div flex gap-3 flex-wrap>
						<div
							text-lg
							text="[#2F343A]"
							hover:text="[#ffffff]"
							w-57
							bg="[#EEF5FF]"
							hover:bg="[#3881D8]"
							cursor-pointer
							flex
							justify-center
							items-center
							h-16
							position-relative
							v-for="i in 10"
						>
							进销存系统
						</div>
					</div>
				</el-scrollbar>
			</div>
			<!-- /登录组织 -->
		</div>

		<div
			position-absolute
			class="left-1/2 -translate-x-1/2"
			bottom-6
			text="[#ffffff] sm"
		>
			中山市世软软件科技有限公司 | 联系电话 : 400-900-6688
		</div>

		<!-- 二维码 -->
		<div position-absolute right-6 bottom-7.5>
			<div w-26 h-26 bg="[#ffffff]" p-1></div>
			<div text-center mt-2.5 text="[#0054A7] xs">关注世软公众号</div>
		</div>
	</div>
</template>
