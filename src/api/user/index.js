import { amesFetch } from '../../utils/axios/aems-http'

// 获取用户能访问的模块
export function getUserPermission() {
	return amesFetch({
		url: '/User/GetUserContextData',
		data: {
			// TODO
			AppId: '306750E7-AC9B-4BCF-8391-40C810E180CD',
			OrgId: '93EO5QE40000BQ1',
			UserId: '4UHEWPYVODG0170TRZ17BA33W02YKYSAVQAL4X',
		},
	})
}
