<template>
  <div class="aside">
    <div class="menu">
      <RouterLink class="menu-item" to="demo-a">pagea</RouterLink>
      <RouterLink class="menu-item" to="demo-b">pageb</RouterLink>
      <RouterLink class="menu-item" to="demo-c">pagec</RouterLink>
      <RouterLink class="menu-item" to="demo-d">paged</RouterLink>
    </div>
    <div class="shop-info">
      <div>莫莉幻想</div>
      <div>中山店</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.aside {
  width: 90px;
  background: #767676;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    .menu-item {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.8;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
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
