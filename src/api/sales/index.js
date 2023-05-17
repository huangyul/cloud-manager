import http from '/@/utils/axios/ames-http'

/* 销售模块接口 */

// 获取销售模块列表所需的下拉参数
export function getSalePackageListOptions(data) {
	return http({
		url: '/AemsPromotionData/GetLoadData',
		method: 'post',
		data,
	})
}

// 获取销售模块列表
export function getSalePackageList(data) {
	return http({
		url: '/AemsPromotionData/Query',
		method: 'post',
		data,
	})
}

// 获取方案模板列表
export function getProgrammeTemplateList(data) {
	return http({
		url: '/AemsPromotionAddin/GetByCategory',
		method: 'post',
		data,
	})
}

// 套餐销售删除
export function deleteSalePackage(data) {
	return http({
		url: '/AemsPromotionData/Delete',
		method: 'post',
		data,
	})
}