<template>
  <div class="box">
    <div
      :class="[
        { item: props.type == 'box' },
        { 'item-normal': props.type == 'normal' },
        { 'item-active': index + 1 == currentIndex && props.type == 'box' },
        {
          'item-normal-active':
            index + 1 == currentIndex && props.type == 'normal',
        },
      ]"
      v-for="(i, index) in data"
      :key="index"
      @click="onClick(index, i)"
    >
      {{ i.label }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["click"]);
const props = defineProps({
  // tabs数组
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  // 样式
  type: {
    type: String,
    default: "box",
  },
});

// 当前是第几个tag活跃
const currentIndex = ref(1);

// 标签被点击
const onClick = (index, item) => {
  if (currentIndex.value == index + 1) {
    return;
  }
  currentIndex.value = index + 1;
  emit("click", item.value);
};
</script>

<style lang="scss" scoped>
.box {
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: flex-end;
  .item:not(:last-child) {
    margin-right: 4px;
  }
  .item-normal {
    cursor: pointer;
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2f3339;
    opacity: 0.7;
    padding: 16px 10px;
    margin: 0 16px;
  }
  .item-normal-active {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #318cf9;
    border-bottom: 3px solid #318cf9;
    padding-bottom: 12px;
  }
  .item {
    cursor: pointer;
    text-align: center;
    min-width: 90px;
    background: #ebeced;
    line-height: 32px;
    border: 1px solid #dddddd;
    padding: 0 12px;
    border-radius: 4px 4px 0px 0px;
    height: 32px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #5e6166;
    transition: all 0.3 ease;
  }
  .item-active {
    background: #4996f3;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    border: 1px solid #4996f3;
  }
}
</style>
