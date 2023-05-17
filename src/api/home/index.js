import http from "/@/utils/request";

// 首页报表数据
export function getHomeDataApi(data) {
  return http({
    url: "/dsc/StatisticsAPI/cloudmanagerhomepage/runprocapi",
    method: "post",
    data,
  });
}
