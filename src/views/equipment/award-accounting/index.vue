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

    <div class="table" style="position: relative">
      <p class="table-top-tips">
        <img
          src="@/assets/image/common/notice.png"
        />若盘点和抄码表截止时间不一致则报表会有误差
      </p>
      <!-- 明细表格 -->
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="机台礼品盘点日期"
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
          label="游戏机编号"
          prop="leag_name_no"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          min-width="170"
          label="游戏机名称"
          prop="mat_name"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="实收币数"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              实收币数
              <el-tooltip
                content="实收币数=游戏机清币记录》按机位清币的清币数"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="收币价值"
          prop="pay_types"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              收币价值
              <el-tooltip
                content="收币价值=实收币数 * 标准币单价"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="实出礼品数"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="出礼品价值"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              出礼品价值
              <el-tooltip
                content="出礼品价值=出礼品数 * 礼品档案的加权平均单价"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="出礼品币数"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              出礼品币数
              <el-tooltip
                content="出礼品币数=实收币数 / 实出礼品数"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="返还率"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              返还率
              <el-tooltip
                content="返还率=出礼品价值 / 收币价值"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
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
    label: "盘点日期",
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
  g: { type: "", value: "", label: "游戏机标签" },
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

<style scoped lang="scss"></style>
