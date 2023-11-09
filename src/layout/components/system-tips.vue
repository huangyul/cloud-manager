<!-- 系统信息弹窗 -->
<template>
	<div class="no-header-dialog">
		<el-dialog
			v-model="dialogVisible"
			:show-close="false"
			title=" "
			width="640px"
			:before-close="handleClose"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
		>
			<div
				style="background-image: url(/images/layout/system-tip-bg.png)"
				w-full
				rounded-2
				h-119
				bg-no-repeat
				p-x-10
				p-y-8
			>
				<div text="[#2F3339] 6" font-bold>系统消息</div>
				<div flex mt-6>
					<div w-1 h-11 bg="[#53B9F5]"></div>
					<div text="[#2F3339] sm" flex flex-col justify-between ml-4>
						<div>主题：服务续约提示</div>
						<div>时间：2022-10-10</div>
					</div>
				</div>
				<div border="1 [#d2d2d2] solid" p-y-4 p-x-5 mt-6 bg="[#ffffff]">
					<el-scrollbar height="200px" text="[#757474] sm">
						<div v-for="item in 20" :key="item">{{ item }}</div>
					</el-scrollbar>
				</div>
				<div flex justify-between items-center mt-4>
					<el-checkbox v-model="noTips" label="当天不在提示" size="large" />
					<div blue-btn w-30 h-10>知道了</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const noTips = ref(true)
</script>
