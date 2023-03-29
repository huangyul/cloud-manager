<!-- 超码表记录 -->
<template>
  <div class="page">
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      dealTime="one"
      @search="getSearchCondition"
    ></MySearch>

    <div class="table">
      <!-- 明细表格 -->
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="抄表日期"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="机位编号"
          prop="modify_time"
          min-width="170"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="200"
          label="游戏机名称"
          prop="leag_name_no"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          min-width="170"
          label="游戏机编号"
          prop="mat_name"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="投币码表读数"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="投币计数"
          prop="pay_types"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              投币计数
              <el-tooltip
                content="投币计数说明：上次抄表至本次抄表期间投币总数"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="礼品码表A读数"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="礼品码表A计数"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              礼品码表A计数
              <el-tooltip
                content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="礼品码表B读数"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="礼品码表B计数"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              礼品码表B计数
              <el-tooltip
                content="礼品码表计数说明：上次抄表至本次抄表期间礼品掉落总数"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="抄表人"></el-table-column>
        <el-table-column
          label="门店"
          min-width="180"
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
import { ref } from "vue";
import MySearch from "/@/components/common/MySearch.vue";

const searchList = ref({
  leager_id: {
    type: "daterange",
    value: "",
    label: "抄表日期",
  },
  b: {
    type: "text",
    value: "",
    label: "机位编号",
  },
  c: {
    type: "text",
    value: "",
    label: "游戏机名称",
  },
  d: {
    type: "text",
    value: "",
    label: "游戏机编号",
  },
  e: {
    type: "select",
    value: "",
    label: "操作员",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  // 订单状态 正常、异常、已退单
  order_status: [
    { value: "", label: "全部" },
    { value: 0, label: "未完成" },
    { value: 1, label: "已完成" },
  ],
  leag_status: [
    { value: "", label: "全部" },
    { value: 1, label: "正常" },
    { value: 2, label: "销户" },
  ],
  pay_type: [
    { value: null, label: "全部" },
    { value: 1, label: "现金" },
    { value: 2, label: "扫码" },
    { value: 11, label: "积分" },
    { value: 16, label: "微官网支付" },
  ],
});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
  // doSearch()
};

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
</script>

<style></style>
