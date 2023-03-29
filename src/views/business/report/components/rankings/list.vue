<template>
  <div class="list">
    <div class="item" v-for="(item, $index) in data" :key="$index">
      <div class="label">
        <span
          :class="{ one: $index === 0, two: $index === 1, three: $index === 2 }"
          >{{ $index + 1 }}</span
        >{{ item.label }}
      </div>
      <div class="value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});
const user = [
  {
    name: "焚心惧魂",
    value: "135348",
    num: 8521,
  },
  {
    name: "終極幻想",
    value: "6557",
    num: 8020,
  },
  {
    name: "旧梦之忆",
    value: "58797",
    num: 7521,
  },
  {
    name: "冷落 ﹌",
    value: "52171",
    num: 6521,
  },
  {
    name: "大爱鹿晗",
    value: "47648",
    num: 6266,
  },
  {
    name: "柔云雪绿",
    value: "115060",
    num: 6205,
  },
  {
    name: "魔幻天使",
    value: "76688",
    num: 6020,
  },
  {
    name: "糟糠宝宝",
    value: "108513",
    num: 6001,
  },
  {
    name: "窗外的风",
    value: "44141",
    num: 5800,
  },
  {
    name: "舊情複燃",
    value: "56024",
    num: 5789,
  },
];
</script>

<style lang="scss" scoped>
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
