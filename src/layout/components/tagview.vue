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
      <span> {{ item.meta.tabName ?? item.name }}</span>

      <el-icon
        class="close"
        :class="{ 'close-active': route.path == item.path }"
        @click.stop="handleCloseTab(item)"
        ><Close
      /></el-icon>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMultipleTabStore } from "/@/store/modules/multipleTab";
const route = useRoute();
const router = useRouter();
const tabStore = useMultipleTabStore();
const tabList = computed(() => {
  return tabStore.tabList;
});

const toPage = (item) => {
  if (item.path == route.path) {
    return;
  } else {
    router.push({ name: item.name });
  }
};

const toIndex = () => {
  router.push({ name: "root" });
};

const handleCloseTab = (item) => {
  let index = 0;
  tabStore.tabList.splice(
    (index = tabList.value.findIndex((tab) => tab.name === item.name)),
    1
  );
  // 如果是关掉当前的页面
  if (item.path == route.path) {
    console.log(index, tabStore.tabList);
    if (tabStore.tabList.length === 0) {
      router.replace("/");
    } else if (index + 1 >= tabStore.tabList.length) {
      router.replace(tabStore.tabList[index - 1 >= 0 ? index - 1 : 0].path);
    } else {
      router.replace(tabStore.tabList[index].path);
    }
  }
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
      border-radius: 50%;
      margin-left: 8px;
      width: 16px;
      height: 16px;
      font-size: 14px;

      // &:hover {
      //   background: rgba($color: #ffffff, $alpha: 0.3);
      // }
    }
    .close-active {
      color: #ffffff;
      background: #6d95c9;
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
