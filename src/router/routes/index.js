import Layout from '/@/layout/index.vue'
import externalRoutes from './external'

// 直接引入所有modules中的路由
const modules = import.meta.glob('./modules/**/*.js', {
	eager: true,
	import: 'default',
})

const routeList = []

Object.keys(modules).forEach((key) => {
	const mod = modules[key] || {}
	routeList.push(mod)
})

const basicRoute = {
	path: '/',
	name: 'root',
	component: Layout,
	redirect: '/dashboard',
	children: [],
}

const loginRoute = {
	path: '/login',
	name: 'login',
	component: () => import('/@/views/login/index.vue'),
}

// basicRoute.children = routeList.flat(2)

export const routes = [
	basicRoute,
	...routeList.flat(2),
	loginRoute,
	...externalRoutes,
]
