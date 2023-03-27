const demo = [
  {
    path: "demo-a",
    name: "demoA",
    component: () => import("/@/views/demo/page-a/index.vue"),
  },
  {
    path: "demo-b",
    name: "demoB",
    component: () => import("/@/views/demo/page-b/index.vue"),
  },
  {
    path: "demo-c",
    name: "demoC",
    component: () => import("/@/views/demo/page-c/index.vue"),
  },
  {
    path: "demo-d",
    name: "demoD",
    component: () => import("/@/views/demo/page-d/index.vue"),
  },
];

export default demo;
