<!-- 步骤条 -->
<script setup>
const list = [
  {
    name: "基本信息",
    value: "basic",
  },
  {
    name: "活动详情",
    value: "detail",
  },
  {
    name: "渠道销售",
    value: "channel",
  },
  {
    name: "标签方案",
    value: "tags",
  },
  {
    name: "其他",
    value: "other",
  },
];
</script>

<template>
  <div class="list">
    <div class="item active" v-for="(item, index) in list">
      {{ item.name }}
      <el-icon :size="9" v-if="index + 1 <= list.length - 1"
        ><ArrowRight
      /></el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  .item {
    margin: 0 25px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #696c70;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      position: absolute;
      right: -25px;
    }
  }
  .active {
    color: #318cf9;
    &::after {
      content: "";
      width: 6px;
      height: 6px;
      background: #4996f3;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
    }
  }
}
</style>
