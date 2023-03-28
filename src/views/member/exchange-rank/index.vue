<!-- 兑换排行 -->
<template>
  <div class="page">
    <!-- 搜索条件 -->
    <div class="search">
      <div class="search-item">
        <div class="label">日期</div>
        <el-date-picker
          type="daterange"
          v-model="searchForm.date"
          :shortcuts="shortcuts"
        >
        </el-date-picker>
      </div>
      <!-- 只有兑换记录才有此搜索条件 -->
      <div class="search-item">
        <div class="label">会员</div>
        <el-input
          v-model="searchForm.member"
          placeholder="电话/卡号/账号"
          clearable
        ></el-input>
      </div>
      <div class="search-item ml27">
        <button class="btn-blue btn mr10" @click="doSearch()">查询</button>
        <button class="btn-grey btn mr10" @click="reset()">重置</button>
        <!-- <button class="btn-grey btn">导出</button> -->
      </div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        show-summary
        @sort-change="onSortChange"
        :summary-method="getSummaries"
      >
        <el-table-column label="会员">
          <template #default="{ row }">
            <div class="can-click" @click="openDialog(row)">
              {{ row.full_name }}({{ row.leag_no }})
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="会员姓名"
          prop="full_name"
          sortable="customer"
        ></el-table-column>
        <el-table-column
          label="彩票兑换数"
          prop="prize_ticket"
          sortable="customer"
        ></el-table-column>
        <el-table-column
          label="礼品积分兑换数"
          prop="doll_score"
          sortable="customer"
        ></el-table-column>
        <el-table-column
          label="积分兑换数"
          prop="score"
          sortable="customer"
        ></el-table-column>
        <el-table-column
          label="代币兑换数"
          prop="token"
          sortable="customer"
        ></el-table-column>
        <el-table-column
          label="特殊彩票兑换数"
          prop="special_ticket"
          sortable="customer"
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
// import { getExchangeData } from '@/api/member'
import { timeSlotChange, openMemberDetail } from "/@/utils/helper";
import { ref, onMounted } from "vue";

// 搜索条件
const searchForm = ref({
  date: timeSlotChange("本周"),
  member: "",
});
// 本日、本周、本月、本季度、本年
const shortcuts = [
  {
    text: "本日",
    value: () => {
      return timeSlotChange("本日");
    },
  },
  {
    text: "本周",
    value: () => {
      return timeSlotChange("本周");
    },
  },
  {
    text: "本月",
    value: () => {
      return timeSlotChange("本月");
    },
  },
  {
    text: "本季度",
    value: () => {
      return timeSlotChange("本季度");
    },
  },
  {
    text: "本年",
    value: () => {
      return timeSlotChange("本年");
    },
  },
];

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
    if (index === 5) {
      sums[index] = sumData.value.token;
    }
    if (index === 2) {
      sums[index] = sumData.value.prize_ticket;
    }
    if (index === 6) {
      sums[index] = sumData.value.special_ticket;
    }
    if (index === 4) {
      sums[index] = sumData.value.score;
    }
    if (index === 3) {
      sums[index] = sumData.value.doll_score;
    }
  });

  return sums;
};

// 分页
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

const doSearch = async (order_field = "doll_score", order_type = "desc") => {
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
  // const res = await getExchangeData({
  //   mer_id: '10001', // TODO
  //   store_id: '10001_001',
  //   start_date,
  //   end_date,
  //   leager_info: searchForm.value.member, //电话/卡号/账户，为空传空字符串
  //   order_field, // 排序字段，为空传空字符串
  //   order_type, // 排序方式：asc/desc，为空传空字符串
  //   page_size: pageSize.value,
  //   page_index: currentPage.value,
  //   total: -1,
  // })
  // tableData.value = res.leagers
  // total.value = res.total
  // sumData.value = res.sum_datas
};
const init = () => {
  // doSearch()
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
  // searchForm.value.date = timeSlotChange('本周')
};

// 个人详情弹窗
const openDialog = (row) => {
  let { leager_id } = row;
  // openMemberDetail(leager_id)
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
