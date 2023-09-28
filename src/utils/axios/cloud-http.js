import axios from 'axios'

const cloudHttp = axios.create({
	baseURL: '/',
	timeout: 30 * 1000,
})

cloudHttp.interceptors.request.use(
	(config) => {
		return config
	},
	(err) => {
		console.log(err)
	},
)

cloudHttp.interceptors.response.use(
	(response) => {
		return response
	},
	(err) => {
		console.log(err)
	},
)

export { cloudHttp }
