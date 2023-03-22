import { RouteRecordRaw } from "vue-router";
const dashboard: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "dashboard",
    component: () => import("/@/views/dashboard/index.vue"),
  },
];
export default dashboard;
