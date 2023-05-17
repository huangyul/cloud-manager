import http from "/@/utils/request";

// 订单订单查询-明细查询
export function getOrderListByDetail(params, data) {
  return http({
    url: "/dsc/OrderApi/queryapi/queryordergoodslist",
    method: "post",
    data: {
      orderSummaryFilter: { ...data },
    },
    params,
  });
}

// 订单订单查询-汇总查询
export function getOrderListByAggregate(params, data) {
  return http({
    url: "/dsc/OrderApi/queryapi/queryordergoodscollect",
    method: "post",
    params,
    data: {
      orderSummaryFilter: { ...data },
    },
  });
}

// 订单查询-获取订单查询
export function getOrderDetail(params) {
  return http({
    url: "/dsc/OrderApi/shoppingcartapi/getbill",
    method: "post",
    params,
  });
}
