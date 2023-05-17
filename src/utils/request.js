import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";

const instance = axios.create({
  timeout: 10000,
  baseURL: process.env.NODE_ENV == "development" ? "/api" : "/front",
});

let loading;

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(255,255,255, 0.1)",
    });
    // 在发送请求之前做些什么
    // TODO token
    config.headers["srcs_token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZWJ1ZyIsImFwcF90eXBlIjoiKiIsInVzZXJfaWQiOiIqIiwidXNlcl90eXBlIjoiKiIsIl9leHBpcmVzIjoiMTI0MDYyNTIiLCJzdG9yZV9pZCI6IioiLCJtZXJfaWQiOiIqIiwiZGV2aWNlX2lkIjoiKiJ9.BG103p2w0FgcIAG3SL0Xg44uLAq5qpsS1zSbSudTrCs";

    // 线上环境token
    // config.headers['srcs_token'] =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZWJ1ZyIsImFwcF90eXBlIjoiY20iLCJ1c2VyX2lkIjoiKiIsInVzZXJfdHlwZSI6IioiLCJfZXhwaXJlcyI6IjEyNDA2MjUyIiwic3RvcmVfaWQiOiIqIiwibWVyX2lkIjoiKiIsImRldmljZV9pZCI6IioifQ.tmYJm1cd2qvby4TUBT_alGz5KBKD3tLQ3BSA_lw0G9w'
    let data = config.data ?? {};
    config.data = Object.assign(data, {
      mer_id: "10001",
      store_id: "10001_001",
    });
    return config;
  },
  function (error) {
    loading.close();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    loading.close();
    const res = response.data;
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (res.exstatus != 0) {
      // TODO　会员不存在的情况，不报错，返回空数据
      if (res.exstatus == 703) {
        return null;
      } else {
        ElMessage.error(res.exmsg);
        return Promise.reject(res.exmsg);
      }
    } else {
      return res.data;
    }
  },
  function (error) {
    loading.close();
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default instance;
