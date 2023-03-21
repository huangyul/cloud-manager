import { AppRouteRecordRaw } from "../types";
import Layout from "/@/layout/index.vue";
const modules = import.meta.glob("./modules/**/*.ts", {
  eager: true,
  import: "default",
});

const routeList: AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeList.push(modList);
});

const basicRoute: AppRouteRecordRaw = {
  path: "/",
  component: Layout,
};

export const routes = [basicRoute, routeList];
