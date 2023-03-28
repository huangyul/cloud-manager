<!-- 库存查询 -->
<template>
  <div class="p16">
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      dealTime="one"
      @search="getSearchCondition"
    >
      <template #func-more>
        <button class="btn-grey btn">导出</button>
      </template>
    </MySearch>

    <!-- 标签 -->
    <MyTabs :data="tabsData" class="mb10" @click="onTagsClick"></MyTabs>

    <div class="table">
      <!-- 明细表格 -->
      <el-table
        v-if="currentTab == 1"
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="仓库"
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
          label="商品类型"
          prop="mat_type_id"
        ></el-table-column>
        <el-table-column
          label="数量"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="加权平均单价"
          min-width="150"
          prop="px_paid"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="标准成本单价"
          prop="px_paid_real"
          min-width="150"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="总金额（加权价）"
          prop="cost"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="总金额（标准价）"
          prop="order_status"
          min-width="180"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="单位"
          min-width="180"
          prop="device_name_no"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="门店"
          min-width="180"
          prop="create_user_name_no"
          sortable="custom"
        ></el-table-column>
      </el-table>

      <!-- 按商品汇总表格 -->
      <el-table
        v-if="currentTab == 2"
        :data="tableData"
        @sort-change="sortChange"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="商品名称"
          prop="mat_name"
          min-width="170"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="商品编号"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column label="商品类型" prop="mat_type_id"></el-table-column>
        <el-table-column
          label="数量"
          min-width="120"
          prop="qty_real"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="平均加权单价"
          min-width="150"
          sortable="custom"
          prop="cost"
        ></el-table-column>
        <el-table-column
          label="标准成本单价"
          min-width="150"
          sortable="custom"
          prop="cost"
        ></el-table-column>
        <el-table-column
          label="总金额（加权价）"
          min-width="160"
          sortable="custom"
          prop="cost"
        ></el-table-column>
        <el-table-column
          label="总金额（标准价）"
          min-width="160"
          prop="px_paid"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="单位"
          sortable="custom"
          prop="store_name_no"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="门店"
          min-width="170"
          prop="store_name_no"
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
  </div>
</template>

<script setup>
import MySearch from "/@/components/common/MySearch.vue";
import { ref } from "vue";
import MyTabs from "/@/components/common/MyTabs.vue";
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
    label: "门店",
    placeholder: "请选择或输入门店名称编号",
  },
  d: {
    type: "select",
    value: "",
    label: "仓库",
    placeholder: " ",
  },
  e: {
    type: "select",
    value: "",
    label: "商品类型",
    placeholder: " ",
  },
  f: {
    type: "range",
    value: "",
    label: "数量",
    placeholder: " ",
  },
});
const getSearchCondition = () => {};

// 表格数据
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

// 标签
const tabsData = ref([
  { label: "明细", value: 1 },
  { label: "按商品汇总", value: 2 },
]);
const currentTab = ref(1);
// 标签被点击
const onTagsClick = (value) => {
  currentTab.value = value;
  currentPage.value = 1;
  pageSize.value = 10;
  doSearch();
};
</script>

<style lang="scss" scoped></style>
