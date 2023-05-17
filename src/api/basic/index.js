import { amesFetch } from '../../utils/axios/ames-http'

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
export function getStoreList() {
	return amesFetch({
		url: '/AemsStore/GetStoreList',
		data: {
			ParamDict: {
				orgType: 1, // 1-只查询门店，2-所有组织
				containAllStore: 0, // 1-包含所有组织，0-排除独立门店
			},
			PageSetting: {
				page_num: 1,
				page_size: 100,
			},
		},
	})
}
