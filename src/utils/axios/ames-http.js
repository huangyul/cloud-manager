/* 云后台接口 */
import axios from "axios";
import { ElMessage } from "element-plus";
import completeConfig from "../generate-http-sign";

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: "/Api",
  method: "post",
});

const whiteApi = ["/Token/GetToken"];

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    if (!whiteApi.includes(config.url)) {
      config = completeConfig(config);
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data.Code === 200) {
      return response.data.Result;
    } else {
      ElMessage({
        message: response.data.Message,
        type: "error",
      });
    }
  },
  function (error) {
    ElMessage({
      type: "error",
      message: error,
    });
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const amesFetch = ({ url, data, page = 1, pageSize = 20 }) => {
  return axiosInstance({
    url: url,
    data: {
      ResultSerialize: false,
      ParamDict: data,
      PageSetting: { PageNum: page, PageSize: pageSize },
    },
  });
};

export default axiosInstance;
