import axiosInstance, { amesFetch } from '../../utils/axios/ames-http'

// 获取token
export function getToken() {
	return amesFetch({
		url: '/Token/GetToken',
		// TODO
		data: {
			AppId: '306750E7-AC9B-4BCF-8391-40C810E180CD',
			OrgId: '93EO5QE40000BQ1',
			UserId: '4UHEWPYVODG0170TRZ17BA33W02YKYSAVQAL4X',
		},
	})
}

// 获取门店列表页
export function getStoreList(data, currentPage, pageSize) {
	return amesFetch({
		url: '/AemsStore/GetStoreList',
		data,
		currentPage,
		pageSize,
	})
}

// 获取标签
export function getTags(type) {
	return axiosInstance({
		url: '/AemsSelector/SelectLabels',
		data: {
			ParamDict: {
				Type: type, // 营销方案: FrmPromotionData1    销售套餐: FrmPromotionData0
				SelectLabelValuesString: '',
			},
		},
	})
}

// 获取销售页面及页面位置
export function getSalePagePositoin() {
	return axiosInstance({
		url: '/AemsPackagePage/QueryIndex',
		data: {},
	})
}
