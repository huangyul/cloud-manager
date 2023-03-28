<!-- 库存管理 -->
<template>
  <div>
    <MyTabs :data="tabList" type="normal" @click="onTabClick"></MyTabs>
    <Transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </Transition>
  </div>
</template>

<script setup>
import MyTabs from "/@/components/common/MyTabs.vue";
import { ref, shallowRef } from "vue";
import Inboune from "./components/inboune/index.vue";
import Outboune from "./components/outboune/index.vue";
import Transferboune from "./components/transferboune/index.vue";
// 当前选中的tab
const currentTab = ref(1);
const currentComponent = shallowRef(null);
currentComponent.value = Transferboune;
const tabList = ref([
  {
    value: 1,
    label: "入仓",
  },
  {
    value: 2,
    label: "出仓",
  },
  {
    value: 3,
    label: "转仓",
  },
]);
const onTabClick = (value) => {
  currentTab.value = value;
  switch (value) {
    case 1: {
      currentComponent.value = Inboune;
      break;
    }
    case 2: {
      currentComponent.value = Outboune;
      break;
    }
    case 3: {
      currentComponent.value = Transferboune;
      break;
    }
  }
};
</script>

<style lang="scss" scoped></style>
