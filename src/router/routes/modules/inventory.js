const inventory = [
  {
    // 库存管理-仓库管理列表
    path: "/inventory/warehouse",
    name: "warehouse",
    component: () => import("/@/views/inventory/warehouse/index.vue"),
    meta: {
      ModuleCode: "InventoryMgn",
      icon: "库存管理",
      tagName: "库存管理",
    },
  },
  {
    // 库存管理
    path: "/inventory",
    name: "inventory",
    component: () =>
      import("/@/views/inventory/inventory-management/index.vue"),
    meta: {
      ModuleCode: "InventoryMgn",
      icon: "库存管理",
      tagName: "库存管理",
    },
  },
  // {
  //   // 库存查询
  //   path: '/inventory/inventory-inquiry',
  //   name: 'inventoryInquiry',
  //   component: () => import('/@/views/inventory/inventory-inquiry/index.vue'),
  // },
  // {
  //   // 出入仓记录
  //   path: '/inventory/out-in-warehouse-records',
  //   name: 'outInWarehouseRecords',
  //   component: () =>
  //     import('/@/views/inventory/out-in-warehouse-records/index.vue'),
  // },
  // {
  //   // 机台库存查询
  //   path: '/inventory/machines',
  //   name: 'inventoryMachines',
  //   component: () => import('/@/views/inventory/machines/index.vue'),
  // },
];

export default inventory;
