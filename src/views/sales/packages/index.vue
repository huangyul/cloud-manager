<!-- 套餐销售列表 -->
<template>
  <div class="top-action">
    <!-- TODO 判断用户是否有新建权限 -->
    <button class="btn btn-green flex flex-col-center" @click="openDialog">
      <el-icon class="mr6"><Plus /></el-icon>创建活动
    </button>
  </div>

  <MySearch
    :searchList="searchList"
    :options="searchOptions"
    @search="getSearchCondition"
    class="mt8"
  >
  </MySearch>

  <div class="table m16">
    <!-- 明细表格 -->
    <el-table
      :data="tableData"
      border
      @sort-change="sortChange"
      sum-text="合计"
      empty-text="暂无数据"
    >
      <el-table-column
        label="活动名称"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="活动编号"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="方案类型"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="价格"
        min-width="180"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="活动打折"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="活动日期"
        min-width="100"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="100"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <div class="page">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        small="small"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="doSearch()"
        @current-change="doSearch()"
      />
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
    label: "活动名称",
  },
  b: {
    type: "text",
    value: "",
    label: "活动编号",
    placeholder: " ",
  },
  c: {
    type: "select",
    value: "",
    label: "时间",
    placeholder: " ",
  },
  d: {
    type: "select",
    value: "",
    label: "状态",
    placeholder: " ",
  },
  f: {
    type: "select",
    value: "",
    label: "方案类型",
    placeholder: "请选择或输入门店名称编号",
    filterable: true,
  },
  g: {
    type: "select-tag",
    width: 2,
    value: "",
    label: "标签",
    placeholder: " ",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({});
// 获取搜索条件
const getSearchCondition = (value) => {};

// 表格数据
let tableData = ref([{ id: 1 }]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
</script>

<script lang="scss" scoped></script>
