<template>
  <div
    class="card"
    :style="{
      background: background,
      'box-shadow': boxShadow,
    }"
  >
    <el-tooltip
      v-if="tooltip"
      class="box-item"
      effect="dark"
      :content="tooltip"
      placement="top-start"
    >
      <img src="/@/assets/images/home/board-help.png" class="que" />
    </el-tooltip>
    <!--  -->
    <div class="top">
      <img :src="icon" class="icon" />
      <div class="basic">
        <div class="title">{{ title }}</div>
        <div class="num">{{ all }}</div>
      </div>
    </div>
    <!--  -->
    <!-- <div class="bottom">
			<div class="item">日均: {{ day }}</div>
			<div class="item">日环比: {{ chain }}<img src="@/assets/images/home/up.png" class="icon" /></div>
		</div> -->
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  background: {
    type: String,
  },
  boxShadow: {
    type: String,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  all: {
    type: String,
    default: 0,
  },
  day: {
    type: String,
    default: 0,
  },
  chain: {
    type: String,
    default: 0,
  },
  tooltip: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card {
  // height: 110px; TODO 底部不显示，暂时屏蔽改代码
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  .que {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin-right: 12px;
    }
    .basic {
      flex: 1;
      font-weight: bold;

      .title {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 6px;
      }
      .num {
        font-size: 32px;
        line-height: 32px;
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      .icon {
        width: 9px;
        margin-left: 4px;
      }
    }
  }
}
</style>
