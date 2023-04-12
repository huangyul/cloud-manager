<!-- 步骤条 -->
<script setup>
import { onMounted, ref } from "vue";

const list = [
  {
    name: "基本信息",
    value: "baseInfo",
  },
  {
    name: "活动详情",
    value: "activityDetail",
  },
  {
    name: "渠道销售",
    value: "salesChannel",
  },
  {
    name: "其他",
    value: "other",
  },
];

const cur = ref("");

onMounted(() => {
  cur.value = list[0].value;
});

const changeCur = (value = "") => {
  cur.value = value;
};

const scrollToSection = (event, type) => {
  event.preventDefault();
  cur.value = type;
  const targetElement = document.querySelector(`#${type}`);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  }
};

defineExpose({
  changeCur,
});
</script>

<template>
  <div class="list">
    <div
      class="item"
      :class="{ active: cur == item.value }"
      v-for="(item, index) in list"
      @click="scrollToSection($event, item.value)"
    >
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
