<template>
  <div v-if="data" class="disPlay-card">
    <DataCard
      title="今日营业额"
      :all="data['营业额']"
      day="12000"
      chain="10%"
      :icon="require('/@/assets/images/home/turnover.png')"
      background="#ff7c9f"
      boxShadow="0px 3px 10px 0px rgba(255, 124, 159, 0.4)"
    />
    <DataCard
      title="今日耗币数"
      :all="data['耗币']"
      day="18000"
      chain="15%"
      :icon="require('/@/assets/images/home/consume-bi.png')"
      background="#C391FF"
      boxShadow="0px 3px 10px 0px rgba(195,145,255,0.4000)"
    />
    <DataCard
      title="今日存入礼品积分"
      tooltip="计算本日礼品回收存入的礼品积分数量，日均统计最近30天"
      :all="data['存积分']"
      day="52000"
      chain="5%"
      :icon="require('/@/assets/images/home/gift-integral.png')"
      background="#66CEA1"
      boxShadow="0px 3px 10px 0px rgba(102,206,161,0.4000)"
    />
    <DataCard
      title="今日新增会员"
      :all="data['新增会员']"
      day="105"
      chain="2%"
      :icon="require('/@/assets/images/home/user.png')"
      background="#E4CD4F"
      boxShadow="0px 3px 10px 0px rgba(228,205,79,0.4000)"
    />
  </div>

  <div class="row" v-if="data">
    <div class="card-section overview">
      <div class="title">今日经营概况</div>
      <div class="wrap">
        <!--  -->
        <div class="item">
          <div class="line">
            <div class="label">有效销售订单数</div>
            <div class="value">{{ data["有效订单数"] }}</div>
          </div>
          <div class="line">
            <div class="label">日均</div>
            <div class="value">{{ data["日均"] }}</div>
          </div>
          <div class="line">
            <div class="label">日环比</div>
            <div class="value">{{ data["日环比"] }}</div>
          </div>
          <!-- <div class="line">
						<div class="label">实际返还价值</div>
						<div class="value">22.32%</div>
					</div> -->
        </div>
        <!--  -->
        <div class="item">
          <div class="line">
            <div class="label">兑换礼品数</div>
            <div class="value">{{ data["兑换礼品数"] }}</div>
          </div>
          <div class="line">
            <div class="label">回收礼品数</div>
            <div class="value">{{ data["回收礼品数"] }}</div>
          </div>
          <div class="line">
            <div class="label">
              回收礼品价值
              <el-tooltip
                class="box-item"
                effect="dark"
                content="=回收礼品数 * 礼品档案的加权平均单价"
                placement="top-start"
              >
                <img src="/@/assets/images/home/help.png" class="icon" />
              </el-tooltip>
            </div>
            <div class="value">{{ data["回收礼品价值"] }}</div>
          </div>
          <!-- <div class="line">
						<div class="label">实际返还率</div>
						<div class="value">22.32%</div>
					</div> -->
        </div>
        <!--  -->
        <div class="item">
          <div class="line">
            <div class="label">
              收币数

              <el-tooltip
                class="box-item"
                effect="dark"
                content="=实物币+电子投币+扫码支付投币"
                placement="top-start"
              >
                <img src="/@/assets/images/home/help.png" class="icon" />
              </el-tooltip>
            </div>
            <div class="value">{{ data["收币数"] }}</div>
          </div>
          <div class="line">
            <div class="label">
              收币价值
              <el-tooltip
                class="box-item"
                effect="dark"
                content="=收币数 * 标准币单价"
                placement="top-start"
              >
                <img src="/@/assets/images/home/help.png" class="icon" />
              </el-tooltip>
            </div>
            <div class="value">{{ data["收币价值"] }}</div>
          </div>
          <div class="line">
            <div class="label">
              应付兑换价值
              <el-tooltip
                class="box-item"
                effect="dark"
                content="1.回收礼品获得的资产价值 2.=回收获得的资产数量  / 单位货币资产价值"
                placement="top-start"
              >
                <img src="/@/assets/images/home/help.png" class="icon" />
              </el-tooltip>
            </div>
            <div class="value">{{ data["应付兑换价值"] }}</div>
          </div>
          <!-- <div class="line">
						<div class="label">机台利润</div>
						<div class="value">22.32%</div>
					</div> -->
        </div>
      </div>
    </div>
    <div class="card-section tools">
      <div class="title">常用工具</div>
      <div class="wrap">
        <Tools
          class="item"
          title="营业报表"
          link="/#/business/report"
          :icon="require('/@/assets/images/home/t-1.png')"
        />
        <Tools
          class="item"
          title="订单明细"
          link="/#/business/order-detail"
          :icon="require('/@/assets/images/home/t-2.png')"
        />
        <Tools
          class="item"
          title="会员档案"
          link="/#/member/member-archives"
          :icon="require('/@/assets/images/home/t-3.png')"
        />
        <!-- <Tools class="item" title="库存管理" :icon="require('/@/assets/images/home/t-4.png')" />
					<Tools class="item" title="实物币进出记录" :icon="require('/@/assets/images/home/t-5.png')" />
					<Tools class="item" title="抄码表记录" :icon="require('/@/assets/images/home/t-6.png')" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef } from "vue";
import DataCard from "/@/components/data-card.vue";
import Tools from "./tools.vue";
import { getHomeDataApi } from "/@/api/home/index.js";
import moment from "moment";

let today = moment().format("YYYY-M-D");
const data = shallowRef();

const getData = () => {
  getHomeDataApi({
    mer_id: "10001",
    proc_name: "qry_home_data",
    prms: {
      mer_id1: "10001",
      store_id1: "10001_001",
      begin_date: today,
      end_date: today,
    },
  }).then((res) => {
    data.value = res[0];
  });
};

defineExpose({ getData });

getData();
</script>

<style lang="scss" scoped>
.disPlay-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .card {
    width: 24%;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  .card-section {
    width: 49%;
    height: 201px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 18px 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #2f343a;
      margin-bottom: 16px;
    }
  }
  .overview {
    .wrap {
      display: flex;
      justify-content: space-between;
    }
    .item {
      width: 33%;
      height: 124px;
      background: #eef1f6;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label {
          font-size: 13px;
          color: #2f343a;
          display: flex;
          align-items: center;
          .icon {
            width: 14px;
            margin-left: 6px;
          }
        }
        .value {
          font-size: 13px;
          color: #696c70;
        }
      }
    }
  }
  .tools {
    .wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        padding-left: 13px;
        width: 32%;
      }
    }
  }
}
</style>
