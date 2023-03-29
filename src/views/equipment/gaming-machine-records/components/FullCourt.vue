<!-- 按机位清币 -->

<template>
  <div>
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      @search="getSearchCondition"
      class="mt8"
    >
      <template #func-more>
        <button class="btn btn-grey">导出</button>
      </template>
    </MySearch>

    <div class="table m16">
      <!-- 明细表格 -->
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        :show-summary="true"
        empty-text="暂无数据"
      >
        <el-table-column
          label="清币时间"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="清币数"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="码表币数"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="差异数"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="备注"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="营业时间"
          min-width="120"
          align="right"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="操作员"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="门店"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
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
    label: "清币时间",
    placeholder: " ",
  },
  b: {
    type: "text",
    value: "",
    label: "操作员",
    placeholder: " ",
  },
  e: {
    type: "radio",
    value: "",
    label: "误差数",
    placeholder: " ",
  },
  f: {
    type: "select",
    value: "",
    label: "营业时间",
  },
  h: {
    type: "select",
    value: "",
    label: "门店",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  // 误差数
  e: [
    { label: "不为零", value: 1 },
    { label: "为零", value: 2 },
    { label: "全部", value: 3 },
  ],
});
// 获取搜索条件
const getSearchCondition = (value) => {};

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
</script>

<style></style>
