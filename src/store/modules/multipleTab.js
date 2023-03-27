import { defineStore } from "pinia";

export const useMultipleTabStore = defineStore({
  id: "app-multiple-tab",
  state: () => {
    return {
      tabList: [],
    };
  },
  getters: {
    getTabList() {
      return this.tabList;
    },
  },
  actions: {},
});
