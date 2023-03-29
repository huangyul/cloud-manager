<!-- 机台营收出奖分析 -->
<template>
  <div>
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      dealTime="one"
      @search="getSearchCondition"
    >
      <template #func-more>
        <button class="btn btn-grey">导出</button>
      </template>
    </MySearch>

    <div class="table">
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
          label="码表币数"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="币价值"
          prop="pay_types"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              币价值
              <el-tooltip content="=码表币数 * 标准币单价" placement="top">
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="出礼品数"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="出礼品价值"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              出礼品价值
              <el-tooltip placement="top">
                <template #content>
                  =出礼品数 * 礼品档案的成本单价。<br />
                  若有多种礼品则成本价以不同礼品的数量为权重进行加权平均计算
                </template>
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="出礼品币数"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              出礼品币数
              <el-tooltip content="=码表币数 / 出礼品数" placement="top">
                <img class="ml4" src="@/assets/image/home/help.png" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="标准出奖币数"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
          <template #header>
            <div style="display: inline-flex; align-items: center">
              标准出奖币数
              <el-tooltip
                placement="top"
                content="游戏机档案设置的标准出奖币数"
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
              <el-tooltip content="=出礼品价值 / 币价值" placement="top">
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
import MySearch from "/@/components/common/MySearch.vue";
import { onMounted, ref, watch } from "vue";
const searchList = ref({
  s: {
    type: "checkbox",
    value: ["码表录入"],
    label: "数据来源",
  },
  a: {
    type: "daterange",
    value: "",
    label: "抄表日期",
  },
  d: {
    type: "text",
    value: "",
    label: "机位编号",
  },
  e: {
    type: "text",
    value: "",
    label: "游戏机编号",
  },
  g: {
    type: "text",
    value: "",
    label: "游戏机名称",
  },
  b: {
    type: "select",
    value: "",
    label: "门店",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  s: [{ label: "码表录入", value: "码表录入" }],
});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
};
</script>

<style lang="scss" scoped></style>
