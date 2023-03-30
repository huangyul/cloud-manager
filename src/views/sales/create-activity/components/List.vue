<!-- 方案列表页 -->
<script setup>
import Item from "./Item.vue";
</script>

<template>
  <div class="page">
    <div class="title">选择一个方案创建</div>
    <div class="type" v-for="i in 3">
      <div class="type-name">A 日常销售</div>
      <div class="list">
        <Item name="代币销售" class="item" v-for="i in 2"></Item>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 24px 30px;
  .title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2f3339;
  }
  .type {
    margin-top: 30px;
    .type-name {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #63666b;
      display: flex;
      margin-bottom: 13px;
      text-align: center;
      &::before {
        content: "";
        margin-right: 7px;
        display: block;
        width: 4px;
        height: 15px;
        background: #f9c02e;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin: 16px 16px 0 0;
      }
    }
  }
}
</style>
