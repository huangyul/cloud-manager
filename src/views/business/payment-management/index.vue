<!-- 支付管理 -->
<template>
  <div class="page">
    <!-- 提示文案 -->
    <div class="tip mb10">
      <el-icon><Warning /></el-icon>如需开通其它支付方式，请联系我司
    </div>
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      class="mb16"
      :options="options"
    ></MySearch>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border empty-text="暂无数据">
        <el-table-column label="名称" prop="sort_name"></el-table-column>
        <el-table-column label="编号" prop="sort_name"></el-table-column>
        <el-table-column label="支付方式" prop="leager_count"></el-table-column>
        <el-table-column label="是否实点" prop="sort_name"></el-table-column>
        <el-table-column label="是否启用" prop="leager_count"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import MySearch from "/@/components/common/MySearch.vue";
import { ref } from "vue";

const searchList = ref({
  name: {
    type: "text",
    value: "",
    label: "名称",
  },
  paymentType: {
    type: "select",
    value: "",
    label: "支付方式",
  },
  isPoint: {
    type: "select",
    value: "",
    label: "是否实点",
  },
  isUse: {
    type: "select",
    value: "",
    label: "是否启用",
  },
});
const options = {
  paymentType: [
    { value: 0, label: "全部" },
    { value: 1, label: "现金" },
    { value: 2, label: "支付宝支付" },
  ],
  isPoint: [
    { value: 0, label: "全部" },
    { value: 1, label: "是" },
    { value: 2, label: "否" },
  ],
  isUse: [
    { value: 0, label: "全部" },
    { value: 1, label: "是" },
    { value: 2, label: "否" },
  ],
};

let tableData = ref([]);
</script>

<style lang="scss" scoped>
.tip {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #5e6166;
  display: flex;
  align-items: center;
  .svg {
    width: 16px;
    height: 16px;
  }
}
</style>
