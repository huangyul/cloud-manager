<template>
  <div class="card">
    <div class="img">
      <img :src="data?.imgUrl" />
    </div>
    <div class="right">
      <div class="desc">
        <div class="title">{{ data?.title }}</div>
        <div class="content">{{ data?.desc }}</div>
      </div>
      <div class="button" @click="emit('onClick', props.type)">立即创建</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "caipiao",
  },
});

const data = ref({});

const emit = defineEmits(["onClick"]);

onMounted(() => {
  switch (props.type) {
    case "caipiao": {
      data.value = {
        title: "彩票机",
        desc: "例如：钓鱼机、怪兽猎人、南瓜大本营等",
        imgUrl: require("/@/assets/image/equipment/caipiao.png"),
      };
      break;
    }
    case "lipin": {
      data.value = {
        title: "礼品机",
        desc: "例如：娃娃机、扭蛋机、挖糖机等",
        imgUrl: require("/@/assets/image/equipment/lipin.png"),
      };
      break;
    }
    case "moni": {
      data.value = {
        title: "模拟机",
        desc: "例如：卡丁车、太鼓达人、铁拳等",
        imgUrl: require("/@/assets/image/equipment/moni.png"),
      };
      break;
    }
    case "zhongxing": {
      data.value = {
        title: "彩票机",
        desc: "例如：黄金堡、马戏团、推币机等",
        imgUrl: require("/@/assets/image/equipment/zhongxing.png"),
      };
      break;
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  width: 480px;
  height: 162px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  padding: 20px 26px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 16px;
  margin-bottom: 16px;
  .img {
    width: 80px;
    height: 80px;
    margin-right: 22px;
  }
  .right {
    .desc {
      padding-top: 11px;
      height: 80px;
      .title {
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2f3339;
        margin-bottom: 15px;
      }
      .content {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #696c70;
      }
    }
    .button {
      display: inline-block;
      background: #4996f3;
      border-radius: 4px;
      padding: 10px 32px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
