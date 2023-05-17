/* 库存管理 */
import http from "/@/utils/request";

/**
 * 库存管理接口，接口文档地址：http://192.168.16.5:3005/#/zh-cn/saasbusiness/ApiDescription/inventory
 */

/**
 * 自动生成单号（入仓，出仓，转仓）
 * @param {Object} data
 * @returns
 */
export function generateOrderNum(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/createbillno",
    method: "post",
    data,
  });
}

/**
 * 选择商品获取商品列表
 * @param {Object} data
 * @returns
 */
export function getItems(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/getitems",
    method: "post",
    data,
  });
}

/**
 * 删除单据（入仓，出仓，转仓）
 * @param {Object} data
 * @returns
 */
export function deleteOrder(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/delete",
    method: "post",
    data,
  });
}

/**
 * 根据单据类型获取业务类型（1-入仓；2-出仓；3-转仓）
 * @param {Object} data
 * @returns
 */
export function getTranTypeByBillType(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/gettrantype",
    method: "post",
    data,
  });
}

/* 入仓 */

/**
 * 获取入仓单
 * @param {Object} data
 * @returns
 */
export function getInbouneOrderList(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/queryin",
    method: "post",
    data,
  });
}

/**
 * 提交单据入仓
 * @param {Object} data
 * @returns
 */
export function submitInboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/submitin",
    method: "post",
    data,
  });
}

/**
 * 根据ID获取入仓单详情
 * @param {Object} data
 * @returns
 */
export function fetchInbouneDetailByID(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/getinbyid",
    method: "post",
    data,
  });
}

/**
 * 创建入仓单
 * @param {Object} data
 * @returns
 */
export function createInboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/createin",
    method: "post",
    data,
  });
}

/**
 * 编辑入仓单
 * @param {Object} data
 * @returns
 */
export function updateInboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/modifyin",
    method: "post",
    data,
  });
}

/* 出仓 */

/**
 * 创建出仓单
 * @param {Object} data
 * @returns
 */
export function createOutboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/createout",
    method: "post",
    data,
  });
}

/**
 * 查询出仓单
 * @param {Object} data
 * @returns
 */
export function getOutbouneOrderList(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/queryout",
    method: "post",
    data,
  });
}

/**
 * 提交单据出仓
 * @param {Object} data
 * @returns
 */
export function submitOutboune(data) {
  return http({
    url: "dsc/inventoryapi/stockbillapi/submitout",
    method: "post",
    data,
  });
}

/**
 * 根据ID获取出仓单详情
 * @param {Object} data
 * @returns
 */
export function fetchOutbouneDetailByID(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/getoutbyid",
    method: "post",
    data,
  });
}

/**
 * 编辑出仓单
 * @param {Object} data
 * @returns
 */
export function updateOutboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/modifyout",
    method: "post",
    data,
  });
}

/* 转仓 */

/**
 * 创建转仓单
 * @param {Object} data
 * @returns
 */
export function createTransferboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/createtransfer",
    method: "post",
    data,
  });
}

/**
 * 查询转仓单
 * @param {Object} data
 * @returns
 */
export function getTransferbouneOrderList(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/querytransfer",
    method: "post",
    data,
  });
}

/**
 * 提交单据转仓
 * @param {Object} data
 * @returns
 */
export function submitTransferboune(data) {
  return http({
    url: "dsc/inventoryapi/stockbillapi/submittransfer",
    method: "post",
    data,
  });
}

/**
 * 根据ID获取转仓单详情
 * @param {Object} data
 * @returns
 */
export function fetchTransferbouneDetailByID(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/gettransferbyid",
    method: "post",
    data,
  });
}

/**
 * 编辑转仓单
 * @param {Object} data
 * @returns
 */
export function updateTransferboune(data) {
  return http({
    url: "/dsc/inventoryapi/stockbillapi/modifytransfer",
    method: "post",
    data,
  });
}
