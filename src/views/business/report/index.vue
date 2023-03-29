<template>
  <div class="page">
    <div class="actions">
      <div class="date-btn">
        <div class="active">未结账日期</div>
        <div class="">全部日期</div>
      </div>
      <el-date-picker class="ml12 mr16"></el-date-picker>
      <button class="mr12 checkout">结账</button>
      <button class="export">导出</button>
    </div>

    <HeaderSection />

    <div class="wrap">
      <div class="section">
        <div class="tabs">
          <div
            class="item"
            :class="{ on: tabIndex === 0 }"
            @click="tabIndex = 0"
          >
            收银员录入
          </div>
          <div class="bor"></div>
          <div
            class="item"
            :class="{ on: tabIndex === 1 }"
            @click="tabIndex = 1"
          >
            营业额组成
          </div>
        </div>

        <component :is="tabIndex ? SimpleTable : ComplexTable" />
      </div>
      <!-- 排行榜 -->
      <div class="rankings">
        <Rankings />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderSection from "./components/header-section.vue";
import Rankings from "./components/rankings/index.vue";
import ComplexTable from "./components/complex-table.vue";
import SimpleTable from "./components/simple-table.vue";

const tabIndex = ref(0);
</script>

<style lang="scss" scoped>
.page {
  background: #f8fafc;
  padding: 16px;
  .actions {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .date-btn {
      display: flex;
      div {
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #318cf9;
        background: #ffffff;
        border: 1px solid #4996f3;
        cursor: pointer;
      }
      div:nth-child(1) {
        width: 110px;
        border-radius: 4px 0px 0px 4px;
      }
      div:nth-child(2) {
        width: 110px;
        border-radius: 0px 4px 4px 0px;
      }
      .active {
        background: #318cf9;
        color: #ffffff;
        font-weight: bold;
      }
    }
    .checkout {
      cursor: pointer;
      width: 80px;
      height: 36px;
      background: #ff6161;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      &:hover {
        opacity: 0.8;
      }
    }
    .export {
      cursor: pointer;
      width: 80px;
      height: 36px;
      background: #dddddd;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #5e6166;
      border: none;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
.wrap {
  display: flex;
  .section {
    flex: 1;
    width: calc(100% - 16px - 320px);
    .tabs {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .item {
        font-size: 15px;
        font-weight: bold;
        color: #95979a;
        position: relative;
        z-index: 3;
      }
      .bor {
        width: 1px;
        height: 16px;
        background: #c4c4c4;
        margin: 0 20px;
      }
      .on {
        color: #2f3339;
        font-size: 16px;
        &::after {
          content: "";
          display: block;
          width: 84px;
          height: 6px;
          background: #f9c02e;
          border-radius: 3px;
          position: absolute;
          bottom: -3px;
          left: -2px;
          z-index: 2;
        }
      }
    }
  }
  .rankings {
    width: 320px;
    margin-left: 16px;
  }
}
</style>
