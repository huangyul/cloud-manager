import { defineStore } from "pinia";

export const usePermissionStore = defineStore({
  id: "permisson",
  state: () => {
    return {
      // 用户侧边菜单
      menuList: [],
    };
  },
  getters: {},
  actions: {},
});
