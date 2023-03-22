import instance from "/@/utils/request";

// 会员档案查询-明细
export function getMemberArchivesByDetails(data) {
  return instance({
    url: "/dsc/Leager/leagerapi/queryleagerinfo",
    method: "post",
    data,
  });
}

// 会员档案查询-会员级别汇总
export function getMemberArchivesByMember(data) {
  return instance({
    url: "/dsc/Leager/leagerapi/queryleagsortinfo",
    method: "post",
    data,
  });
}

// 根据手机号/openId/证件号等获取会员详情
export function getMemberDetailByOther(data) {
  return instance({
    url: "/dsc/Leager/leagerapi/find",
    method: "post",
    data,
  });
}

// 获取会员详情信息
export function getMemberDetail(data) {
  return instance({
    url: "/dsc/Leager/leagerapi/getbyid",
    method: "post",
    params: data,
  });
}

// 获取会员详情-会员余额
export function getMemberBalance(data) {
  return instance({
    url: "/dsc/Leager/leagerapi/allbalance",
    method: "post",
    params: data,
  });
}

// 会员详情-查询订单
export function getMemberOrder(data) {
  return instance({
    url: "/dsc/OrderApi/queryapi/queryordersummarylist",
    method: "post",
    data,
  });
}

// 回收排行列表
export function getRecoveryData(data) {
  return instance({
    url: "/dsc/OrderApi/rankingapi/getcloudrecoveryrankingdata",
    method: "post",
    data,
  });
}

// 兑换排行列表
export function getExchangeData(data) {
  return instance({
    url: "/dsc/OrderApi/rankingapi/getcloudexchangerankingdata",
    method: "post",
    data,
  });
}
