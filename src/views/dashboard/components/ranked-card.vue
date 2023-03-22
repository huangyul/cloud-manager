<template>
  <div class="section">
    <div class="top-bar">
      <div class="title">今日会员消费排名 <span>TOP10</span></div>
      <div class="tags">
        <div class="item" :class="{ on: type === 0 }" @click="changeType(0)">
          金额
        </div>
        <div class="item" :class="{ on: type === 1 }" @click="changeType(1)">
          耗币
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, $index) in list" :key="$index">
        <div class="label">
          <span
            :class="{
              one: $index === 0,
              two: $index === 1,
              three: $index === 2,
            }"
            >{{ $index + 1 }}</span
          >{{ item.nick_name }}({{ item.leag_no }})
        </div>
        <div class="value">{{ item.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, ref } from "vue";
import { getHomeDataApi } from "/@/api/home/index.js";
import moment from "moment";

let today = moment().format("YYYY-M-D");
const list = shallowRef([]);
const type = ref(0);

const changeType = (value) => {
  if (value === type.value) return;
  type.value = value;
  getData();
};

const getData = () => {
  getHomeDataApi({
    mer_id: "10001",
    proc_name: type.value
      ? "qry_home_data_leager_rank_coin"
      : "qry_home_data_leager_rank_amount",
    prms: {
      mer_id1: "10001",
      store_id1: "10001_001",
      begin_date: today,
      end_date: today,
    },
  }).then((data) => {
    list.value = data.slice(0, 10);
  });
};
defineExpose({ getData });

getData();
</script>

<style lang="scss" scoped>
.section {
  padding: 18px 20px;
  height: 450px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  .title {
    font-size: 16px;
    color: #2f343a;
    font-weight: bold;
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
      font-size: 12px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 20px;
      background: #ff4d4d;
      box-shadow: 0px 3px 10px 0px rgba(251, 114, 104, 0.2);
      border-radius: 12px 0px 12px 0px;
    }
  }
  .tags {
    display: flex;
    .item {
      cursor: pointer;
      padding: 5px 16px;
      background: #eef1f6;
      border-radius: 4px;
      margin-left: 6px;
      font-size: 14px;
      color: #696c70;
    }
    .on {
      color: #fff;
      background: #4996f3;
    }
  }
}
.list {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    margin-bottom: 18px;
    .label {
      color: #2f3339;
      span {
        display: inline-block;
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        background: #ebeced;
        border-radius: 50%;
        margin-right: 20px;
      }
      .one {
        background: #ff4d4d;
        color: #fff;
      }
      .two {
        background: #ff7f4d;
        color: #fff;
      }
      .three {
        background: #f9c02e;
        color: #fff;
      }
    }
    .value {
      color: #696c70;
      font-weight: bold;
    }
  }
}
</style>
