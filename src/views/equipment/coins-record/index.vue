<!-- 加币清币记录 -->
<template>
  <div class="p16">
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

    <MyTabs :data="tabList" @click="onTabClick"></MyTabs>

    <div class="table mt16">
      <!-- 加币表格 -->
      <el-table
        :data="tableData"
        v-show="currentTab == 1"
        border
        @sort-change="sortChange"
        sum-text="合计"
        :show-summary="true"
        empty-text="暂无数据"
      >
        <el-table-column
          label="操作时间"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="设备名称"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="设备编号"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="加币前数量"
          min-width="150"
          sortable="custom"
          align="right"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="加币数量"
          min-width="120"
          sortable="custom"
          align="right"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="加币后数量"
          min-width="150"
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
          label="备注"
          min-width="170"
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

      <!-- 清币表格 -->
      <el-table
        v-show="currentTab == 2"
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        :show-summary="true"
        empty-text="暂无数据"
      >
        <el-table-column
          label="操作时间"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="设备名称"
          min-width="140"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="设备编号"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="应有数量"
          min-width="180"
          sortable="custom"
          align="right"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="清币数量"
          min-width="120"
          sortable="custom"
          align="right"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="误差数量"
          min-width="100"
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
          label="备注"
          min-width="170"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import MySearch from "/@/components/common/MySearch.vue";
import MyTabs from "/@/components/common/MyTabs.vue";

const searchList = ref({
  leager_id: {
    type: "text",
    value: "",
    label: "设备名称",
    placeholder: " ",
  },
  b: {
    type: "text",
    value: "",
    label: "设备编号",
    placeholder: " ",
  },
  c: {
    type: "daterange",
    value: "",
    label: "操作时间",
    placeholder: " ",
  },
  d: {
    type: "select",
    value: "",
    label: "门店",
    placeholder: " ",
  },
  e: {
    type: "select",
    value: "",
    label: "操作员",
    placeholder: " ",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({});
// 获取搜索条件
const getSearchCondition = (value) => {};

/**
 * tab组件
 */
const tabList = ref([
  { value: 1, label: "加币" },
  { value: 2, label: "清币" },
]);
const currentTab = ref(1);
const onTabClick = (value) => {
  currentTab.value = value;
};

// 表格数据
let tableData = ref([{ id: 1 }]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
</script>

<style lang="scss" scoped></style>
