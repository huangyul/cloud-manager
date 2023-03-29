/**
 * 设备模块路由
 */

const routes = [
  {
    // 游戏机机种
    path: "/equipment/gaming-machine-variety",
    name: "gameMachineVariety",
    component: () =>
      import("/@/views/equipment/gaming-machine-variety/index.vue"),
    meta: {
      tabName: "游戏机机种",
      icon: "游戏机机种",
      ModuleCode: "mnuGameTypeManagement",
    },
  },
  {
    // 新增游戏机机种
    path: "/equipment/create-gaming-machine-variety",
    name: "createGameMachineVariety",
    component: () =>
      import("/@/views/equipment/gaming-machine-variety/create.vue"),
  },
  {
    // 加币清币记录
    path: "/equipment/coins-record",
    name: "coinsRecord",
    component: () => import("/@/views/equipment/coins-record/index.vue"),
  },
  {
    // 游戏机清币记录
    path: "/equipment/gaming-machine-records",
    name: "gamingMachineRecords",
    component: () =>
      import("/@/views/equipment/gaming-machine-records/index.vue"),
  },
  {
    // 实物币流失率
    path: "/equipment/physical-coin-churn-rate",
    name: "physicalCoinChurnRate",
    component: () =>
      import("/@/views/equipment/physical-coin-churn-rate/index.vue"),
  },
  {
    // 实物币进出记录
    path: "/equipment/physical-coin-records",
    name: "physicalCoinRecords",
    component: () =>
      import("/@/views/equipment/physical-coin-inout-records/index.vue"),
  },
  {
    // 抄码表记录
    path: "/equipment/code-reading-table",
    name: "codeReadingTable",
    component: () => import("/@/views/equipment/code-reading-table/index.vue"),
  },
  {
    // 机台营收出奖核算
    path: "/equipment/award-accounting",
    name: "awardAccounting",
    component: () => import("/@/views/equipment/award-accounting/index.vue"),
  },
  {
    // 机台代币管理
    path: "/equipment/tokens-manage",
    name: "tokensManage",
    component: () => import("/@/views/equipment/tokens-manage/index.vue"),
  },
  {
    // 礼品管理
    path: "/equipment/gifts-manage",
    name: "giftsManage",
    component: () => import("/@/views/equipment/gifts-manage/index.vue"),
  },
  {
    // 全场营收出奖分析
    path: "/equipment/total-revenue-award-analysis",
    name: "totalRevenueAwawrAnalysis",
    component: () =>
      import("/@/views/equipment/total-revenue-award-analysis/index.vue"),
  },
  {
    // 机台营收出奖分析
    path: "/equipment/machines-revenue-award-analysis",
    name: "machinesRevenusAwardAnalysis",
    component: () =>
      import("/@/views/equipment/machines-revenue-award-analysis/index.vue"),
  },
];

export default routes;
