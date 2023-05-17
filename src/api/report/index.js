import http from "/@/utils/request";

// header数据
export function getReportHeaderData(data) {
  return http({
    url: "/dsc/StatisticsAPI/cloudmanagerhomepage/runprocapi",
    method: "post",
    data,
  });
}

// 获取营业额组成
export function getBusinessComposition(params, data) {
  return http({
    url: "/dsc/OrderApi/queryapi/queryordergoodscollect2",
    method: "post",
    params,
    data: {
      filter: { ...data },
    },
  });
}

// 获取收银录入报表数据
export function getCashierEntryData(params, data) {
  return http({
    url: "/dsc/OrderApi/queryapi/queryoperatorpayreceivelist",
    method: "post",
    params,
    data: {
      filter: { ...data },
    },
  });
}
