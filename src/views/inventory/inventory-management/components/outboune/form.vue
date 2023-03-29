<!-- 编辑页 -->
<template>
  <div class="page">
    <!-- 条件区域 -->
    <div class="pr70 border-bottom">
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="120" label="单号">
            <el-input v-model="bill.bill_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="仓库">
            <el-select v-model="bill.whse_out">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in whList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="出仓类型">
            <el-select v-model="bill.tran_type">
              <el-option
                :label="t.tran_name"
                :value="t.id"
                v-for="t in type"
                :key="t.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="业务日期">
            <el-date-picker v-model="bill.busy_date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="备注">
            <el-input v-model="bill.summary"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- 功能按钮 -->
    <div class="mt9 mb9">
      <button class="btn btn-blue mr10" @click="chooseItem">选择商品</button>
      <button class="btn btn-grey mr10">导入</button>
      <button class="btn btn-grey">下载模板</button>
    </div>

    <!-- 表格 -->
    <div class="table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        sum-text="合计"
        show-summary
        empty-text="暂无数据"
      >
        <el-table-column
          label="商品名称"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
          <template #default="scoped">
            <div class="can-click" @click="openOrderDetail(scoped.row)">
              {{ scoped.row.bill_no }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品编号"
          prop="modify_time"
          min-width="80"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="140"
          label="单价"
          prop="leag_name_no"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          min-width="170"
          label="数量"
          prop="mat_name"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="金额"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          label="金额（含税）"
          prop="mat_type_id"
        ></el-table-column>
        <el-table-column
          label="税率（%）"
          prop="pay_types"
          sortable="custom"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="金额不含税"
          prop="qty"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="单位"
          min-width="120"
          prop="px_paid"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="当前仓库库存"
          prop="px_paid_real"
          min-width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="140">
          <template #default>
            <button class="btn-blue btn-table">删除</button>
          </template>
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

    <!-- 分摊询问弹窗 -->
    <ConfirmDialog v-model:isShow="confirmDialogShow">
      <template #default>
        <div class="mb40">
          <div class="confirm-black-text">
            是否要把<span class="confirm-blue-text">优惠金额</span
            >按商品金额比例分摊到各商品？
          </div>
          <div class="confirm-red-text">分摊后无法取消！</div>
        </div>
      </template>
    </ConfirmDialog>

    <choose-goods-dialog
      v-model:isChooseDialogShow="isChooseDialogShow"
      @confirm="chooseItems"
    ></choose-goods-dialog>
  </div>
</template>

<script setup>
// import {
//   createOutboune,
//   generateOrderNum,
//   getTranTypeByBillType,
// } from '/@/api/inventory'
// import { getWarehouseList } from '/@/api/warehouse'
import { ElMessage } from "element-plus";
import { onMounted, ref, watch, watchEffect } from "vue";
// 入仓类型
const type = ref([]);
const whList = ref([]);
let currentTranType = ref(null);
// 单据头部数据
const bill = ref({
  bill_no: "",
  whse_out: "",
  tran_type: "",
  busy_date: new Date().toLocaleDateString().replaceAll("/", "-"),
  summary: "",
  items: [],
});

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

// 询问弹窗
let confirmDialogShow = ref(false);
// 点击分摊
const onAppointionment = () => {
  confirmDialogShow.value = true;
};

/* 选择商品弹窗 */
let isChooseDialogShow = ref(false);
const chooseItem = () => {
  isChooseDialogShow.value = true;
};

// 数据初始化
const init = async () => {
  // 获取仓库
  // const res = await getWarehouseList({
  //   page_size: 1000,
  //   page_index: 1,
  //   total: -1,
  //   condition: { fname: '', fcode: '', status: -1, wh_type: -1 },
  // })
  // whList.list = []
  // res.warehouses.forEach((item) => {
  //   whList.value.push({ label: item.fname, value: item.id })
  // })
  // // 默认选择第一个仓库
  // bill.value.whse_out = whList.value[0].value
  // // 获取出仓类型
  // const tranTypes = await getTranTypeByBillType({
  //   bill_type: 2,
  // })
  // type.value = await getTranTypeByBillType({ bill_type: 2 })
};

// 获取单号
const getBillNo = async (reset_period, prefix, billno_len) => {
  // 生成订单号
  // bill.value.bill_no = await generateOrderNum({
  //   tran_type: 7, // 6-入库；7-出库；8-转仓
  //   reset_period,
  //   prefix,
  //   billno_len,
  // })
};

const chooseItems = (val) => {
  tableData.value = val;
};

watchEffect(() => {
  if (bill.value.tran_type) {
    for (let i = 0; i < type.value.length; i++) {
      if (bill.value.tran_type === type.value[i].id) {
        return getBillNo(
          type.value[i].reset_period,
          type.value[i].prefix,
          type.value[i].billno_len
        );
      }
    }
  }
});

// 保存
const onSubmit = async () => {
  if (!bill.value.busy_date) {
    ElMessage.warning("请选择业务日期");
    return Promise.reject();
  }
  // await createOutboune({
  //   device_id: '100001',
  //   user_id: 'USER001',
  //   bill: bill.value,
  // })
  ElMessage.success("保存成功！！");
};

onMounted(() => {
  init();
});

defineExpose({ onSubmit });
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;

  ::v-deep .el-form-item__label {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #2f3339;
  }
  ::v-deep .el-input {
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
  }
  ::v-deep .el-select {
    width: 100%;
  }
  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 100%;
  }
  ::v-deep .el-input__wrapper {
    width: 100%;
  }
  :deep .el-radio__inner::after {
    transform: translate(-50%, -50%) scale(2);
  }
  :deep .el-radio__inner {
    width: 18px;
    height: 18px;
  }
  .share-icon {
    color: rgb(73, 150, 243);
    padding: 2px;
    box-sizing: content-box;
    border: 2px solid;
    cursor: pointer;
  }
}
</style>
