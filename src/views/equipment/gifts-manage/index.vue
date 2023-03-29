<!-- 礼品管理表 -->
<template>
  <div class="page">
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      @search="getSearchCondition"
    >
      <template #func-more>
        <button class="btn btn-grey">导出</button>
      </template>
    </MySearch>

    <div class="table" style="position: relative">
      <p class="table-top-tips">
        <img
          src="@/assets/image/common/notice.png"
        />若盘点和抄码表日期不一致则报表会有误差
      </p>
      <el-table :data="tableData" border show-summary>
        <el-table-column label="机台礼品盘点日期"></el-table-column>
        <el-table-column label="机位编号"></el-table-column>
        <el-table-column label="游戏机编号"></el-table-column>
        <el-table-column label="游戏机名称"></el-table-column>
        <el-table-column label="应有数量" align="right"></el-table-column>
        <el-table-column label="盘点数量" align="right"></el-table-column>
        <el-table-column label="实出数量" align="right"> </el-table-column>
        <el-table-column label="抄表日期"> </el-table-column>
        <el-table-column label="礼品码表数" align="right"> </el-table-column>
        <el-table-column label="差异数" align="right"> </el-table-column>
        <el-table-column label="门店"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import MySearch from "/@/components/common/MySearch.vue";
import { ref } from "vue";
const searchList = ref({
  leager_id: {
    type: "text",
    value: "",
    label: "盘点日期",
  },
  b: {
    type: "daterange",
    value: "",
    label: "机位编号",
  },
  c: {
    type: "select",
    value: "",
    label: "游戏机编号",
  },
  d: {
    type: "text",
    value: "",
    label: "游戏机名称",
  },
  e: {
    type: "text",
    value: "",
    label: "游戏机标签",
  },
});
</script>

<style lang="scss" scoped></style>
