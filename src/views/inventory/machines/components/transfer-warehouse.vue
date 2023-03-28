<template>
  <div class="page">
    <div class="search">
      <!-- 只有兑换记录才有此搜索条件 -->
      <div class="search-item">
        <div class="label">转入仓库</div>
        <el-select v-model="warehouse"></el-select>
      </div>
    </div>

    <div class="table">
      <!-- 明细表格 -->
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        :show-summary="true"
        empty-text="暂无数据"
      >
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
          label="礼品名称"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="礼品编号"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="转出仓库"
          min-width="140"
          align="right"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="库存"
          min-width="120"
          sortable="custom"
          prop="bill_no"
        >
        </el-table-column>
        <el-table-column
          label="转仓数量"
          min-width="170"
          sortable="custom"
          prop="bill_no"
          align="right"
        >
        </el-table-column>
        <el-table-column
          label="剩余数量"
          min-width="170"
          sortable="custom"
          prop="bill_no"
          align="right"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const warehouse = ref("");
</script>

<style lang="scss" scoped></style>
