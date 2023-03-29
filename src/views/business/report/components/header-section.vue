<template>
  <div class="filter-bar" v-if="false">
    <el-radio-group v-model="radio" class="switch-btn">
      <el-radio-button :label="0"
        ><div class="label">
          未结账日期
          <img class="icon" src="@/assets/images/home/board-help.png" /></div
      ></el-radio-button>
      <el-radio-button :label="1"
        ><div class="label">全部日期</div></el-radio-button
      >
    </el-radio-group>
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择时间"
      :size="size"
    />
    <div class="btns">
      <el-button type="danger">结账</el-button>
      <el-button type="info">导出</el-button>
    </div>
    <!-- <div class="tips">
			<span class="error">有异常订单，请处理后再结账</span>
		</div> -->
  </div>

  <div class="disPlay-card">
    <DataCard
      title="营业额"
      :all="data['营业额']"
      day="12000"
      chain="10%"
      icon="/@/assets/images/home/turnover.png"
      background="#ff7c9f"
      boxShadow="0px 3px 10px 0px rgba(255, 124, 159, 0.4)"
    />
    <DataCard
      title="游戏机耗币数"
      :all="data['耗币']"
      day="18000"
      chain="15%"
      icon="/@/assets/images/home/consume-bi.png"
      background="#C391FF"
      boxShadow="0px 3px 10px 0px rgba(195,145,255,0.4000)"
    />
    <DataCard
      title="礼品回收数"
      :all="data['回收礼品数']"
      day="52000"
      chain="5%"
      icon="/@/assets/images/home/gift-integral.png"
      background="#66CEA1"
      boxShadow="0px 3px 10px 0px rgba(102,206,161,0.4000)"
    />
    <DataCard
      title="礼品回收值"
      :all="data['存积分']"
      day="105"
      chain="2%"
      icon="/@/assets/images/home/user.png"
      background="#E4CD4F"
      boxShadow="0px 3px 10px 0px rgba(228,205,79,0.4000)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataCard from "/@/components/data-card.vue";
// import { getReportHeaderData } from '/@/api/report/index.js'

const radio = ref(0);
const value = ref(new Date());

const data = ref({});

onMounted(async () => {
  // const res = await getReportHeaderData({
  //   mer_id: '10001',
  //   proc_name: 'qry_home_data',
  //   prms: {
  //     mer_id1: '10001',
  //     store_id1: '10001_001',
  //     begin_date: new Date().toLocaleDateString().replaceAll('/', '-'),
  //     end_date: new Date().toLocaleDateString().replaceAll('/', '-'),
  //   },
  // })
  // data.value = res[0]
});
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  .switch-btn {
    margin-right: 12px;
    .label {
      display: flex;
      align-items: center;
      .icon {
        margin-left: 4px;
        width: 16px;
        height: 16px;
      }
    }
  }
  .btns {
    margin-left: 16px;
  }
  .tips {
    margin-left: 30px;
    font-size: 18px;
    font-weight: bold;
    .error {
      color: #ff4d4d;
    }
  }
}
.disPlay-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .card {
    width: 24%;
  }
}
</style>
