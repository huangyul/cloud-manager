<template>
  <el-table :data="tableData" style="width: 100%" height="455">
    <el-table-column
      prop="create_user_name_no"
      label="收银员"
      min-width="180"
    />
    <el-table-column prop="device_name_no" label="终端名称" min-width="200" />
    <el-table-column prop="date" label="核查" width="100">
      <template #default="scope">
        <div style="text-align: center; line-height: 100%">
          <img
            @click="openDialog(scope.row)"
            style="width: 16px; height: 16px; cursor: pointer"
            src="/@/assets/images/business/query.png"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="现金" align="center">
      <el-table-column prop="cash.pay_value" label="应收金额" width="120" />
      <el-table-column
        prop="cash.pay_value_real"
        label="实收金额"
        width="120"
      />
      <el-table-column
        prop="cash.pay_value_diff"
        label="差异金额"
        width="120"
      />
      <!-- <el-table-column prop="cash.remark" label="备注" min-width="200" /> -->
    </el-table-column>
    <el-table-column label="移动支付" align="center">
      <el-table-column prop="lakala.pay_value" label="应收金额" width="120" />
      <el-table-column
        prop="lakala.pay_value_real"
        label="实收金额"
        width="120"
      />
      <el-table-column
        prop="lakala.pay_value_diff"
        label="差异金额"
        width="120"
      />
      <!-- <el-table-column prop="lakala.remark" label="备注" min-width="200" /> -->
    </el-table-column>
    <el-table-column label="小程序" align="center">
      <el-table-column prop="miniweb.pay_value" label="应收金额" width="120" />
      <el-table-column
        prop="miniweb.pay_value_real"
        label="实收金额"
        width="120"
      />
      <el-table-column
        prop="miniweb.pay_value_diff"
        label="差异金额"
        width="120"
      />
      <!-- <el-table-column prop="miniweb.remark" label="备注" min-width="200" /> -->
    </el-table-column>
    <el-table-column label="金额小计" align="center">
      <el-table-column prop="total.pay_value" label="应收金额" width="120" />
      <el-table-column
        prop="total.pay_value_real"
        label="实收金额"
        width="120"
      />
      <el-table-column
        prop="total.pay_value_diff"
        label="差异金额"
        width="120"
      />
    </el-table-column>
  </el-table>

  <MyDialog
    v-model:isDialogShow="isDialogShow"
    :dialogWidth="1000"
    :title="dialogTitle"
  >
    <Checkout></Checkout>
  </MyDialog>
</template>

<script setup>
// import { getCashierEntryData } from '/@/api/report/index.js'
import MyDialog from "/@/components/common/MyDialog.vue";
import { onMounted, ref } from "vue";
import Checkout from "./Checkout.vue";

const tableData = ref([]);
const dealPayType = (item, j) => {
  switch (j.pay_type) {
    case 1:
      item.cash = {
        pay_value: j.pay_value,
        pay_value_real: j.pay_value_real,
        pay_value_diff: j.pay_value_diff,
        remark: j.remark,
      };
      break;
    case 2:
      item.lakala = {
        pay_value: j.pay_value,
        pay_value_real: j.pay_value_real,
        pay_value_diff: j.pay_value_diff,
        remark: j.remark,
      };
      break;
    case 11:
      item.giftScore = {
        pay_value: j.pay_value,
        pay_value_real: j.pay_value_real,
        pay_value_diff: j.pay_value_diff,
        remark: j.remark,
      };
      break;
    case 16:
      item.miniweb = {
        pay_value: j.pay_value,
        pay_value_real: j.pay_value_real,
        pay_value_diff: j.pay_value_diff,
        remark: j.remark,
      };
      break;
  }
  return item;
};
const dealData = (data) => {
  // 先合并收银员和设备是同一样的
  let res = [];
  for (let i = 0; i < data.length; i++) {
    if (res.length == 0) {
      res.push(dealPayType(data[i], data[i]));
    } else {
      let flag = false;
      for (let j = 0; j < res.length; j++) {
        if (
          res[j].create_user_name_no == data[i].create_user_name_no &&
          res[j].device_id == data[i].device_id
        ) {
          flag = true;
          dealPayType(res[j], data[i]);
        }
      }
      if (!flag) {
        res.push(dealPayType(data[i], data[i]));
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (!data[i].cash) {
      data[i].cash = {
        pay_value: 0.0,
        pay_value_real: 0.0,
        pay_value_diff: 0.0,
        remark: "",
      };
    }
    if (!data[i].lakala) {
      data[i].lakala = {
        pay_value: 0.0,
        pay_value_real: 0.0,
        pay_value_diff: 0.0,
        remark: "",
      };
    }
    if (!data[i].giftScore) {
      data[i].giftScore = {
        pay_value: 0.0,
        pay_value_real: 0.0,
        pay_value_diff: 0.0,
        remark: "",
      };
    }
    if (!data[i].miniweb) {
      data[i].miniweb = {
        pay_value: 0.0,
        pay_value_real: 0.0,
        pay_value_diff: 0.0,
        remark: "",
      };
    }
    data[i].total = {
      pay_value: (
        data[i].cash.pay_value +
        data[i].lakala.pay_value +
        data[i].giftScore.pay_value +
        data[i].miniweb.pay_value
      ).toFixed(2),
      pay_value_real: (
        data[i].cash.pay_value_real +
        data[i].lakala.pay_value_real +
        data[i].giftScore.pay_value_real +
        data[i].miniweb.pay_value_real
      ).toFixed(2),
      pay_value_diff: (
        data[i].cash.pay_value_diff +
        data[i].lakala.pay_value_diff +
        data[i].giftScore.pay_value_diff +
        data[i].miniweb.pay_value_diff
      ).toFixed(2),
    };
  }
  return res;
};

/* 弹窗相关 */
let isDialogShow = ref(false);
// 弹窗标题
let dialogTitle = ref("核查");
// 打开弹窗
const openDialog = (row) => {
  isDialogShow.value = true;
};

onMounted(async () => {
  // const res = await getCashierEntryData(
  //   { store_id: '10001_001' },
  //   {
  //     busydate: {
  //       from: null,
  //       to: null,
  //     },
  //     mer_id: '10001',
  //     store_id: '10001_001',
  //   }
  // )
  // tableData.value = dealData(res)
});
</script>

<style lang="scss" scoped>
::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
  background-color: #fef9ea;
  color: #5e6166;
  font-weight: bold;
}
</style>
