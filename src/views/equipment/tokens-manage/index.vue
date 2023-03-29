<!-- 代币管理表 -->
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

    <div class="table">
      <el-table :data="tableData" border show-summary>
        <el-table-column label="抄表日期"></el-table-column>
        <el-table-column label="机位编号"></el-table-column>
        <el-table-column label="游戏机编号"></el-table-column>
        <el-table-column label="游戏机名称"></el-table-column>
        <el-table-column label="清币数"></el-table-column>
        <el-table-column label="码表币数"></el-table-column>
        <el-table-column label="差异数">
          <template #header>
            <div style="display: inline-flex; align-items: center">
              差异数
              <el-tooltip content="差异数=码表币数-清币数" placement="top">
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
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
    label: "抄表日期",
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
