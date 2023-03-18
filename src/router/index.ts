import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { routes } from './routes'

// 白名单路由
const WHILE_NAME_LIST: string[] = []
// TODO 白名单要包含基本静态路由

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
})

export function resetRouter() {
  router.getRoutes().forEach((route: any) => {
    const { name } = route
    if (name & (!WHILE_NAME_LIST.includes(name) as any)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}
