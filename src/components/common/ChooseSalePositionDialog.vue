<!-- 选择销售页面弹窗--带位置修改 -->
<template>
  <div class="page">
    <el-dialog
      v-model="props.isShow"
      :destroy-on-close="true"
      :width="900"
      :show-close="false"
      :before-close="close"
    >
      <!-- header区 -->
      <template #header>
        <div class="header">
          <div>选择销售页面</div>
          <div class="close" @click="close">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>
      <VueDraggableNext :list="list" @change="log">
        <el-row>
          <el-col v-for="i in list" :key="i.id" :span="5">{{ i.name }}</el-col>
        </el-row>
      </VueDraggableNext>
      <!-- footer区 -->
      <template #footer>
        <div class="footer">
          <button class="btn-grey btn mr12" @click="close">关闭</button>
          <button class="btn-blue btn">保存</button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import { ref } from "vue";
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:isShow", "confirm"]);

// 关闭弹窗
const close = () => {
  emits("update:isShow", false);
};

// 点击确定按钮
const onConfirm = () => {
  emits("confirm");
};

const list = ref([
  { id: 1, name: "Card 1" },
  { id: 2, name: "Card 2" },
  { id: 3, name: "Card 3" },
  { id: 4, name: "Card 4" },
  { id: 5, name: "Card 5" },
  { id: 6, name: "Card 6" },
  { id: 7, name: "Card 7" },
  { id: 8, name: "Card 8" },
  { id: 9, name: "Card 9" },
  { id: 10, name: "Card 10" },
]);
const log = (event) => {
  console.log(event);
};
</script>

<style lang="scss" scoped>
.page {
  ::v-deep .el-dialog {
    border-radius: 4px;
    background: #f8fafc;
  }
  ::v-deep .el-dialog__header {
    padding: 0;
    margin: 0;
  }
  ::v-deep .el-dialog__body {
    padding: 0;
  }
  .header {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    height: 39px;
    background: #f1f2f3;
    box-shadow: 0px 1px 0px 0px #dddddd;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #5e6166;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    .tag {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      padding: 6px 10px;
      border-radius: 3px;
    }
    .green {
      background: #0cba63;
    }
    .red {
      background: #ff4f4f;
    }
    .orange {
      background: #ff9604;
    }
    .close {
      color: #99a2a7;
      opacity: 0.75;
      cursor: pointer;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
