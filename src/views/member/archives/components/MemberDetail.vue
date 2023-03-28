<!-- 会员详情查询 -->
<template>
  <div class="page">
    <!-- 顶部详情 -->
    <div class="header">
      <!-- 左侧头像 -->
      <div class="avatar">
        <div class="img">
          <img
            :src="data.leager?.member_photo"
            v-if="data.leager?.member_photo"
          />
        </div>
        <div class="name">{{ data.leager?.full_name }}</div>
      </div>
      <!-- 右侧详情 -->
      <div class="right-box">
        <div class="detail">
          <div class="detail-item">
            <div class="title">会员账户：</div>
            <div class="content">{{ data.leager?.leag_no }}</div>
          </div>
          <!-- <div class="detail-item">
            <div class="title">会员卡号：</div>
            <div class="content">{{ data.leager?.mer_id }}</div>
          </div> -->
          <div class="detail-item">
            <div class="title">会员级别：</div>
            <div class="content">{{ data.sort?.fname }}</div>
          </div>
          <div class="detail-item">
            <div class="title">电话：</div>
            <div class="content">{{ data.leager?.tel }}</div>
          </div>
          <div class="detail-item">
            <div class="title">出生日期：</div>
            <div class="content">{{ data.leager?.birth }}</div>
          </div>
          <div class="detail-item">
            <div class="title">证件号码：</div>
            <div class="content">{{ data.leager?.iden_no }}</div>
          </div>
          <div class="detail-item">
            <div class="title">有效期：</div>
            <div class="content">{{ data.leager?.valid_date }}</div>
          </div>
          <div class="detail-item">
            <div class="title">状态：</div>
            <div class="content" v-if="data.leager?.leag_status == 0"></div>
            <div class="content" v-if="data.leager?.leag_status == 1">正常</div>
            <div class="content" v-if="data.leager?.leag_status == 2">销户</div>
          </div>
          <div class="detail-item">
            <div class="title">性别：</div>
            <div class="content" v-if="data.leager?.sex == 0"></div>
            <div class="content" v-if="data.leager?.sex == 1">男</div>
            <div class="content" v-if="data.leager?.sex == 2">女</div>
            <div class="content" v-if="data.leager?.sex == 3">其他</div>
          </div>
          <div class="detail-item">
            <div class="title">地址：</div>
            <div class="content">{{ data.leager?.address }}</div>
          </div>
          <div class="detail-item">
            <div class="title">备注：</div>
            <div class="content"></div>
          </div>
          <div class="detail-item">
            <div class="title">入会门店：</div>
            <div class="content"></div>
          </div>
        </div>
        <!-- <div class="tag">
          <div class="detail-item flex flex-col-center">
            <div class="title">会员标签：</div>
            <div class="tag-list">
              <div class="tag-item">123</div>
              <div class="tag-item">123</div>
              <div class="tag-item">123</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- tab标签 -->
    <MyTabs :data="tabsData" class="mt24" @click="onTagsClick"></MyTabs>

    <!-- 搜索条件 -->
    <div class="search" v-show="isSearchShow">
      <div class="search-item">
        <div class="label">时间</div>
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          :size="size"
        />
      </div>
      <!-- 只有兑换记录才有此搜索条件 -->
      <!-- <div class="search-item" v-if="currentTabs == 3">
        <div class="label">回收方式</div>
        <el-radio-group v-model="searchForm.type">
          <el-radio :label="3">礼品积分</el-radio>
          <el-radio :label="6">代币</el-radio>
          <el-radio :label="9">积分</el-radio>
        </el-radio-group>
      </div> -->
      <div class="search-item ml27">
        <button class="btn-blue btn" @click="getTableData()">查询</button>
      </div>
    </div>

    <div class="table">
      <!-- 会员余额表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 1"
      >
        <el-table-column label="名称" prop="item_name"></el-table-column>
        <el-table-column label="编号" prop="item_code"></el-table-column>
        <el-table-column
          label="余额"
          prop="balance"
          align="right"
        ></el-table-column>
        <!-- <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作">
          <template #default>
            <button class="btn-blue btn" v-if="false">详情</button>
          </template>
        </el-table-column> -->
      </el-table>

      <!-- 销售记录表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 2"
      >
        <el-table-column
          label="时间"
          prop="create_time"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="订单号"
          prop="bill_no"
          min-width="150"
        ></el-table-column>
        <el-table-column label="商品名称" prop="mat_name"></el-table-column>
        <el-table-column label="商品编号" prop="mat_code"></el-table-column>
        <el-table-column
          label="销售数量"
          prop="qty"
          align="right"
          min-width="80"
        ></el-table-column>
        <el-table-column
          label="原金额"
          prop="px_paid_real"
          align="right"
          min-width="80"
        ></el-table-column>
        <el-table-column
          label="销售金额"
          prop="px_paid"
          align="right"
          min-width="80"
        ></el-table-column>
      </el-table>

      <!-- 兑换记录表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 3"
      >
        <el-table-column
          label="时间"
          prop="create_time"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="订单号"
          prop="bill_no"
          min-width="150"
        ></el-table-column>
        <!-- <el-table-column label="兑换方式"></el-table-column> -->
        <el-table-column
          label="商品名称"
          prop="mat_name"
          min-width="150"
        ></el-table-column>
        <el-table-column label="商品编号" prop="mat_code"></el-table-column>
        <el-table-column
          label="兑换数量"
          prop="qty"
          align="right"
          min-width="80"
        ></el-table-column>
        <el-table-column
          label="兑换总价格"
          prop="px_paid"
          align="right"
          min-width="80"
        ></el-table-column>
        <el-table-column
          label="实际总价格"
          prop="px_paid_real"
          align="right"
          min-width="80"
        ></el-table-column>
      </el-table>

      <!-- 回收记录表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 4"
      >
        <el-table-column
          label="时间"
          prop="create_time"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="订单号"
          prop="bill_no"
          min-width="150"
        ></el-table-column>
        <!-- <el-table-column label="回收方式"></el-table-column> -->
        <el-table-column
          label="商品名称"
          prop="mat_name"
          min-width="160"
        ></el-table-column>
        <el-table-column label="商品编号" prop="mat_code"></el-table-column>
        <el-table-column
          label="回收数量"
          prop="qty"
          align="right"
          min-width="90"
        ></el-table-column>
        <el-table-column
          label="回收总价格"
          prop="px_paid"
          align="right"
          min-width="90"
        ></el-table-column>
      </el-table>

      <!-- 投币记录表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 5"
      >
        <el-table-column label="时间"></el-table-column>
        <el-table-column label="游戏机名称"></el-table-column>
        <el-table-column label="游戏机编号"></el-table-column>
        <el-table-column label="投币数"></el-table-column>
      </el-table>

      <!-- 会员时间表格 -->
      <el-table
        :data="tableData"
        max-height="250"
        :height="250"
        v-if="currentTabs == 6"
      >
        <el-table-column label="时间"></el-table-column>
        <el-table-column label="时间"></el-table-column>
        <el-table-column label="变更前"></el-table-column>
        <el-table-column label="变更后"></el-table-column>
        <el-table-column label="操作终端"></el-table-column>
        <el-table-column label="操作员"></el-table-column>
        <el-table-column label="备注"></el-table-column>
      </el-table>

      <!-- 分页 会员余额不显示 -->
      <div class="page" v-if="currentTabs != 1">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          small="small"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getTableData()"
          @current-change="getTableData()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import MyTabs from "/@/components/common/MyTabs.vue";
import MySearch from "/@/components/common/MySearch.vue";
import { getCTime, timeSlotChange } from "/@/utils/helper.js";
// import {
//   getMemberBalance,
//   getMemberDetail,
//   getMemberOrder,
// } from '/@/api/member/index.js'
import { useRoute } from "vue-router";
// import { getOrderListByDetail } from '/@/api/business/index.js'

const route = useRoute();
const props = defineProps({
  leager_id: {
    type: [String, Number],
    default: "",
  },
  memberData: Object,
});
// 本日、本周、本月、本季度、本年
const shortcuts = [
  {
    text: "本日",
    value: () => {
      return timeSlotChange("本日");
    },
  },
  {
    text: "本周",
    value: () => {
      return timeSlotChange("本周");
    },
  },
  {
    text: "本月",
    value: () => {
      return timeSlotChange("本月");
    },
  },
  {
    text: "本季度",
    value: () => {
      return timeSlotChange("本季度");
    },
  },
  {
    text: "本年",
    value: () => {
      return timeSlotChange("本年");
    },
  },
];

/* 标签组件 */
const tabsData = [
  { label: "会员余额", value: 1 },
  { label: "销售记录", value: 2 },
  { label: "兑换记录", value: 3 },
  { label: "回收记录", value: 4 },
  // { label: '投币记录', value: 5 },
  // { label: '会员事件', value: 6 },
];
let currentTabs = ref(1);

// 搜索条件
let searchForm = ref({
  date: "", // 时间
  type: "", // 回收方式
});

// 是否显示搜索条件
let isSearchShow = computed(() => {
  // 只有会员余额不显示搜索条件
  if (currentTabs.value == 1) {
    return false;
  } else {
    return true;
  }
});

/* 数据表格 */
let tableData = ref([{}]);
let data = ref({});
let isDone = ref(false);

/* 分页数据 */
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);

// 获取表格数据
const getTableData = async () => {
  // try {
  //   isDone.value = false
  //   let res = null
  //   // 获取会员余额
  //   if (currentTabs.value == 1) {
  //     res = await getMemberBalance({
  //       store_id: '10001_001', // TODO
  //       acc_id: props.leager_id,
  //     })
  //     tableData.value = res
  //   } else {
  //     // 订单类型 0-销售订单 1-核销订单 2-兑换订单 3-回收订单
  //     let order_type = 0
  //     switch (currentTabs.value) {
  //       case 2:
  //         order_type = 0
  //         break
  //       case 3:
  //         order_type = 2
  //         break
  //       case 4:
  //         order_type = 3
  //         break
  //     }
  //     let start_date, end_date
  //     if (searchForm.value.date) {
  //       start_date = getCTime(
  //         new Date(searchForm.value.date[0])
  //           .toLocaleString()
  //           .replaceAll('/', '-')
  //       )
  //       end_date = getCTime(
  //         new Date(searchForm.value.date[1])
  //           .toLocaleString()
  //           .replaceAll('/', '-')
  //       )
  //     } else {
  //       start_date = null
  //       end_date = null
  //     }
  //     res = await getOrderListByDetail(
  //       {
  //         mer_id: '10001', // TODO
  //         store_id: '10001_001', // TODO
  //         page_size: pageSize.value,
  //         page_index: currentPage.value,
  //         total: -1,
  //       },
  //       {
  //         leager_id: route.query.leager_id,
  //         create_time: { from: start_date, to: end_date },
  //         order_type,
  //       }
  //     )
  //     tableData.value = res.data
  //     total.value = res.total
  //   }
  // } catch (err) {
  // } finally {
  //   tableData.value.forEach((i) => {
  //     i.create_time = new Date(i.create_time)
  //       .toLocaleDateString()
  //       .replaceAll('/', '-')
  //   })
  //   isDone.value = true
  // }
};
// 切换tabs
const onTagsClick = (value) => {
  // 清空时间搜索
  searchForm.value.date = "";
  currentTabs.value = value;
  getTableData();
};
// 页面初始化
const init = async () => {
  // 获取会员详情
  console.log(props);
  // const res = await getMemberDetail({
  //   store_id: '10001_001', // TODO 需要真实的数据
  //   leager_id:
  //     route.query.leager_id || props.leager_id || props.memberData.leager_id,
  // })
  // data.value = res
  // data.value.leager.birth = new Date(data.value.leager.birth)
  //   .toLocaleDateString()
  //   .replaceAll('/', '-')
  // data.value.leager.valid_date = new Date(data.value.leager.valid_date)
  //   .toLocaleDateString()
  //   .replaceAll('/', '-')
  // getTableData()
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.page {
  .title {
    color: #2f3339;
  }
  .content {
    color: #8d9093;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .avatar {
      padding: 6px 40px;
      border-right: 1px solid #e6e6e6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 23px;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #e5e5e5;
        margin-bottom: 14px;
        overflow: hidden;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2f3339;
      }
    }
    .right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .detail {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .detail-item {
          width: 33.33%;
          display: flex;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          margin-bottom: 8px;
          .title {
            color: #2f3339;
          }
          .content {
            color: #8d9093;
          }
        }
      }
      .tag {
        .tag-list {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .tag-item {
            padding: 6px 7px;
            background: #d5e6fa;
            border: 1px solid #d5e6fa;
            border-radius: 2px;
            color: #318cf9;
            margin-right: 6px;
          }
        }
      }
    }
  }
  .search {
    margin: 10px 0;
    display: flex;
    align-items: center;
    .search-item {
      display: flex;
      align-items: center;
      .label {
        text-align: right;
        width: 120px;
        margin-right: 10px;
      }
    }
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
    background: #ebeced !important;
  }
  ::v-deep .el-table__cell {
    padding: 0 !important;
  }
  ::v-deep .el-table__footer-wrapper .el-table__cell {
    background: #fef9ea;
  }
}
</style>
