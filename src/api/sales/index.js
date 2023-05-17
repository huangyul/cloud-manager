import http from '/@/utils/request'

/* 销售模块接口 */

// 获取销售模块列表所需的下拉参数
export function getSalePackageListOptions(data) {
	return http({
		url: '/Api/AemsPromotionData/GetLoadData',
		method: 'post',
		data,
	})
}

// 获取销售模块列表
export function getSalePackageList(data) {
	return http({
		url: '/Api/AemsPromotionData/Query',
		method: 'post',
		data,
	})
}
