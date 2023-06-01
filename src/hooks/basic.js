import { useRouter } from 'vue-router'
import { getToken } from '../api/basic'
import { getUserPermission } from '../api/user'
import { usePermissionStore } from '../store/modules/permission'
import { useUserStore } from '../store/modules/user'
import { nextTick, ref, watch } from 'vue'
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
	let tableHeight = ref(10)
	const store = useBasicStore()
	store.tableRef = el ? el : store.tableRef
	watch(tableHeight, (val) => {
		store.tableHeight = val
	})

	function update(h) {
		tableHeight.value = h
	}

	function updateTableHeight() {
		console.log(1)
		update(resetTableHeight(store.tableRef))
	}

	nextTick(() => {
		console.log(2)
		if (store.tableRef) {
			update(resetTableHeight(store.tableRef))
		}
	})
	return {
		tableHeight,
		updateTableHeight,
	}
}
