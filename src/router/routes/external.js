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
]
