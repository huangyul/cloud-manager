<!-- 实物币流失率 -->
<template>
  <div class="page">
    <!-- 搜索条件 -->
    <div class="search">
      <div class="search-item">
        <div class="label">日期</div>
        <el-date-picker type="daterange" v-model="searchForm.date">
        </el-date-picker>
      </div>
      <div class="search-item">
        <div class="label">门店</div>
        <el-select
          v-model="searchForm.member"
          placeholder="请选择或输入门店名称编号"
          clearable
        >
          <el-option value="2">1232</el-option>
        </el-select>
      </div>
      <div class="search-item ml27">
        <button class="btn-blue btn mr10" @click="doSearch()">查询</button>
        <button class="btn-grey btn mr10" @click="reset()">重置</button>
        <button class="btn-grey btn">导出</button>
      </div>
    </div>

    <MyTabs :data="tabList" @click="onTabClick" class="mb10"></MyTabs>

    <!-- 表格 -->
    <div class="table">
      <!-- 按天汇总 -->
      <el-table
        :data="tableData"
        v-show="currentTab == 1"
        border
        show-summary
        @sort-change="onSortChange"
        :summary-method="getSummaries"
      >
        <el-table-column label="日期"></el-table-column>
        <el-table-column label="售币总数"></el-table-column>
        <el-table-column label="提币总数"></el-table-column>
        <el-table-column label="存币总数"></el-table-column>
        <el-table-column label="游戏机清币总数"></el-table-column>
        <el-table-column sortable>
          <template #header>
            <div style="display: inline-flex; align-items: center">
              币流失数
              <el-tooltip
                content="币流失数=售币总数+提币总数-存币总数-游戏机清币总数"
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
              币流失率
              <el-tooltip
                content="币流失率=币流失数 / (售币总数+提币总数-存币总数) * 100%"
                placement="top"
              >
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
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
        <el-table-column label="月份"></el-table-column>
        <el-table-column label="售币总数"></el-table-column>
        <el-table-column label="提币总数"></el-table-column>
        <el-table-column label="存币总数"></el-table-column>
        <el-table-column label="游戏机清币总数"></el-table-column>
        <el-table-column sortable>
          <template #header>
            <div style="display: inline-flex; align-items: center">
              币流失数
              <el-tooltip
                content="币流失数=售币总数+提币总数-存币总数-游戏机清币总数"
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
              币流失率
              <el-tooltip
                content="币流失率=币流失数 / (售币总数+提币总数-存币总数) * 100%"
                placement="top"
              >
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

// 当前选中的tab
const currentTab = ref(1);
const tabList = ref([
  {
    value: 1,
    label: "按天汇总",
  },
  {
    value: 2,
    label: "按月汇总",
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
