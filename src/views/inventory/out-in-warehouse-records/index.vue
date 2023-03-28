<!-- 出入仓记录 -->
<template>
  <div class="p16">
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="options"
      dealTime="one"
      @search="getSearchCondition"
    >
      <template #func-more>
        <button class="btn-grey btn">导出</button>
      </template>
    </MySearch>
  </div>

  <div class="table pr16 pl16">
    <el-table
      :data="tableData"
      border
      @sort-change="sortChange"
      sum-text="合计"
      empty-text="暂无数据"
    >
      <el-table-column
        label="时间"
        prop="modify_time"
        min-width="170"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        min-width="170"
        label="商品名称"
        prop="mat_name"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="商品编号"
        prop="mat_code"
        min-width="120"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        min-width="180"
        label="仓库"
        prop="mat_type_id"
      ></el-table-column>
      <el-table-column
        label="变更摘要"
        prop="qty"
        sortable="custom"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="摘要信息"
        min-width="150"
        prop="px_paid"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        label="原数量"
        prop="px_paid_real"
        min-width="150"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        label="变更数量"
        prop="cost"
        min-width="180"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="变更后数量"
        prop="order_status"
        min-width="180"
        sortable="custom"
      >
      </el-table-column>

      <el-table-column label="入仓单价(不含税)" align="center">
        <el-table-column
          prop="name"
          label="变更单价"
          width="120"
          align="right"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更金额 "
          width="120"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更后金额 "
          width="120"
          align="right"
          sortable="custom"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="加权平均单价" align="center">
        <el-table-column
          prop="name"
          label="变更单价"
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更金额 "
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更后金额 "
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="标准成本单价" align="center">
        <el-table-column
          prop="name"
          label="变更单价"
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更金额 "
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="变更后金额 "
          width="120"
          sortable="custom"
          align="right"
        ></el-table-column>
      </el-table-column>

      <el-table-column
        label="单号"
        min-width="180"
        prop="device_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="业务日期"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="商品类型"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="操作终端"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="操作人"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="备注"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        label="门店"
        min-width="180"
        prop="create_user_name_no"
        sortable="custom"
      ></el-table-column>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/**
 * 搜索相关的
 */
const searchList = ref({
  a: {
    type: "text",
    value: "",
    label: "商品名称",
    placeholder: " ",
  },
  b: {
    type: "text",
    value: "",
    label: "商品编号",
    placeholder: " ",
  },
  c: {
    type: "select",
    value: "",
    label: "变更摘要",
    placeholder: "请选择或输入门店名称编号",
  },
  d: {
    type: "select",
    value: "",
    label: "门店",
    placeholder: " ",
    filterable: true,
  },
  e: {
    type: "select",
    value: "",
    label: "仓库",
    placeholder: " ",
  },
  f: {
    type: "daterange",
    value: "",
    label: "时间",
    placeholder: " ",
  },
  g: {
    type: "select",
    value: "",
    label: "商品类型",
    placeholder: " ",
  },
  h: {
    type: "select",
    value: "",
    label: "操作终端",
    placeholder: " ",
  },
  i: {
    type: "select",
    value: "",
    label: "操作员",
    placeholder: " ",
  },
});
const options = ref({
  // 变更摘要
  c: [
    { value: "", label: "全部" },
    { value: 1, label: "入仓" },
    { value: 2, label: "采购入仓" },
    { value: 3, label: "转仓转入" },
    { value: 4, label: "调拨入仓" },
    { value: 5, label: "盘盈盘亏" },
    { value: 6, label: "回收入仓" },
    { value: 7, label: "出仓" },
    { value: 8, label: "礼品机出仓" },
    { value: 9, label: "销售出仓" },
    { value: 10, label: "兑换出仓" },
    { value: 11, label: "转仓转出" },
    { value: 12, label: "调拨出仓" },
    { value: 13, label: "损耗出仓" },
  ],
  // 门店
});
const getSearchCondition = () => {};

/**
 * 表格相关
 */
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
const sortChange = ({ column, prop, order }) => {
  if (prop) {
    // TODO
    // order = order == 'ascending' ? 1 : 0
    // doSearch(prop, order)
  }
};

onMounted(() => {
  // 如果是分店，搜索栏没有门店这一项
  if (route.query?.OrgType == 0) {
    // TODO delete searchList.value.xxx
  }
});
</script>
