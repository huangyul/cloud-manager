import { AppRouteRecordRaw } from '../../types'
import Layout from '/@/layout/index.vue'

const dashboard: AppRouteRecordRaw = {
  path: '/',
  name: 'home',
  component: Layout,
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('/@/views/dashboard/index.vue'),
    },
  ],
  redirect: '/dashboard',
}

export default dashboard
