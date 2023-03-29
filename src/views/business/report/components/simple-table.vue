<template>
  <el-table :data="tableData" style="width: 100%" height="455">
    <el-table-column prop="project_type" label="项目类型" width="150">
      <template #default>日常销售</template>
    </el-table-column>
    <el-table-column prop="project_sub_type" label="项目子类" width="120">
      <template #default>普通销售</template>
    </el-table-column>
    <el-table-column prop="mat_name" label="项目名称" width="180" />
    <el-table-column prop="mat_code" label="项目编号" width="120" />
    <el-table-column prop="qty" label="销量数量" width="120" />
    <el-table-column prop="px_paid" label="销售金额" width="120" />
    <el-table-column prop="qty_back" label="回退数量" width="120" />
    <el-table-column prop="px_paid_back" label="回退金额" width="120" />
    <el-table-column prop="qty_real" label="数量小计" width="120" />
    <el-table-column prop="px_paid_real" label="金额小计" width="120" />
  </el-table>
</template>

<script setup>
// import { getBusinessComposition } from '/@/api/report'
import { onMounted, ref } from "vue";
const tableData = ref([]);
onMounted(async () => {
  // const res = await getBusinessComposition(
  //   { store_id: '10001_001' },
  //   {
  //     create_time: {
  //       from: null,
  //       to: null,
  //     },
  //     mer_id: '10001',
  //     store_id: '10001_001',
  //   }
  // )
  // tableData.value = res
});
const tableDat1a = [
  {
    d1: "日常销售",
    d2: "普通销售",
    d3: "超值购50元=50币",
    d4: "TC001",
    d5: "4",
    d6: "40.01",
    d7: "1",
    d8: "10",
    d9: "3",
    d10: "30",
  },
  {
    d1: "其它收支",
    d2: "其它收入",
    d3: "废品收入",
    d4: "E01",
    d5: "1",
    d6: "6",
    d7: "",
    d8: "",
    d9: "",
    d10: "",
  },
  {
    d1: "其它收支",
    d2: "其它支出",
    d3: "玩具电池",
    d4: "K01",
    d5: "1",
    d6: "-2",
    d7: "",
    d8: "",
    d9: "",
    d10: "",
  },
];
</script>

<style lang="scss" scoped>
::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
  background-color: #fef9ea;
  color: #5e6166;
  font-weight: bold;
}
</style>
