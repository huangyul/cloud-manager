<!-- 出仓列表页 -->
<template>
  <div>
    <!-- 顶部操作栏 -->
    <div class="action">
      <button class="btn btn-green flex flex-col-center" @click="openDialog()">
        <el-icon class="mr6"><Plus /></el-icon>新建出仓单
      </button>
    </div>

    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      dealTime="two"
      @search="getSearchCondition"
    >
      <template #func-more>
        <button class="btn-grey btn">导出</button>
      </template>
    </MySearch>

    <div class="table p16">
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
          label="单号"
          min-width="180"
          sortable="custom"
          prop="bill_no"
        >
          <template #default="{ row }">
            <span class="can-click">{{ row.bill_no }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          prop="qty"
          min-width="80"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="180"
          label="金额（加权价）"
          prop="amount"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          min-width="180"
          label="金额（标准价）"
          prop="std_amount"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          min-width="170"
          label="商品"
          prop="items"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="仓库"
          prop="whse"
          min-width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          label="出仓类型"
          prop="tran_type"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          sortable="custom"
          min-width="120"
        >
          <!-- -2-全部；0已保存;1已提交;-1作废 -->
          <template #default="{ row }">
            {{ statusMap.get(row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          label="业务日期"
          min-width="120"
          prop="busy_date"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_time"
          min-width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label=" 创建人"
          prop="creater"
          min-width="180"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="备注"
          prop="summary"
          min-width="180"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="140" fixed="right">
          <template #default="{ row }">
            <button
              class="btn-blue btn-table mr8"
              @click="openConfirmDialog('submit', row)"
            >
              提交
            </button>
            <button
              class="btn-blue btn-table"
              @click="openConfirmDialog('delete', row)"
            >
              删除
            </button>
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

    <!-- 新建弹窗 -->
    <MyDialog
      v-model:isDialogShow="isDialogShow"
      confirm-button="保存"
      :dialogWidth="1200"
      :title="dialogTitle"
      @confirm="onConfirm"
    >
      <Form ref="editForm"></Form>
    </MyDialog>

    <!-- 询问弹窗 -->
    <ConfirmDialog
      v-model:isShow="confirmDialogShow"
      @confirm="onDialogConfirm"
    >
      <div class="confirm-black-text" v-show="confirmDialogType == 'delete'">
        是否要删除出仓单<span class="confirm-blue-text">
          {{ currentItem.bill_no }}
        </span>
      </div>
      <div class="confirm-black-text" v-show="confirmDialogType == 'submit'">
        <div>当前单据无需审批，提交后无法修改删除。</div>
        <div>
          是否要提交出仓单
          <span class="confirm-blue-text"> {{ currentItem.bill_no }} </span>
        </div>
      </div>
    </ConfirmDialog>
  </div>
</template>

<script setup>
import MySearch from "/@/components/common/MySearch.vue";
import { onMounted, ref } from "vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import Form from "./form.vue";
import ConfirmDialog from "/@/components/common/ConfirmDialog.vue";
// import { getWarehouseList } from '/@/api/warehouse'
// import {
//   deleteOrder,
//   getOutbouneOrderList,
//   getTranTypeByBillType,
//   submitOutboune,
// } from '/@/api/inventory'
import { ElMessage } from "element-plus";
// -2-全部；0已保存;1已提交;-1作废
const statusMap = new Map([
  [-2, "全部"],
  [0, "已保存"],
  [1, "已提交"],
  [-1, "已作废"],
]);
const searchList = ref({
  bill_no: {
    type: "text",
    value: "",
    label: "单号",
    placeholder: " ",
  },
  whse_out: {
    type: "select",
    value: "",
    label: "仓库",
    placeholder: " ",
  },
  tran_type: {
    type: "select",
    value: "",
    label: "出仓类型",
    placeholder: " ",
    noclearable: true,
  },
  status: {
    type: "select",
    value: -2,
    label: "状态",
    placeholder: " ",
    noclearable: true,
  },
  busy_date: {
    type: "daterange",
    value: [new Date(), new Date()],
    label: "业务日期",
    placeholder: " ",
  },
  create_time: {
    type: "daterange",
    value: [new Date(), new Date()],
    label: "创建时间",
    placeholder: " ",
  },
  creater: {
    type: "select",
    value: "",
    label: "创建人",
    placeholder: " ",
  },
  summary: {
    type: "text",
    value: "",
    label: "备注",
    placeholder: " ",
  },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  // 仓库
  whse_out: [{ value: "", label: "全部" }],
  // 出仓类型：采购出仓、出仓
  tran_type: [{ value: "", label: "全部" }],
  // 状态：
  status: [
    { value: -2, label: "全部" },
    { value: 0, label: "已保存" },
    { value: 1, label: "已提交" },
    { value: -1, label: "作废" },
  ],
});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
  doSearch();
};

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

/* 弹窗相关 */
let isDialogShow = ref(false);
// 弹窗标题
let dialogTitle = ref("新增出仓单");
// 打开弹窗
const openDialog = () => {
  dialogTitle.value = "新增出仓单";
  isDialogShow.value = true;
};
// 录出表单
const editForm = ref(null);
const onConfirm = async () => {
  try {
    // await editForm.value.onSubmit()
    isDialogShow.value = false;
    doSearch();
  } catch (err) {
    console.log(err);
  }
};
let confirmDialogShow = ref(false);
let confirmDialogType = ref("");
let currentItem = ref(null);
const openConfirmDialog = (type, row) => {
  confirmDialogShow.value = true;
  confirmDialogType.value = type;
  currentItem.value = row;
};
const onDialogConfirm = async () => {
  switch (confirmDialogType.value) {
    case "submit": {
      // await submitOutboune({
      //   bill_id: currentItem.value.id,
      // })
      ElMessage.success("提交成功");
      doSearch();
      break;
    }
    case "delete": {
      // await deleteOrder({
      //   bill_id: currentItem.value.id,
      // })
      ElMessage.success("删除成功");
      doSearch();
      break;
    }
  }
};

const doSearch = async () => {
  // const res = await getOutbouneOrderList({
  //   condition: searchCondition.value,
  //   page_size: pageSize.value,
  //   page_index: currentPage.value,
  //   total: -1,
  // })
  // tableData.value = res.bills
  // total.value = res.total
};

const init = async () => {
  // 获取仓库
  // const res = await getWarehouseList({
  //   page_size: 1000,
  //   page_index: 1,
  //   total: -1,
  //   condition: { fname: '', fcode: '', status: -1, wh_type: -1 },
  // })
  // res.warehouses.forEach((item) => {
  //   searchOptions.value.whse_out.push({ label: item.fname, value: item.id })
  // })
  // // 获取出仓类型
  // const tranTypes = await getTranTypeByBillType({ bill_type: 2 })
  // tranTypes.forEach((type) => {
  //   searchOptions.value.tran_type.push({
  //     label: type.tran_name,
  //     value: type.id,
  //   })
  // })
};

// 表格排序
const sortChange = ({ column, prop, order }) => {
  // if (prop) {
  //   order = order == 'ascending' ? 1 : 0
  //   doSearch(prop, order)
  // }
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.action {
  padding: 9px 16px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
