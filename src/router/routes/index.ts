import { RouteRecordRaw } from "vue-router";
import Layout from "/@/layout/index.vue";

// 直接引入所有modules中的路由
const modules = import.meta.glob("./modules/**/*.ts", {
  eager: true,
  import: "default",
});

const routeList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {};
  routeList.push(mod as RouteRecordRaw);
});

const basicRoute: RouteRecordRaw = {
  path: "/",
  name: "root",
  component: Layout,
  redirect: "/dashboard",
  children: [],
};

const loginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login",
  component: () => import("/@/views/login/index.vue"),
};

basicRoute.children = routeList.flat(2);

console.log(basicRoute);

export const routes = [basicRoute, loginRoute];
