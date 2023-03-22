<template>
  <div class="section">
    <div class="top-bar">
      <div class="title">项目人次趋势</div>
      <div class="tags">
        <div class="item">今日</div>
        <div class="item">近3天</div>
        <div class="item on">近7天</div>
        <div class="item">近30天</div>
      </div>
    </div>
    <div class="chart-dom" ref="chartDomRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartDomRef = ref();

const init = () => {
  const myChart = echarts.init(chartDomRef.value);

  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["product", "淘气堡", "玩具屋", "沙地"],
      source: [
        { product: "08-04", 淘气堡: 86.4, 玩具屋: 65.2, 沙地: 82.5 },
        { product: "08-05", 淘气堡: 72.4, 玩具屋: 53.9, 沙地: 39.1 },
        { product: "08-06", 淘气堡: 43.3, 玩具屋: 85.8, 沙地: 93.7 },
        { product: "08-07", 淘气堡: 83.1, 玩具屋: 73.4, 沙地: 55.1 },
        { product: "08-08", 淘气堡: 86.4, 玩具屋: 65.2, 沙地: 82.5 },
        { product: "08-09", 淘气堡: 72.4, 玩具屋: 53.9, 沙地: 39.1 },
        { product: "08-10", 淘气堡: 72.4, 玩具屋: 53.9, 沙地: 39.1 },
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.section {
  padding: 18px 20px;
  height: 500px;
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
  }
  .tags {
    display: flex;
    .item {
      padding: 8px 16px;
      background: #eef1f6;
      border-radius: 4px;
      margin-left: 6px;
      font-size: 14px;
      color: #696c70;
    }
    .on {
      background: #4996f3;
      color: #fff;
    }
  }
}
.chart-dom {
  height: 450px;
}
</style>
