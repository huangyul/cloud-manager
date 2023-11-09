/**
 * 调用云后台的接口
 */
import HTTP from '/@/utils/axios/aems-http.js'

// 登录
export function login(account, password) {
	return HTTP({
		url: '/User/Login',
		data: {
			RequestId: Date.now(),
			Data: JSON.stringify({
				Account: account,
				Password: password,
				AppId: 'ED0F86D6-F884-49BA-97C7-D8089B65B2D1', // 云管家
			}),
		},
		method: 'post',
	})
}
