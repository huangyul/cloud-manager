<template>
  <MyTabs :data="tabList" type="normal" @click="onTabClick"></MyTabs>
  <Transition name="fade" mode="out-in">
    <KeepAlive>
      <component :is="componentMap[currentTab]"></component>
    </KeepAlive>
  </Transition>
</template>

<script setup>
import MyTabs from "/@/components/common/MyTabs.vue";
import { ref } from "vue";
import Location from "./components/Location.vue";
import FullCourt from "./components/FullCourt.vue";

const currentTab = ref(1);
const tabList = ref([
  { value: 1, label: "按机位清币" },
  { value: 2, label: "按全场清币" },
]);
const onTabClick = (value) => {
  currentTab.value = value;
};
const componentMap = {
  1: Location,
  2: FullCourt,
};
</script>

<style lang="scss" scoped></style>
