/**
 * 调用云后台的接口
 */
import HTTP from "/@/utils/request-aems";

// 获取token
export function getAemsCloudToken() {
  return HTTP({
    url: "/Api/Token/GetToken",
    data: {
      RequestId: "31",
      Data: '{"AppId": "238996D7-FD09-4EEA-B981-BC2A1A674BB6","OrgId": "4U4SZ1JN9Z7Z153YYXAF6KWM512Y75LLSD1FHD","UserId": "4UA7RAIW0SJK15VRXPL4HWPJT13Z3M5DHS3MP7"}',
    },
    method: "post",
  });
}

// 获取商品列表
export function fetchGoodList(data) {
  return HTTP({
    url: "/Api/Goods/Query",
    data,
    method: "post",
  });
}
