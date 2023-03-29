const routes = [
  {
    // 订单明细
    path: "/business/order-detail",
    name: "orderDetail",
    component: () => import("/@/views/business/order-detail/index.vue"),
    meta: {
      tabName: "订单明细",
      icon: "订单明细",
      ModuleCode: "OrderDetail",
    },
  },
  {
    // 支付管理
    path: "/business/payment-management",
    name: "paymentManagement",
    component: () => import("/@/views/business/payment-management/index.vue"),
  },
  {
    // 营业报表
    path: "/business/report",
    name: "report",
    component: () => import("/@/views/business/report/index.vue"),
    meta: {
      tabName: "营业报表",
      ModuleCode: "BusinessReport",
      icon: "营业报表",
    },
  },
];

export default routes;
