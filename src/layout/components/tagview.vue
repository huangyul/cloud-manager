<!-- tagview -->
<template>
  <ul>
    <li :class="[{ active: route.path == '/dashboard' }]" @click="toIndex()">
      <span>首页</span>
    </li>
    <li
      v-for="item in tabList"
      :key="item.name"
      @click="toPage(item)"
      :class="[{ active: route.path == item.path }]"
    >
      <span> {{ item.name }}</span>

      <el-icon
        class="close"
        v-if="route.path != item.path"
        @click.stop="handleCloseTab(item)"
        ><Close
      /></el-icon>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  RouteLocationNormalizedLoaded,
  RouteRecordName,
  useRoute,
  useRouter,
} from "vue-router";
import { useMultipleTabStore } from "/@/store/modules/multipleTab";
const route = useRoute();
const router = useRouter();
const tabStore = useMultipleTabStore();
const tabList = computed(() => {
  return tabStore.tabList;
});

const toPage = (item: RouteLocationNormalizedLoaded) => {
  if (item.path == route.path) {
    return;
  } else {
    router.push({ name: item.name as RouteRecordName | undefined });
  }
};

const toIndex = () => {
  router.push({ name: "root" });
};

const handleCloseTab = (item: RouteLocationNormalizedLoaded) => {
  tabStore.tabList.splice(
    tabList.value.findIndex((tab) => tab.name === item.name),
    1
  );
};
</script>

<style lang="scss" scoped>
ul {
  height: 40px;
  display: flex;
  align-items: flex-end;
  li:not(:last-child) {
    margin-right: 2px;
  }
  li {
    min-width: 72px;
    width: auto;
    padding: 0 12px;
    height: 32px;
    background: rgba($color: #000000, $alpha: 0.1);
    border-radius: 6px 6px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    span {
      line-height: 32px;
      font-size: 14px;
      font-family: Microsoft YaHei;
    }
    .close {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      margin-left: 8px;
      // &:hover {
      //   background: rgba($color: #ffffff, $alpha: 0.3);
      // }
    }
  }
  .active {
    background: rgba($color: #000000, $alpha: 0.25);
    color: #ffe400;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold !important;
  }
}
</style>
