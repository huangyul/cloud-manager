const member = [
  {
    // 会员档案列表
    path: "/member/member-archives",
    name: "memberArchives",
    component: () => import("/@/views/member/archives/index.vue"),
    meta: {
      tabName: "会员档案查询",
      ModuleCode: "MemberProfileQuery",
      icon: "会员档案",
    },
  },
  {
    // 兑换排行
    path: "/member/exchange-rank",
    name: "exchangeRank",
    component: () => import("/@/views/member/exchange-rank/index.vue"),
    meta: {
      tabName: "兑换排行",
      ModuleCode: "ExchangeRank",
      icon: "兑换记录",
    },
  },
  {
    // 回收排行
    path: "/member/recovery-rank",
    name: "recoveryRank",
    component: () => import("/@/views/member/recovery-rank/index.vue"),
    meta: {
      tabName: "回收排行",
      ModuleCode: "RecoveryRank",
      icon: "回收记录",
    },
  },
];

export default member;
