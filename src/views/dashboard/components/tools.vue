<template>
  <div class="item" @click="toLink">
    <img :src="icon" class="icon" />
    <div class="name">{{ title }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  link: {
    type: String,
    default: "",
  },
});

const toLink = () => {
  window.top.postMessage(
    {
      action: "newPage",
      title: "会员详情",
      url: props.link,
    },
    "*"
  );
};
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
  height: 60px;
  background: #eef1f6;
  margin-bottom: 11px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #696c70;
  font-weight: bold;
  .icon {
    width: 32px;
    height: 32px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 7px;
    display: block;
  }
}
</style>
