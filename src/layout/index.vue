<template>
  <div>
    1231233
    <MyHeader></MyHeader>
    <div class="container">
      <Aside class="aside"></Aside>
      <RouterView class="content"></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MyHeader from '/@/layout/header/index.vue'
  import Aside from './aside/index.vue'
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    .aside {
      width: 90px;
    }
    .content {
      flex: 1;
    }
  }
</style>
