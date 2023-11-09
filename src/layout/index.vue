<template>
	<div>
		<Header></Header>
		<div class="my-container">
			<Aside class="aside"></Aside>
			<div class="content">
				<RouterView v-slot="{ Component }">
					<transition>
						<KeepAlive :include="aliveRoutes">
							<component :is="Component" />
						</KeepAlive>
					</transition>
				</RouterView>
			</div>
		</div>

		<SystemTips></SystemTips>
	</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import { computed } from 'vue'
import { useMultipleTabStore } from '/@/store/modules/multipleTab'
import SystemTips from './components/system-tips.vue'

const tabStore = useMultipleTabStore()

const aliveRoutes = computed(() => {
	let res = []
	tabStore.tabList.forEach((tab) => {
		res.push(tab.name)
	})
	return res
})
</script>

<style lang="scss" scoped>
.my-container {
	display: flex;
	height: calc(100vh - 40px);

	.aside {
		width: 130px;
	}

	.content {
		overflow: auto;
		flex: 1;
		height: calc(100vh - 40px);
		display: flex;
		flex-direction: column;
	}
}
</style>
