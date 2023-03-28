<!-- 编辑页 -->
<template>
  <div class="page">
    <!-- 条件区域 -->
    <div class="pr70 border-bottom">
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="120" label="单号">
            <el-input v-model="bill.bill_no" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="仓库">
            <el-select v-model="bill.whse_in" :disabled="isDisabled">
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
          <el-form-item :label-width="120" label="入仓类型">
            <el-select v-model="bill.tran_type" :disabled="isDisabled">
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
          <el-form-item :label-width="120" label="供应商">
            <el-select v-model="bill.supplier" :disabled="isDisabled">
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :label-width="120"
            label="单价"
            style="margin-bottom: 10px"
          >
            <el-radio-group v-model="isTax" :disabled="isDisabled">
              <el-radio :label="true" size="large">含税</el-radio>
              <el-radio :label="false" size="large">不含税</el-radio>
            </el-radio-group></el-form-item
          >
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="整单优惠">
            <el-input v-model="bill.whole_discount" :disabled="isDisabled">
              <template #suffix>
                <el-icon
                  class="el-input__icon share-icon"
                  @click="onAppointionment"
                  ><share />
                </el-icon> </template
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="业务日期">
            <el-date-picker
              v-model="bill.busy_date"
              :disabled="isDisabled"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="120" label="备注">
            <el-input v-model="bill.summary" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- 功能按钮 -->
    <div class="mt9 mb9">
      <button v-if="!isDisabled" class="btn btn-blue mr10" @click="chooseItem">
        选择商品
      </button>
      <button v-if="!isDisabled" class="btn btn-grey mr10">导入</button>
      <button :disabled="isDisabled" class="btn btn-grey">下载模板</button>
    </div>

    <!-- 表格  @sort-change="sortChange"-->
    <div class="table">
      <!-- 表格 -->
      <el-table
        :data="bill.items"
        border
        sum-text="合计"
        show-summary
        height="225"
        :default-sort="{ prop: 'fcode', order: 'descending' }"
        empty-text="暂无数据"
      >
        <el-table-column label="商品名称" min-width="180" prop="fname">
        </el-table-column>
        <el-table-column
          label="商品编号"
          prop="fcode"
          min-width="120"
        ></el-table-column>
        <el-table-column
          min-width="140"
          label="单价"
          prop="price"
          align="right"
        >
          <template #default="{ row }">
            <el-input-number
              @change="onPriceChange(row)"
              v-model="row.price"
              :min="0"
              :controls="false"
              :precision="3"
            />
          </template>
        </el-table-column>
        <el-table-column min-width="170" label="数量" prop="qty" align="right">
          <template #default="{ row }">
            <el-input-number v-model="row.qty" :min="0" :controls="false" />
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          label="金额（含税）"
          prop="amount_in_tax"
          align="right"
        >
          <template #default="{ row }">
            <el-input-number
              @change="onAmountintaxChange(row)"
              v-model="row.amount_in_tax"
              v-if="isTax"
              :controls="false"
              :precision="2"
            />
            <span v-else>{{
              Math.round((row.amount / (1 + row.tax_rate / 100)) * 100) / 100
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="税率（%）"
          prop="tax_rate"
          min-width="120"
          align="right"
        >
          <template #default="{ row }">
            <el-input-number
              v-model="row.tax_rate"
              :min="0"
              :max="100"
              :controls="false"
              @change="onTaxrateChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="金额不含税"
          prop="amount"
          min-width="120"
          align="right"
        >
        </el-table-column>
        <el-table-column label="单位" min-width="120" prop="unit_name">
        </el-table-column>
        <el-table-column
          label="当前仓库库存"
          prop="inventory_qty"
          min-width="120"
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
      @confirm="chooseGoods"
    ></choose-goods-dialog>
  </div>
</template>

<script setup>
// import {
//   createInboune,
//   fetchInbouneDetailByID,
//   getTranTypeByBillType,
//   generateOrderNum,
//   updateInboune,
// } from '@/api/inventory'
// import { getWarehouseList } from '@/api/warehouse'
import { ElMessage } from "element-plus";
import { onMounted, ref, watch, watchEffect } from "vue";
const emit = defineEmits(["reflesh"]);
const props = defineProps({
  id: String,
});

// 是否含税
let isTax = ref(true);

// 入仓类型
const type = ref([]);
const whList = ref([]);
let currentTranType = ref(null);
// 单据头部数据
const bill = ref({
  bill_no: "", //	单号
  whse_in: "", //	入仓仓库ID
  tran_type: "", //	入仓类型ID
  supplier: "", //	供应商ID
  price_in_tax: 1, //	单价含税：1-含；0-不含
  amount: "", //	实际金额
  whole_discount: "", //	整单优惠
  busy_date: new Date().toLocaleDateString().replaceAll("/", "-"), //:	业务日期
  summary: "", //	备注
  items: [],
});
// 是否可编辑
let isDisabled = ref(false);

// 表格数据
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

// 询问弹窗
let confirmDialogShow = ref(false);
// 点击分摊
const onAppointionment = () => {
  if (isDisabled.value) return;
  // pan
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
  // bill.value.whse_in = whList.value[0].value
  // if (props.id) {
  //   const orderData = await fetchInbouneDetailByID({
  //     bill_id: props.id,
  //   })
  //   bill.value = orderData.bill
  //   isDisabled.value = bill.value.status == 0 ? false : true
  // }
  // // 获取业务类型
  // type.value = await getTranTypeByBillType({ bill_type: 1 })
  // bill.value.tran_type = type.value.length > 0 ? type.value[0].id : ''
};

// 获取单号
const getBillNo = async (reset_period, prefix, billno_len) => {
  // 生成订单号
  // bill.value.bill_no = await generateOrderNum({
  //   tran_type: 6, // 6-入库；7-出库；8-转仓
  //   reset_period,
  //   prefix,
  //   billno_len,
  // })
};

// 选择商品
const chooseGoods = (goods) => {
  // 整理数据字段
  goods.forEach((good) => {
    bill.value.items.push({
      item_id: good.id,
      fcode: good.code,
      fname: good.name,
      price_in_tax: 0, // 单价含税
      price: good.avg_cost, // 单价不含税（加权平均）
      amount_in_tax: 0, // 金额含税
      amount: 0, // 金额不含税（加权平均）
      tax_rate: 0, // 税率
      unit_id: good.unit_id,
      unit_name: good.unit_name,
      qty: 0,
      summary: "",
    });
  });
};

// 保存
const onSubmit = async () => {
  if (!bill.value.busy_date) {
    ElMessage.warning("请选择业务日期");
    return Promise.reject();
  }
  // if (props.id) {
  //   await updateInboune({
  //     device_id: '100001',
  //     user_id: 'USER001',
  //     bill,
  //   })
  // } else {
  //   await createInboune({
  //     device_id: '100001',
  //     user_id: 'USER001',
  //     bill: bill.value,
  //   })
  // }

  ElMessage.success("保存成功！！");
};

const onPriceChange = (row) => {
  if (row.qty > 0) {
    row.amount_in_tax = Math.round(row.price * row.qty * 100) / 100;
  }
};

const onAmountintaxChange = (row) => {
  if (row.qty > 0) {
    row.price = Math.round((row.amount_in_tax / row.qty) * 1000) / 1000;
  }
};

watch(isTax, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    bill.value.items.forEach((item) => {
      if (item.qty === 0) {
        item.amount = 0;
        item.amount_in_tax = 0;
      }
    });
  }
});

watchEffect(() => {
  if (!props.id) {
    for (let i = 0; i < type.value.length; i++) {
      if (type.value[i].id === bill.value.tran_type) {
        getBillNo(
          type.value[i].reset_period,
          type.value[i].prefix,
          type.value[i].billno_len
        );
        return;
      }
    }
  }
});

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
