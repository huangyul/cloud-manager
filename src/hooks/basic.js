import { useRouter } from 'vue-router'
import { getToken } from '../api/basic'
import { getUserPermission } from '../api/user'
import { usePermissionStore } from '../store/modules/permission'
import { useUserStore } from '../store/modules/user'
import { useMultipleTabStore } from '/@/store/modules/multipleTab'
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

export function useTabs() {
	const tabStore = useMultipleTabStore()
	const router = useRouter()

	const handleCloseTab = (route, currentRoute) => {
		tabStore.tabList = tabStore.tabList.filter((t) => t.name != route.name)

		if (route.path == currentRoute.path) {
			if (tabStore.tabList.length === 0) {
				router.replace('/')
			} else if (index + 1 >= tabStore.tabList.length) {
				router.replace(tabStore.tabList[index - 1 >= 0 ? index - 1 : 0].path)
			} else {
				router.replace(tabStore.tabList[index].path)
			}
		}
	}

	return {
		handleCloseTab,
	}
}
