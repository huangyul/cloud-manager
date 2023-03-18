import { AppRouteRecordRaw } from '../types'

const modules = import.meta.glob('./modules/**/*.ts', {
  eager: true,
  import: 'default',
})

const routeList: AppRouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeList.push(modList)
})

export const routes = [routeList]
