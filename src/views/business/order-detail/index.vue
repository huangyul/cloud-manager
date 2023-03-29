<!-- 订单明细 -->
<template>
  <div>
    <MyTabs :data="tabList" type="normal" @click="onTabClick"></MyTabs>
    <div class="page">
      <RecoveryOrder v-if="currentTab == 3"></RecoveryOrder>
      <ExchangeOrder v-if="currentTab == 2"></ExchangeOrder>
      <SalesOrder v-if="currentTab == 1"></SalesOrder>
    </div>
  </div>
</template>

<script setup>
import MyTabs from "/@/components/common/MyTabs.vue";
import RecoveryOrder from "./components/recovery-order.vue";
import ExchangeOrder from "./components/exchange-order.vue";
import SalesOrder from "./components/sales-order.vue";
import { ref } from "vue";

// 当前选中的tab
const currentTab = ref(1);
const tabList = ref([
  {
    value: 1,
    label: "销售订单",
  },
  {
    value: 2,
    label: "兑换订单",
  },
  {
    value: 3,
    label: "回收订单",
  },
]);
const onTabClick = (value) => {
  currentTab.value = value;
};
</script>

<style></style>
