import http from "/@/utils/request";

/* 销售模块接口 */

// 获取销售模块列表
export function getSalePackageList(data) {
  return http({
    url: "/Api/AemsPromotionData/Query",
    method: "post",
    data,
  });
}
