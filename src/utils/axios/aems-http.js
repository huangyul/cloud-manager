/* 云后台接口 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/modules/user'
import completeConfig from '../generate-http-sign'

const axiosInstance = axios.create({
	timeout: 30000,
	baseURL: '/Api',
	method: 'post',
})

const whiteApi = ['/Token/GetToken']

// 添加请求拦截器
axiosInstance.interceptors.request.use(
	function (config) {
		// const userStore = useUserStore()
		// userStore.isAction = true
		// if (!whiteApi.includes(config.url)) {
		// 	config = completeConfig(config)
		// }
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	},
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
	function (response) {
		if (response.data.Code === 200) {
			return response.data.Result
		} else if (response.data.Code == 201) {
			localStorage.clear()
			sessionStorage.clear()
			ElMessage({
				message: '登录已过期，请重新登录',
				type: 'warning',
			})
		} else {
			ElMessage({
				message: response.data.Message,
				type: 'error',
			})
			return Promise.reject()
		}
	},
	function (error) {
		ElMessage({
			type: 'error',
			message: error,
		})
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error)
	},
)

export const amesFetch = ({ url, data, currentPage, pageSize, sort }) => {
	const reqData = {
		ResultSerialize: false,
		ParamDict: data,
	}
	if (currentPage && pageSize) {
		reqData.PageSetting = { PageNum: currentPage, PageSize: pageSize }
	}
	if (sort) {
		reqData.SortFields = { ...sort }
	}
	return axiosInstance({
		url,
		data: reqData,
	})
}

export default axiosInstance
