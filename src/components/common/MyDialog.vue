<template>
  <div class="dialog-page">
    <el-dialog
      v-model="props.isDialogShow"
      :destroy-on-close="true"
      :width="props.dialogWidth"
      :show-close="false"
      :before-close="close"
    >
      <!-- header区 -->
      <template #header>
        <div class="header">
          <div>
            {{ props.title }}
            <span
              v-if="props.titleStatus.text"
              :class="[
                { green: props.titleStatus.type == 'green' },
                { red: props.titleStatus.type == 'red' },
                { orange: props.titleStatus.type == 'orange' },
                'tag',
                'ml7',
              ]"
            >
              {{ props.titleStatus.text }}
            </span>
          </div>
          <div class="close" @click="close">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>
      <!-- 中间内容区 -->
      <div :style="{ height: props.height + 'px' }" class="content-box">
        <slot></slot>
      </div>
      <!-- footer区 -->
      <template #footer>
        <div class="footer">
          <slot name="footer-left"></slot>
          <button class="btn-grey btn" @click="close">关闭</button>
          <button
            v-if="props.confirmButton"
            class="btn-blue btn ml8"
            @click="onConfirm"
          >
            {{ props.confirmButton }}
          </button>
          <slot name="footer-right"></slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  isDialogShow: {
    type: Boolean,
    default: false,
  },
  dialogWidth: {
    type: [Number, String],
    default: "50%",
  },
  height: {
    type: Number,
    default: 520,
  },
  title: {
    type: String,
    default: "弹窗",
  },
  // 标题侧标的状态
  titleStatus: {
    type: Object,
    default() {
      return {
        text: "",
        type: "success", // success | error
      };
    },
  },
  confirmButton: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:isDialogShow", "confirm"]);

// 关闭弹窗
const close = () => {
  emits("update:isDialogShow", false);
};

// 点击确定按钮
const onConfirm = () => {
  emits("confirm");
};
</script>

<style lang="scss" scoped>
.dialog-page {
  ::v-deep .el-dialog {
    border-radius: 4px;
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
  .content-box {
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
