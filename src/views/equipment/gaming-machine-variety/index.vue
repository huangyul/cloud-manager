<!-- 游戏机机种 -->

<template>
  <div class="top-action">
    <!-- TODO 判断用户是否有新建权限 -->
    <button class="btn btn-green flex flex-col-center" @click="openDialog">
      <el-icon class="mr6"><Plus /></el-icon>新增机种
    </button>
    <button class="btn btn-blue flex flex-col-center" @click="openDialog">
      批量上架
    </button>
    <button class="btn btn-blue flex flex-col-center" @click="openDialog">
      批量下架
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
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="机种名称"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="机种编号"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="控制模式"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="每局投币数"
        min-width="180"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="修改时间"
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
    label: "机种编号",
  },
  b: {
    type: "text",
    value: "",
    label: "机种名称",
    placeholder: " ",
  },
  c: {
    type: "select",
    value: "",
    label: "状态",
    placeholder: " ",
  },
  d: {
    type: "select",
    value: "",
    label: "控制模式",
    placeholder: " ",
  },
  f: {
    type: "select",
    value: "",
    label: "准入编号",
    placeholder: "请选择或输入门店名称编号",
    filterable: true,
  },
  g: {
    type: "select",
    value: "",
    label: "生产企业",
    placeholder: " ",
  },
  h: {
    type: "select-tag",
    value: "",
    label: "机种便签",
    width: 2,
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
