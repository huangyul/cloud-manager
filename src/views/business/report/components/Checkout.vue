<template>
  <div class="page p20">
    <div class="flex">
      <div class="flex-1">
        <span class="title">收银员：</span>
        <span class="desc">123123</span>
      </div>
      <div class="flex-2">
        <span class="title">终端：</span>
        <span class="desc">123123</span>
      </div>
    </div>
    <div class="flex mt10">
      <div class="flex-1">
        <span class="title">应收现金：</span>
        <span class="desc">123123</span>
      </div>
      <div class="flex-1">
        <span class="title">应收拉卡拉：</span>
        <span class="desc">123123</span>
      </div>
      <div class="flex-1">
        <span class="title">合计：</span>
        <span class="desc">123123</span>
      </div>
    </div>

    <MyTabs :data="tabList" @click="onTabClick" class="mt24"></MyTabs>

    <div class="table mt10">
      <!-- 表格 -->
      <el-table :data="tableData" border empty-text="暂无数据">
        <el-table-column label="类型" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="名称" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="时间" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="单号" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="金额" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="支付方式" sortable="custom" prop="name">
        </el-table-column>
        <el-table-column label="备注" sortable="custom" prop="name">
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
import MyTabs from "/@/components/common/MyTabs.vue";
import MyTable from "/@/components/common/MyTable.vue";
import { ref } from "vue";

// 当前选中的tab
const currentTab = ref(1);
const tabList = ref([
  {
    value: 1,
    label: "现金",
  },
  {
    value: 2,
    label: "拉卡拉",
  },
  {
    value: 3,
    label: "汇总",
  },
]);
const onTabClick = (value) => {
  currentTab.value = value;
};

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
</script>

<style scoped lang="scss">
.page {
  .title {
    color: #2f3339;
    font-size: 14px;
    font-weight: 550;
  }
  .desc {
    color: #696c70;
    font-size: 14px;
  }
}
</style>
