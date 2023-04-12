<!-- 选择销售页面弹窗 -->
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
      <div class="pt11 pb11 pr20 pl20 flex-row-between">
        <div class="left mr16">
          <div class="search">
            <div class="search-text">请选择销售页面，可多选</div>
            <input class="input" type="text" placeholder="搜索" />
          </div>
          <div class="content">
            <el-scrollbar height="440px"> </el-scrollbar>
          </div>
        </div>
        <div class="right">
          <div class="total">
            <div class="total-num">已选页面（3）</div>
            <button>清空</button>
          </div>
          <div class="content"></div>
        </div>
      </div>
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
  .input-tags {
    width: 100%;
    height: 32px;
    background: #ffffff;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    padding: 4px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    .tag-list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .tag:not(:last-child) {
        margin-right: 4px;
      }
      .tag {
        background: #e1eefd;
        height: 24px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #318cf9;
        padding: 7px 8px 5px 8px;
      }
      .el-icon {
        cursor: pointer;
      }
    }
    .choose-btn {
      height: 24px;
      background: #4996f3;
      border-radius: 2px;
      color: #ffffff;
      line-height: 24px;
      border: none;
    }
  }
}

.left {
  width: 554px;
  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .search-text {
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #696c70;
    }
    .input {
      width: 208px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      outline: none;
      font-size: 14px;
      padding: 0 9px;
    }
    .tips {
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #97999c;
    }
    input::input-placeholder {
      color: #97999c;
    }
  }
  .content {
    height: 440px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 16px;
    overflow: auto;
  }
}
.right {
  width: 300px;
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    .total-num {
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #696c70;
    }
    button {
      width: 50px;
      height: 28px;
      background: #ebeced;
      border: 1px solid #dddddd;
      border-radius: 4px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #5e6166;
    }
  }
  .content {
    height: 440px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 13px 12px;
  }
}
</style>
