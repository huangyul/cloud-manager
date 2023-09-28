import { cloudHttp } from '../../utils/axios/cloud-http'

/**
 * 获取抄码表列表
 * @param merId
 * @returns
 */
export function getCodeMeterList(data) {
	const merId = '10001'
	return cloudHttp({
		url: `cloudstoreservice/${merId}/gamemachine/getinventorycountingrecordlist`,
		method: 'post',
		data,
	})
}
