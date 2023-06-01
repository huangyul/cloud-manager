const sales = [
	{
		path: '/sales/packages',
		name: 'SalesPackages',
		component: () => import('/@/views/sales/packages/SalesPackages.vue'),
		meta: {
			ModuleCode: 'FrmPromotionData0',
			icon: '套餐销售',
			tabName: '套餐销售',
		},
	},
	{
		// 创建活动
		path: '/sales/create-activity',
		name: 'CreateActivity',
		component: () =>
			import('/@/views/sales/create-activity/CreateActivity.vue'),
		meta: {
			tabName: '创建活动',
		},
	},
]

export default sales
