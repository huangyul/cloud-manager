// 外部直接链接的页面
import CodeMeterList from '/@/views/code-meter/list/CodeMeterList.vue'

export default [
	{
		path: '/code-meter/list',
		name: 'code-meter',
		component: CodeMeterList,
		meta: {
			notAuth: true,
		},
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('/@/views/dashboard/Dashboard.vue'),
	},
]
