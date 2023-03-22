<template>
  <div>
    <MyHeader></MyHeader>
    <div class="container">
      <Aside class="aside"></Aside>
      <RouterView class="content"></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyHeader from "./components/Header.vue";
import Aside from "./components/Aside.vue";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: calc(100vh - 40px);
  .aside {
    width: 90px;
  }
  .content {
    flex: 1;
  }
}
</style>
