<!-- tagview -->
<template>
  <ul>
    <li class="active"><span>首页</span></li>
    <li><span>首页</span></li>
    <li><span>首页</span></li>
    <li><span>首页</span></li>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  ul {
    height: 40px;
    display: flex;
    align-items: flex-end;
    li:not(:last-child) {
      margin-right: 2px;
    }
    li {
      width: 72px;
      height: 32px;
      background: rgba($color: #000000, $alpha: 0.1);
      border-radius: 6px 6px 0px 0px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
      span {
        line-height: 32px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
    }
    .active {
      background: rgba($color: #000000, $alpha: 0.25);
      color: #ffe400;
      font-family: MicrosoftYaHei-Bold;
    }
  }
</style>
