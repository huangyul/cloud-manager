<!-- 通用表格 -->
<template>
  <div class="table">
    <!-- 表格 -->
    <el-table
      :data="props.tableData"
      :show-summary="true"
      border
      sum-text="合计"
      empty-text="暂无数据"
    >
      <template v-for="item in props.headerColumn" :key="item.keyName">
        <el-table-column
          :min-width="item['min-width']"
          v-if="item.keyName"
          :label="item.label"
          :prop="item.keyName"
        >
          <template #default="scoped" v-if="item.useTemplate">
            <slot :scoped="scoped"></slot>
          </template> </el-table-column
      ></template>
    </el-table>

    <!-- 分页-->
    <div class="page">
      <el-pagination
        v-model:currentPage="props.currentPage"
        :page-size="props.pageSize"
        small="small"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  /**
   * 表格的数据
   * 单个的结构如下：
   * {
   * label: '' 中文标签名
   * keyName: '' 字段名
   * }
   */
  headerColumn: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["update:sizePage", "update:currentPage"]);
const onSizeChange = (value) => {
  emits("update:sizePage", value);
};
const onCurrentChange = (value) => {
  emits("update:currentPage", value);
};

const getSummaries = ({ columns, data }) => {};
</script>

<style lang="scss" scoped>
.table {
  th.el-table__cell {
    background: #ebeced !important;
  }
  ::v-deep th.el-table__cell {
    height: 36px !important;
  }
  ::v-deep td.el-table__cell {
    height: 36px !important;
  }
  ::v-deep th.el-table__cell > .cell {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #5e6166;
    line-height: 37px;
    // background: #ebeced !important;
  }
  ::v-deep .el-table__cell {
    padding: 0 !important;
  }
  ::v-deep .el-table__footer-wrapper .el-table__cell {
    background: #fef9ea;
  }
  .page {
    margin-top: 6px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
