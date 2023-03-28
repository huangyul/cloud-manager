import { createRouter, createWebHashHistory } from "vue-router";
import { useInitUser, useToken } from "../hooks/basic";
import { useMultipleTabStore } from "../store/modules/multipleTab";
import { usePermissionStore } from "../store/modules/permission";
import { routes } from "./routes";

// 白名单路由
const WHILE_NAME_LIST = [];
// TODO 白名单要包含基本静态路由

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  // 如果没有token
  const token = localStorage.getItem("token");
  const permissionStore = usePermissionStore();
  if (!token) {
    await useToken();
    next(to.path);
  } else if (permissionStore.menuList.length == 0) {
    await useInitUser();
    next(to.path);
  } else {
    // 路由跳转后添加tab
    const tabStore = useMultipleTabStore();
    if (
      !tabStore.tabList.some((route) => route.name == to.name) &&
      to.name != "dashboard"
    ) {
      tabStore.tabList.push(to);
    }
    next();
  }
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name & !WHILE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app) {
  app.use(router);
}
