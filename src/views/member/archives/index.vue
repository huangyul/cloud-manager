<!-- 会员档案查询 -->
<template>
  <div class="page">
    <!-- 搜索栏 -->
    <MySearch
      :searchList="searchList"
      :options="searchOptions"
      @search="getSearchCondition"
    ></MySearch>

    <!-- 标签 -->
    <MyTabs :data="tabsData" class="mb10" @click="onTagsClick"></MyTabs>

    <!-- 明细表格 -->
    <div class="table">
      <!-- 表格 :show-summary="true"-->
      <el-table
        v-if="currentTab == 1"
        :data="tableData"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="会员帐户" min-width="120">
          <template #default="scoped">
            <div class="can-click" @click="openDialog(scoped.row)">
              {{ scoped.row.leag_no }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="会员卡号"
          prop="acc_id"
          min-width="160"
        ></el-table-column> -->
        <el-table-column
          min-width="150"
          label="姓名"
          prop="full_name"
        ></el-table-column>
        <el-table-column
          min-width="100"
          label="会员级别"
          prop="sort_name"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="tel"
          min-width="120"
        ></el-table-column>
        <el-table-column
          min-width="120"
          label="出生日期"
          prop="birth"
          :formatter="fullDateFmt"
        ></el-table-column>
        <el-table-column
          label="证件号码"
          prop="iden_no"
          min-width="180"
        ></el-table-column>
        <el-table-column label="状态" prop="leag_status">
          <template #default="{ row }">
            <div v-if="row.leag_status == 1">正常</div>
            <div v-if="row.leag_status == 2">销户</div>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex">
          <template #default="{ row }">
            <div v-if="row.sex == 0"></div>
            <div v-if="row.sex == 1">男</div>
            <div v-if="row.sex == 2">女</div>
            <div v-if="row.sex == 3">其他</div>
          </template>
        </el-table-column>
        <el-table-column label="绑定小程序" prop="is_bind_mini" min-width="100">
          <template #default="{ row }">
            <div v-if="row.is_bind_mini == 0">未绑定</div>
            <div v-if="row.is_bind_mini == 1">已绑定</div>
          </template>
        </el-table-column>
        <el-table-column
          label="最后使用时间"
          prop="modify_time"
          min-width="180"
        ></el-table-column>
        <el-table-column
          label="有效期"
          prop="valid_date"
          min-width="120"
          :formatter="fullDateFmt"
        ></el-table-column>
        <el-table-column
          label="入会时间"
          prop="create_time"
          min-width="120"
          :formatter="fullDateFmt"
        ></el-table-column>
        <el-table-column
          label="入会门店"
          min-width="180"
          prop="create_store_name"
        ></el-table-column>
        <el-table-column
          label="当前所在门店"
          min-width="180"
          prop="current_store_name"
        ></el-table-column>
      </el-table>

      <!-- 会员汇总表格 -->
      <el-table
        v-if="currentTab == 2"
        :data="tableData"
        border
        sum-text="合计"
        empty-text="暂无数据"
      >
        <el-table-column label="会员级别" prop="sort_name"></el-table-column>
        <el-table-column label="人数" prop="leager_count"></el-table-column>
        <el-table-column label="代币数" prop="text">
          <template #default>
            <div>0</div>
          </template>
        </el-table-column>
        <el-table-column label="金币数" prop="">
          <template #default>
            <div>0</div>
          </template>
        </el-table-column>
        <el-table-column label="礼品积分数" prop="">
          <template #default>
            <div>0</div>
          </template>
        </el-table-column>
        <el-table-column label="积分数" prop="">
          <template #default>
            <div>0</div>
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

    <!-- 弹窗 -->
    <MyDialog
      v-model:isDialogShow="isDialogShow"
      :dialogWidth="1200"
      title="会员详情"
    >
      <MemberDetail :leager_id="leager_id" v-if="isDialogShow"></MemberDetail>
    </MyDialog>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import MyTabs from "/@/components/common/MyTabs.vue";
import MySearch from "/@/components/common/MySearch.vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import MemberDetail from "/@/views/member/archives/components/MemberDetail.vue";
// import {
//   getMemberArchivesByDetails,
//   getMemberArchivesByMember,
// } from '/@/api/member'
import { openMemberDetail } from "/@/utils/helper.js";
import moment from "moment";

/* 搜索条件
 * type: '' 控件类型， text | textarea | select | date | time
 * value: ''
 * keyName: '' 字段名
 * label: '' label名
 * width: 1, 所占宽度，默认1
 * */
const searchList = ref({
  // iden_no: {
  //   type: 'text',
  //   value: '',
  //   label: '会员卡号',
  // },
  tel: {
    type: "text",
    value: "",
    label: "电话",
  },
  full_name: {
    type: "text",
    value: "",
    label: "姓名",
  },
  leag_no: {
    type: "text",
    value: "",
    label: "会员账户",
  },
  birth: {
    type: "daterange",
    value: "",
    label: "出生日期",
  },
  iden_no: {
    type: "text",
    value: "",
    label: "证件号码",
  },
  // tags: {
  //   type: 'text',
  //   value: '',
  //   label: '会员标签',
  //   width: 2,
  // },
  valid: {
    type: "daterange",
    value: "",
    label: "有效期",
  },
  leag_status: {
    type: "select",
    value: 0,
    label: "会员状态",
  },
  is_bind_mini: {
    type: "select",
    value: -1,
    label: "绑定小程序",
  },
  // {
  //   type: 'select',
  //   value: '',
  //   keyName: '',
  //   label: '漫游',
  // },
  create_time: {
    type: "daterange",
    value: "",
    label: "入会时间",
  },
  // create_store_id: {
  //   type: 'select',
  //   value: '',
  //   label: '入会门店',
  // },
  // current_store_id: {
  //   type: 'select',
  //   value: '',
  //   label: '当前所在门店',
  // },
  // {
  //   type: 'text',
  //   value: '',
  //   keyName: '',
  //   label: '备注',
  // },
});
// 搜索条件
let searchCondition = ref({});
// 搜索条件中的下拉选项
let searchOptions = ref({
  leag_status: [
    { value: 0, label: "全部" },
    { value: 1, label: "正常" },
    { value: 2, label: "销户" },
  ],
  sex: [{ value: 0, label: "男" }],
  is_bind_mini: [
    { value: -1, label: "全部" },
    { value: 1, label: "是" },
    { value: 0, label: "否" },
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
  { label: "会员级别汇总", value: 2 },
]);
// 当前的选中的标签，对应上面的value
const currentTab = ref(1);

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
let isDone = ref(false);

// 开始搜索
const doSearch = async () => {
  // try {
  //   isDone.value = false
  //   let res = null
  //   if (currentTab.value == 1) {
  //     res = await getMemberArchivesByDetails({
  //       mer_id: '10001', // TODO
  //       store_id: '10001_001', // TODO
  //       condition: {
  //         ...searchCondition.value,
  //       },
  //       page_size: pageSize.value,
  //       page_index: currentPage.value,
  //       total: -1,
  //     })
  //     tableData.value = res.leagers
  //     total.value = res.total
  //   }
  //   if (currentTab.value == 2) {
  //     res = await getMemberArchivesByMember({
  //       mer_id: '10001', // TODO
  //       store_id: '10001_001', // TODO
  //       condition: {
  //         ...searchCondition.value,
  //       },
  //       page_size: pageSize.value,
  //       page_index: currentPage.value,
  //       total: -1,
  //     })
  //     tableData.value = res.leag_sorts
  //     total.value = res.total
  //   }
  // } catch (err) {
  // } finally {
  //   isDone.value = true
  // }
};

// 标签被点击
const onTagsClick = (value) => {
  currentTab.value = value;
  currentPage.value = 1;
  pageSize.value = 10;
  tableData.value = [];
  doSearch(value);
};

/* 弹窗相关 */
let isDialogShow = ref(false);
let leager_id = ref("");
// 打开弹窗
const openDialog = (row) => {
  leager_id.value = row.acc_id;
  isDialogShow.value = true;
  return;
  // 窗口显示
  openMemberDetail(row.acc_id);
};

const fullDateFmt = (row, col) => {
  var date = row[col.property];
  if (date === undefined || date == "1900-01-01 00:00:00") {
    return "";
  }

  return moment(date).format("YYYY-MM-DD");
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
