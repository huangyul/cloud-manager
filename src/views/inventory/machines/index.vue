<template>
  <MyTabs :data="tabList" type="normal" @click="onTabClick"></MyTabs>
  <div class="top-action">
    <!-- TODO 判断用户是否有新建权限 -->
    <button class="btn btn-blue flex flex-col-center" @click="openDialog">
      <el-icon class="mr6"><Plus /></el-icon>转仓
    </button>
  </div>
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
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="机位编号"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="游戏机编号"
        min-width="140"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="游戏机名称"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="180"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="商品编号"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="库存"
        min-width="100"
        align="right"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="仓库"
        min-width="120"
        sortable="custom"
        prop="bill_no"
      >
      </el-table-column>
      <el-table-column
        label="总金额（加权价）"
        min-width="170"
        sortable="custom"
        prop="bill_no"
        align="right"
      >
      </el-table-column>
      <el-table-column
        label="总金额（标准价）"
        min-width="170"
        sortable="custom"
        prop="bill_no"
        align="right"
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

  <MyDialog
    v-model:isDialogShow="isDialogShow"
    :dialogWidth="1200"
    title="转仓"
  >
    <TransferWarehouse></TransferWarehouse>
    <template #footer-right>
      <button class="btn btn-blue ml12" @click="onSubmit">保存</button>
    </template>
  </MyDialog>

  <!-- 分摊询问弹窗 -->
  <ConfirmDialog v-model:isShow="confirmDialogShow">
    <template #default>
      <div>
        <div class="confirm-black-text">
          是否要把礼品转到<span class="confirm-blue-text">此处显示仓库名称</span
          >？
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup>
import MyTabs from "/@/components/common/MyTabs.vue";
import MySearch from "/@/components/common/MySearch.vue";
import { ref } from "vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import TransferWarehouse from "./components/transfer-warehouse.vue";
import ConfirmDialog from "/@/components/common/ConfirmDialog.vue";

const currentTab = ref(1);
const tabList = ref([{ value: 1, label: "礼品机" }]);
const onTabClick = (value) => {
  currentTab.value = value;
};

const searchList = ref({
  leager_id: {
    type: "text",
    value: "",
    label: "机名称",
    placeholder: " ",
  },
  b: {
    type: "text",
    value: "",
    label: "游戏机编号",
    placeholder: " ",
  },
  c: {
    type: "text",
    value: "",
    label: "机位编号",
    placeholder: " ",
  },
  d: {
    type: "text",
    value: "",
    label: "商品名称",
    placeholder: " ",
  },
  e: {
    type: "text",
    value: "",
    label: "商品编号",
    placeholder: " ",
  },
  f: {
    type: "select",
    value: "",
    label: "门店",
    placeholder: "请选择或输入门店名称编号",
    filterable: true,
  },
  g: {
    type: "select",
    value: "",
    label: "仓库",
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
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

/* 弹窗 */
let isDialogShow = ref(true);
const openDialog = () => {
  isDialogShow.value = true;
};
const onSubmit = () => {
  confirmDialogShow.value = true;
};
let confirmDialogShow = ref(false);
</script>

<style lang="scss" scoped></style>
