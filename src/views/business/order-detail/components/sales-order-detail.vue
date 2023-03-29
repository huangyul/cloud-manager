<!-- 销售订单详情 -->
<template>
  <div class="p20">
    <!-- 详情 -->
    <div class="detail">
      <div class="item">
        <div class="title">订单号码：</div>
        <div class="desc">{{ data.head?.bill_no }}</div>
      </div>
      <div class="item">
        <div class="title">销售时间：</div>
        <div class="desc">{{ data.head?.create_time }}</div>
      </div>
      <!-- <div class="item">
        <div class="title">销售渠道：</div>
        <div class="desc">{{ data.head?.order_source_enum }}</div>
      </div> -->
      <div class="item">
        <div class="title">会员：</div>
        <div class="desc">{{ props.orderData?.memberName }}</div>
      </div>
      <div class="item">
        <div class="title">操作人员：</div>
        <div class="desc">{{ props.orderData?.optioner }}</div>
      </div>
      <div class="item">
        <div class="title">操作终端：</div>
        <div class="desc">{{ props.orderData?.deviceName }}</div>
      </div>
      <div class="item">
        <div class="title">实收金额：</div>
        <div class="desc">{{ data.head?.px_order_paid }}</div>
      </div>
      <!-- <div class="item">
        <div class="title">优惠金额：</div>
        <div class="desc">123123213</div>
      </div>
      <div class="item">
        <div class="title">已退金额：</div>
        <div class="desc">123123213</div>
      </div> -->
      <!-- <div class="item">
        <div class="title">授权人：</div>
        <div class="desc error">123123213</div>
      </div>
      <div class="item">
        <div class="title">备注：</div>
        <div class="desc error">123123213</div>
      </div> -->
    </div>
    <!-- tab -->
    <MyTabs :data="tabList" class="mt20" @click="onTabClick"></MyTabs>
    <!-- 表格 -->
    <div class="table mt14">
      <!-- 支付信息表 -->
      <el-table
        :data="data.payment_detail"
        v-if="currentTab == 1"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="支付方式" prop="pay_type">
          <template #default="scoped">
            {{ paymentMap[scoped.row.pay_type] }}
          </template>
        </el-table-column>
        <el-table-column label="支付金额" prop="pay_value"></el-table-column>
        <el-table-column label="已退金额"></el-table-column>
        <!-- <el-table-column label="备注" prop="remark"></el-table-column> -->
      </el-table>

      <!-- 商品信息表 -->
      <el-table
        :data="data.goods_main"
        v-if="currentTab == 2"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="数量" prop="qty"></el-table-column>
        <el-table-column label="单价" prop="px_retail"></el-table-column>
        <el-table-column
          label="金额小计"
          prop="px_retail_total"
        ></el-table-column>
        <el-table-column label="已退数量"></el-table-column>
        <el-table-column label="备注"></el-table-column>
      </el-table>

      <!-- 资产信息表 -->
      <el-table
        :data="data.item_detail"
        v-if="currentTab == 3"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="item_name"></el-table-column>
        <el-table-column label="类型" prop="is_income">
          <template #default="{ row }">
            {{ itemOrderType(row.is_income) }}
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="qty"></el-table-column>
        <el-table-column label="已退数量"></el-table-column>
        <el-table-column label="有效期"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
// import { getOrderDetail } from '/@/api/business/index.js'
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MyTabs from "/@/components/common/MyTabs.vue";
const paymentMap = {
  1: "现金支付",
  2: "付款码支付",
  3: "扫一扫支付",
  4: "人脸支付",
  5: "银行卡",
  6: "渠道记账",
  7: "电子优惠券",
  8: "实物优惠券",
  9: "代币",
  10: "一卡通",
  11: "积分",
  12: "奖票",
  13: "特殊奖票",
  14: "核销",
  15: "会员支付",
  16: "微官网支付",
};
const props = defineProps({
  orderData: Object,
});
let orderId = ref("");
const route = useRoute();
const tabList = ref([
  { value: 1, label: "支付信息" },
  { value: 2, label: "商品信息" },
  { value: 3, label: "资产信息" },
]);
const currentTab = ref(1);
const onTabClick = (value) => {
  currentTab.value = value;
};
let data = ref({});
onMounted(async () => {
  // orderId.value = props.orderData?.id
  // const res = await getOrderDetail({
  //   store_id: '10001_001',
  //   order_id: orderId.value,
  // })
  // data.value = res
});
let tableData = ref([]);
const itemOrderType = (value) => {
  if (value == 1) {
    return "正常订单";
  }
  if (value == 2) {
    return "回退订单";
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 33.3%;
    display: flex;
    margin-bottom: 7px;
    .title {
      color: #2f3339;
      font-weight: 500;
    }
    .desc {
      color: #8d9093;
    }
    .error {
      color: #ff5b5b;
    }
  }
}
.item-title {
  margin-top: 25px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #63666b;
}
</style>
