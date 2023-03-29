<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" @closed="closed">
    <div @click="close">dialog</div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { ElDialog } from "element-plus";

const props = defineProps({
  destory: {
    type: Function,
  },
});

const dialogVisible = ref(true);

const closed = () => {
  props.destory ? props.destory() : null;
};

const close = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
