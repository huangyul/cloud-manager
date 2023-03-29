<!-- 回收订单详情 -->
<template>
  <div class="p20">
    <!-- 详情 -->
    <div class="detail">
      <div class="item">
        <div class="title">订单号码：</div>
        <div class="desc">{{ data.head?.bill_no }}</div>
      </div>
      <div class="item">
        <div class="title">回收时间：</div>
        <div class="desc">{{ data.head?.create_time }}</div>
      </div>
      <!-- <div class="item">
        <div class="title">回收方式：</div>
        <div class="desc"></div>
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
        <div class="title">回收价格：</div>
        <div class="desc">{{ data.head?.px_order_paid }}</div>
      </div>
      <div class="item">
        <div class="title">营业日期：</div>
        <div class="desc">{{ data.head?.busydate }}</div>
      </div>
      <!-- <div class="item">
        <div class="title">备注：</div>
        <div class="desc">123123213</div>
      </div>
      <div class="item">
        <div class="title">异常信息：</div>
        <div class="desc error">异常信息</div>
      </div> -->
    </div>
    <!-- 标题 -->
    <div class="item-title left-orange">商品信息</div>
    <!-- 表格 -->
    <div class="table mt14">
      <!-- 明细表格 -->
      <el-table
        :data="data.goods_main"
        :show-summary="true"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="数量" prop="qty"></el-table-column>
        <el-table-column label="回收价格" prop="px_retail"></el-table-column>
        <el-table-column label="小计" prop="px_retail_total"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
// import { getOrderDetail } from '/@/api/business/index.js'
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  orderData: Object,
});
const route = useRoute();
let tableData = ref([]);
let data = ref({});
let orderId = ref("");
onMounted(async () => {
  // orderId.value = props.orderData?.id
  // const res = await getOrderDetail({
  //   store_id: '10001_001',
  //   order_id: orderId.value,
  // })
  // data.value = res
});
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
