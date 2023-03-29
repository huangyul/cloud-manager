<template>
  <div class="box">
    <div class="title">选择一种控制模式创建</div>
    <div class="mode-list">
      <Card type="moni" @on-click="onClick"></Card>
      <Card type="caipiao" @on-click="onClick"></Card>
      <Card type="lipin" @on-click="onClick"></Card>
      <Card type="zhongxing" @on-click="onClick"></Card>
    </div>

    <MyDialog
      v-model:isDialogShow="isDialogShow"
      :dialogWidth="1200"
      title="选择平台机种"
    >
      <template #footer-right>
        <button class="btn btn-blue ml12">保存</button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup>
import Card from "./components/Card.vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import { ref } from "vue";

const onClick = (value) => {
  console.log(value);
};

/* 弹窗 */
let isDialogShow = ref(true);
const openDialog = () => {
  isDialogShow.value = true;
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0 30px;
  height: 100%;
  background: #f6f8fa;
  .title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2f3339;
    padding: 24px 0;
  }
  .mode-list {
    display: flex;
    flex-wrap: wrap;
    .mode-card {
    }
  }
}
</style>
