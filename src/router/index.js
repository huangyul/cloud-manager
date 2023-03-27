import { createRouter, createWebHashHistory } from "vue-router";
import { useMultipleTabStore } from "../store/modules/multipleTab";
import { routes } from "./routes";

// 白名单路由
const WHILE_NAME_LIST = [];
// TODO 白名单要包含基本静态路由

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const tabStore = useMultipleTabStore();
  if (
    !tabStore.tabList.some((route) => route.name == to.name) &&
    to.name != "dashboard"
  ) {
    tabStore.tabList.push(to);
  }
  next();
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
