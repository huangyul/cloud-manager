import { AppRouteRecordRaw } from "../../types";
import Layout from "/@/layout/index.vue";

const dashboard: AppRouteRecordRaw = {
  path: "/22",
  name: "home",
  component: Layout,
  children: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("/@/views/dashboard/index.vue"),
    },
  ],
};

export default dashboard;
