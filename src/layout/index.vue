<template>
  <div>
    <MyHeader></MyHeader>
    <div class="container">
      <Aside class="aside"></Aside>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyHeader from "./components/Header.vue";
import Aside from "./components/Aside.vue";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 40px);
  .aside {
    width: 90px;
  }
  .content {
    flex: 1;
    height: calc(100vh - 40px);
    overflow-y: auto;
  }
}
</style>
