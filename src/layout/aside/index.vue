<template>
  <div class="aside">
    <div class="menu"></div>
    <div class="shop-info">
      <div>莫莉幻想</div>
      <div>中山店</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .aside {
    height: calc(100vh - 40px);
    width: 90px;
    background: #767676;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
    .shop-info {
      border-top: 1px solid rgba($color: #e6e6e6, $alpha: 0.1);
      padding-top: 14px;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.6;
    }
  }
</style>
