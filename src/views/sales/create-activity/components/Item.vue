<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  name: String,
  type: String,
});
</script>

<template>
  <div class="box">
    <img :src="icon" />
    <p class="name">{{ name }}</p>
    <div class="box-btn">立即创建</div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 180px;
  height: 200px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  .name {
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2f3339;
  }
  .box-btn {
    width: 120px;
    height: 32px;
    background: #4996f3;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
