const sales = [
  {
    path: "/sales/packages",
    name: "salesPackages",
    component: () => import("/@/views/sales/packages/index.vue"),
    meta: {
      ModuleCode: "FrmPromotionData0",
      icon: "套餐销售",
      tabName: "套餐销售",
    },
  },
  {
    // 创建活动
    path: "/sales/create-activity",
    name: "createActivity",
    component: () => import("/@/views/sales/create-activity/index.vue"),
    meta: {
      tabName: "创建活动",
    },
  },
];

export default sales;
