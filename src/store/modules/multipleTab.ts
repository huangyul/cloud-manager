import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

interface TabState {
  tabList: RouteLocationNormalized[];
}

export const useMultipleTabStore = defineStore({
  id: "app-multiple-tab",
  state: (): TabState => {
    return {
      tabList: [],
    };
  },
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
  },
  actions: {},
});
