import { defineStore } from "pinia";

const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      // 用户信息
      user: {},
      // 组织列表
      orgList: [],
    };
  },
});

export default useUserStore;
