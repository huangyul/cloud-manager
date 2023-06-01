import http, { amesFetch } from '/@/utils/axios/ames-http'

/* 销售模块接口 */

// 获取销售模块列表所需的下拉参数
export function getSalePackageListOptions(data) {
	return amesFetch({
		url: '/AemsPackage/ListInitializeData',
		data,
	})
}

// 获取销售模块列表
export function getSalePackageList(data, currentPage, pageSize, sort) {
	return amesFetch({
		url: '/AemsPackage/Query',
		data,
		currentPage,
		pageSize,
		sort,
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

// 获取销售页面及位置
export function getSalePageData(data = {}) {
	return http({
		url: '/AemsPackagePage/QueryIndex',
		method: 'post',
		data,
	})
}

// 根据渠道获取销售页面
export function getSalePageDataByChannel(data) {
	return amesFetch({
		url: '/AemsPackagePage/QueryByPromotion',
		data,
	})
}

// 新建套餐时所需的数据
export function beforeCreatePackage(data = {}) {
	return amesFetch({
		url: '/AemsPackage/InitializeData',
		method: 'post',
		data,
	})
}

// 保存方案套餐
export function savePackage(data) {
	return amesFetch({
		url: '/AemsPackage/Save',
		method: 'post',
		data,
	})
}

// 删除方案
export function deletePackage(data) {
	return amesFetch({
		url: '/AemsPackage/Delete',
		data,
	})
}

// 获取方案详情
export function getPackageDetail(data) {
	return amesFetch({
		url: '/AemsPackage/GetDetail',
		data,
	})
}
