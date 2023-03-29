<!-- 实物币进出口记录 -->
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

    <MyTabs :data="tabList" @click="onTabClick" class="mb10"></MyTabs>

    <!-- 表格 -->
    <div class="table">
      <!-- 明细表 -->
      <el-table
        :data="tableData"
        v-show="currentTab == 1"
        border
        show-summary
        @sort-change="onSortChange"
        :summary-method="getSummaries"
      >
        <el-table-column label="时间"></el-table-column>
        <el-table-column label="终端"></el-table-column>
        <el-table-column label="变更前数量"></el-table-column>
        <el-table-column label="变更数量"></el-table-column>
        <el-table-column label="变更后数量"></el-table-column>
        <el-table-column label="变更摘要"> </el-table-column>
        <el-table-column label="摘要信息"> </el-table-column>
        <el-table-column label="操作员"> </el-table-column>
        <el-table-column label="备注"> </el-table-column>
        <el-table-column label="门店"></el-table-column>
      </el-table>

      <!-- 按月汇总 -->
      <el-table
        :data="tableData"
        v-show="currentTab == 2"
        border
        show-summary
        @sort-change="onSortChange"
        :summary-method="getSummaries"
      >
        <el-table-column label="日期"></el-table-column>
        <el-table-column label="设备名称"></el-table-column>
        <el-table-column label="设备编号"></el-table-column>
        <el-table-column label="期初数量"></el-table-column>
        <el-table-column label="加币数量"></el-table-column>
        <el-table-column label="售币数量"> </el-table-column>
        <el-table-column label="提币数量"> </el-table-column>
        <el-table-column label="存币数量"> </el-table-column>
        <el-table-column sortable>
          <template #header>
            <div style="display: inline-flex; align-items: center">
              变更数量小计
              <el-tooltip
                content="变更数量小计=加币数量-售币数量-提币数量+存币数量"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable>
          <template #header>
            <div style="display: inline-flex; align-items: center">
              差异率(%)
              <el-tooltip
                content="差异率=差异数量 /应有结余 *100%"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable>
          <template #header>
            <div style="display: inline-flex; align-items: center">
              差异数量
              <el-tooltip content="差异数量=应有结余-清币数量" placement="top">
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="门店"></el-table-column>
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
import { getRecoveryData } from "/@/api/member";
import { openMemberDetail, timeSlotChange } from "/@/utils/helper";
import { ref, onMounted } from "vue";
import MyTabs from "/@/components/common/MyTabs.vue";

const searchList = ref({
  leager_id: {
    type: "text",
    value: "",
    label: "终端",
  },
  b: {
    type: "daterange",
    value: "",
    label: "时间",
  },
  c: {
    type: "select",
    value: "",
    label: "摘要",
  },
});
let searchCondition = ref({});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
  doSearch();
};

// 当前选中的tab
const currentTab = ref(1);
const tabList = ref([
  {
    value: 1,
    label: "明细",
  },
  {
    value: 2,
    label: "按天汇总",
  },
]);
const onTabClick = (value) => {
  currentTab.value = value;
};

// 搜索条件
const searchForm = ref({
  date: timeSlotChange("本周"),
  member: "",
});

// 表格
const tableData = ref([]);
const sumData = ref({});

// 表格统计
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
    }
    if (index === 3) {
      sums[index] = sumData.value.recovery_doll;
    }
  });

  return sums;
};

/* 分页 */
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const doSearch = async (order_field = "recovery_doll", order_type = "desc") => {
  let start_date, end_date;
  if (searchForm.value.date) {
    start_date = new Date(searchForm.value.date[0])
      .toLocaleDateString()
      .replaceAll("/", "-");
    end_date = new Date(searchForm.value.date[1])
      .toLocaleDateString()
      .replaceAll("/", "-");
  } else {
    start_date = "";
    end_date = "";
  }

  const res = await getRecoveryData({
    mer_id: "10001", // TODO
    store_id: "10001_001",
    start_date,
    end_date,
    leager_info: searchForm.value.member, //电话/卡号/账户，为空传空字符串
    order_field, // 排序字段，为空传空字符串
    order_type, // 排序方式：asc/desc，为空传空字符串
    page_size: pageSize.value,
    page_index: currentPage.value,
    total: -1,
  });
  tableData.value = res.leagers;
  total.value = res.total;
  sumData.value = res.sum_datas;
};

const init = () => {
  doSearch();
};

// 表格排序
const onSortChange = ({ column, prop, order }) => {
  if (prop) {
    order = order == "ascending" ? "asc" : "desc";
    doSearch(prop, order);
  }
};

// 重置
const reset = () => {
  for (let key in searchForm.value) {
    searchForm.value[key] = "";
  }
  searchForm.value.date = timeSlotChange("本周");
};

// 个人详情弹窗
const openDialog = (row) => {
  let { leager_id } = row;
  openMemberDetail(leager_id);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
