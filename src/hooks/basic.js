import { useRouter } from 'vue-router'
import { getToken } from '../api/basic'
import { getUserPermission } from '../api/user'
import { usePermissionStore } from '../store/modules/permission'
import { useUserStore } from '../store/modules/user'
import { nextTick, ref, watch, onMounted } from 'vue'
import { resetTableHeight } from '../utils/element'
import { useBasicStore } from '../store/modules/basic'

// 没有用户数据，菜单权限时
export async function useInitUser() {
	const res = await getUserPermission()
	const permissionStore = usePermissionStore()
	permissionStore.menuList = res.ModuleList
	const userStore = useUserStore()
	userStore.user = res.User
	userStore.orgList = res.LoginOrgList
	return
}

// 获取token
export async function useToken() {
	// 重置store
	const permissionStore = usePermissionStore()
	permissionStore.$reset()
	const userStore = useUserStore()
	userStore.$reset()
	const res = await getToken()
	localStorage.setItem('token', res.TokenId)
	return
}

// 重新计算el-table高度
export function useElTable(el) {
	let tableHeight = ref(500)
	const store = useBasicStore()
	store.tableRef = el ? el : store.tableRef

	function update(h) {
		tableHeight.value = h
		store.tableHeight = h
	}

	function updateTableHeight() {
		update(resetTableHeight(store.tableRef))
	}

	onMounted(() => {
		nextTick(() => {
			if (store.tableRef) {
				update(resetTableHeight(store.tableRef))
			}
		})
	})

	return {
		tableHeight,
		updateTableHeight,
	}
}
