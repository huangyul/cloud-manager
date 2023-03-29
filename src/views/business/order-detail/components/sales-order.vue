<!-- 销售订单 -->
<template>
  <div>
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      dealTime="one"
      @search="getSearchCondition"
    ></MySearch>

    <!-- 标签 -->
    <MyTabs :data="tabsData" class="mb10" @click="onTagsClick"></MyTabs>

    <div class="table">
      <!-- 明细表格 -->
      <el-table
        v-if="currentTab == 1"
        :data="tableData"
        highlight-current-row
        @sort-change="sortChange"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="订单号"
          min-width="160"
          sortable="custom"
          prop="bill_no"
        >
          <template #default="scoped">
            <div class="can-click" @click="openDialog('order', scoped.row)">
              {{ scoped.row.bill_no }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="modify_time"
          min-width="170"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="会员"
          prop="leag_name_no"
          min-width="200"
          sortable="custom"
        >
          <template #default="{ row }">
            <div
              v-if="row.leag_name_no"
              class="can-click"
              @click="openDialog('member', row)"
            >
              {{ row.leag_name_no }}
            </div>
            <div v-else>散客</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="170"
          label="商品名称"
          prop="mat_name"
          sortable="custom"
        ></el-table-column>
        <!-- <el-table-column
          label="商品类型"
          prop="mat_type_id"
          min-width="120"
        ></el-table-column>
        <el-table-column
          min-width="180"
          label="商品子类"
          prop="birth"
        ></el-table-column> -->
        <el-table-column
          label="商品编号"
          prop="mat_code"
          sortable="custom"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="销售数量"
          prop="qty_real"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="销售金额"
          prop="px_paid"
          sortable="custom"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="已退数量"
          prop="qty_back"
          min-width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="已退金额"
          prop="px_paid_back"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="实际数量"
          prop="qty_real"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="实际金额"
          prop="px_paid_real"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="订单状态"
          min-width="120"
          prop="order_status"
          sortable="custom"
        >
          <template #default="{ row }">
            <div v-if="row.order_status == 0">未完成</div>
            <div v-if="row.order_status == 1">已完成</div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="销售渠道"
          min-width="180"
          prop="current_store_name"
        ></el-table-column> -->
        <el-table-column
          label="支付方式"
          min-width="180"
          prop="pay_types"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="操作终端"
          min-width="180"
          prop="device_name_no"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="操作员"
          min-width="180"
          prop="create_user_name_no"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="营业日期"
          min-width="180"
          prop="busydate"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="门店"
          min-width="180"
          prop="store_name_no"
          sortable="custom"
        ></el-table-column>
      </el-table>

      <!-- 会员汇总表格       :show-summary="true"-->
      <el-table
        v-if="currentTab == 2"
        :data="tableData"
        @sort-change="sortChange"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column
          label="商品名称"
          prop="mat_name"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="商品编号"
          prop="mat_code"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <!-- <el-table-column label="商品类型" prop="mat_type_id"></el-table-column>
        <el-table-column label="商品子类" prop="leager_count"></el-table-column> -->
        <el-table-column
          label="销售数量"
          prop="qty"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="销售金额"
          prop="px_paid"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="已退数量"
          prop="qty_back"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="已退金额"
          prop="px_paid_back"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="实际数量"
          prop="qty_real"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="实际金额"
          prop="px_paid_real"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="门店"
          prop="store_name_no"
          min-width="180"
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

    <!-- 弹窗 :titleStatus="titleStatus" -->
    <MyDialog
      v-model:isDialogShow="isDialogShow"
      :dialogWidth="1200"
      :title="dialogTitle"
    >
      <!-- 会员详情 -->
      <MemberDetail
        v-if="dialogType == 'member'"
        :memberData="memberData"
      ></MemberDetail>

      <!-- 订单状态 -->
      <SalesOrderDetail
        v-if="dialogType == 'order'"
        :orderData="orderData"
      ></SalesOrderDetail>
    </MyDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyTabs from "/@/components/common/MyTabs.vue";
import MySearch from "/@/components/common/MySearch.vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import MemberDetail from "/@/views/member/archives/index.vue";
// import { getOrderListByAggregate, getOrderListByDetail } from '/@/api/business'
import { openIframe, openMemberDetail } from "/@/utils/helper";
// import { getMemberDetailByOther } from '/@/api/member'
import SalesOrderDetail from "./sales-order-detail.vue";

const dealPayTypes = (payType, key) => {
  const arr = payType.split(",");
  let res = "";
  arr.forEach((i, index) => {
    searchOptions.value.pay_type.forEach((j) => {
      if (j.value == i) {
        res += j.label;
        if (index != 0) {
          res += ",";
        }
      }
    });
  });
  return res;
};

/* 搜索条件
 * type: '' 控件类型， text | textarea | select | date | time
 * value: ''
 * keyName: '' 字段名
 * label: '' label名
 * width: 1, 所占宽度，默认1
 * */
const searchList = ref({
  leager_id: {
    type: "text",
    value: "",
    label: "会员",
    placeholder: "电话",
  },
  bill_no: {
    type: "text",
    value: "",
    placeholder: "订单号/支付订单",
    label: "单号",
  },
  modify_time: {
    type: "daterange",
    value: "",
    label: "更新时间",
  },
  pay_type: {
    type: "select",
    value: "",
    label: "支付方式",
  },
  // birth: {
  //   type: 'daterange',
  //   value: '',
  //   label: '商品名称',
  // },
  // order_status: {
  //   type: 'select',
  //   value: 0,
  //   label: '商品编号',
  // },
  order_status: {
    type: "select",
    value: "",
    label: "订单状态",
  },
  // valid: {
  //   type: 'daterange',
  //   value: '',
  //   label: '销售渠道',
  // },
  // leag_status1: {
  //   type: 'select',
  //   value: 0,
  //   label: '项目类型',
  // },
  // leag_status2: {
  //   type: 'select',
  //   value: 0,
  //   label: '项目子类',
  // },
  busydate: {
    type: "daterange",
    value: "",
    label: "营业日期",
  },
  // device_id: {
  //   type: 'select',
  //   value: '',
  //   label: '操作终端',
  // },
  // create_user_id: {
  //   type: 'select',
  //   value: '',
  //   label: '操作员',
  // },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  // 订单状态 正常、异常、已退单
  order_status: [
    { value: "", label: "全部" },
    { value: 0, label: "未完成" },
    { value: 1, label: "已完成" },
  ],
  leag_status: [
    { value: "", label: "全部" },
    { value: 1, label: "正常" },
    { value: 2, label: "销户" },
  ],
  pay_type: [
    { value: "", label: "全部" },
    { value: 1, label: "现金" },
    { value: 2, label: "扫码" },
    { value: 11, label: "积分" },
    { value: 16, label: "微官网支付" },
  ],
});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
  doSearch();
};

// 标签
const tabsData = ref([
  { label: "明细", value: 1 },
  { label: "按商品汇总", value: 2 },
]);
// 当前的选中的标签，对应上面的value
const currentTab = ref(1);
// 退单信息标签
const returnTabs = ref([
  { label: "退资产明细", value: 1 },
  { label: "退商品明细", value: 2 },
  { label: "操作明细", value: 3 },
]);

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

// 开始搜索
const doSearch = async (key = "modify_time", type = 0) => {
  dealSearch();
  tableData.value = [];
  let id = "";
  // if (searchCondition.value.leager_id) {
  //   // 先通过手机号或者证件号获取id
  //   const memberDesc = await getMemberDetailByOther({
  //     store_id: '10001_001',
  //     type: 1,
  //     code: searchCondition.value.leager_id,
  //   })
  //   if (memberDesc.leager) {
  //     id = memberDesc.leager.id
  //   } else {
  //     id = searchCondition.value.leager_id
  //   }
  // }

  // let res = null
  // if (currentTab.value == 1) {
  //   res = await getOrderListByDetail(
  //     {
  //       mer_id: '10001', // TODO
  //       store_id: '10001_001', // TODO
  //       page_size: pageSize.value,
  //       page_index: currentPage.value,
  //       total: -1,
  //     },
  //     {
  //       ...searchCondition.value,
  //       order_type: 0, // 定死为销售订单
  //       sort_field_name: key,
  //       sort_type: type,
  //       leager_id: id,
  //     }
  //   )
  //   tableData.value = res.data
  //   tableData.value.forEach((i) => {
  //     i.busydate = new Date(i.busydate)
  //       .toLocaleDateString()
  //       .replaceAll('/', '-')
  //   })
  //   total.value = res.total
  // }
  // if (currentTab.value == 2) {
  //   console.log(type)
  //   res = await getOrderListByAggregate(
  //     {
  //       mer_id: '10001', // TODO
  //       store_id: '10001_001', // TODO
  //       page_size: pageSize.value,
  //       page_index: currentPage.value,
  //       total: -1,
  //     },
  //     {
  //       ...searchCondition.value,
  //       order_type: 0,
  //       sort_field_name: key ? key : 'mat_code',
  //       sort_type: type,
  //       leager_id: id,
  //     }
  //   )
  //   tableData.value = res.data
  //   total.value = res.total
  // }
  tableData.value.forEach((i) => {
    i.pay_types = dealPayTypes(i.pay_types, "pay_types");
  });
};

// 搜索前的处理
const dealSearch = () => {
  // 处理搜索字段，如果为空字符串就变为null（后端需要这样判断）
  for (let key in searchCondition.value) {
    let value = searchCondition.value[key];
    searchCondition.value[key] = value === "" ? null : value;
  }
};

// 标签被点击
const onTagsClick = (value) => {
  currentTab.value = value;
  currentPage.value = 1;
  pageSize.value = 10;
  doSearch();
};

/* 弹窗相关 */
let isDialogShow = ref(false);
// 弹窗类型
let dialogType = ref("order");
// 弹窗标题旁边的状态
let titleStatus = ref({
  text: "正常",
  type: "orange",
});
// 弹窗标题
let dialogTitle = ref("订单状态");
let orderData = ref(null);
let memberData = ref(null);
// 打开弹窗
const openDialog = (type, row) => {
  switch (type) {
    case "order":
      dialogTitle.value = "订单状态";
      orderData.value = {
        id: row.id,
        memberName: row.leag_name_no?.split("(")[0] || "散客",
        deviceName: row.device_name_no.split("(")[0],
        optioner: row.create_user_name_no.split("(")[0],
      };
      break;
    case "member": {
      dialogTitle.value = "会员详情";
      memberData.value = {
        leager_id: row.leager_id,
      };
      break;
    }
  }
  dialogType.value = type;
  isDialogShow.value = true;
};

// 表格排序
const sortChange = ({ column, prop, order }) => {
  if (prop) {
    order = order == "ascending" ? 1 : 0;
    doSearch(prop, order);
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;
  .table {
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
      background: #ebeced !important;
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
}
</style>
