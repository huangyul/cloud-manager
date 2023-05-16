<!-- 创建活动页 -->
<script setup>
import List from "./components/List.vue";
import Edit from "./components/Edit.vue";
import { provide, ref } from "vue";

// 切换
let pageType = ref("edit"); // list | edit
const setList = () => {
  pageType.value = "list";
};
const setEdit = () => {
  pageType.value = "edit";
};
provide("created", {
  setEdit,
  setList,
});
</script>

<template>
  <List v-if="pageType == 'list'"></List>
  <Edit v-if="pageType == 'edit'" @go-back="setList"></Edit>
</template>
