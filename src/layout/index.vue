<template>
	<div>
		<MyHeader></MyHeader>
		<div class="my-container">
			<Aside class="aside"></Aside>
			<div class="content">
				{{ aliveRoutes }}
				<RouterView v-slot="{ Component }">
					<transition>
						<KeepAlive>
							<component :is="Component" />
						</KeepAlive>
					</transition>
				</RouterView>
			</div>
		</div>
	</div>
</template>

<script setup>
import MyHeader from './components/Header.vue'
import Aside from './components/Aside.vue'
import { computed } from 'vue'
import { useMultipleTabStore } from '/@/store/modules/multipleTab'

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
		width: 90px;
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
