/* 仓库管理api */
import instance from "/@/utils/request";

// 获取仓库列表
export function getWarehouseList(data) {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/query",
    method: "post",
    data,
  });
}

// 获取仓库编号，新建仓库时自动获取编号
export function fetchWarehouseCode() {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/getautocode",
    method: "post",
  });
}

// 新建仓库
export function createWarehouse(data) {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/createnew",
    method: "post",
    data,
  });
}

// 修改仓库
export function updateWarehouse(data) {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/updatedata",
    method: "post",
    data,
  });
}

// 获取仓库详情
export function getWarehouseDetailById(data) {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/getbyid",
    method: "post",
    data,
  });
}

// 删除仓库
export function deleteWarehouse(data) {
  return instance({
    url: "/dsc/inventoryapi/warehouseapi/delete",
    method: "post",
    data,
  });
}
