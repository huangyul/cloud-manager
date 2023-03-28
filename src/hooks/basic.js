import { getToken } from "../api/basic";
import { getUserPermission } from "../api/user";
import { usePermissionStore } from "../store/modules/permission";
import { useUserStore } from "../store/modules/user";
// 没有用户数据，菜单权限时
export async function useInitUser() {
  const res = await getUserPermission();
  const permissionStore = usePermissionStore();
  permissionStore.menuList = res.ModuleList;
  const userStore = useUserStore();
  userStore.user = res.User;
  userStore.orgList = res.LoginOrgList;
  return;
}

// 获取token
export async function useToken() {
  // 重置store
  const permissionStore = usePermissionStore();
  permissionStore.$reset();
  const userStore = useUserStore();
  userStore.$reset();
  const res = await getToken();
  localStorage.setItem("token", res.TokenId);
  return;
}