<!-- 选择商品便签弹窗 -->
<template>
  <div class="itmes-page">
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
          <div>选择商品标签</div>
          <div class="close" @click="close">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>
      <div class="pt11 pb11 pr20 pl20 flex-row-between">
        <div class="left mr16">
          <div class="search">
            <input class="input" type="text" placeholder="搜索标签" /><span
              class="tips ml19"
              >（请选择标签，可多选）</span
            >
          </div>
          <div class="content">
            <el-scrollbar height="408px">
              <div class="item" v-for="(item, index) in tagList" :key="index">
                <div class="item-left">{{ item.name }}</div>
                <div class="item-right">
                  <div
                    :class="[
                      'right-item',
                      { 'right-item-active': index % 2 == 0 },
                    ]"
                    v-for="tag in item.tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="right">
          <div class="total">
            <div class="total-num">已选标签（3）</div>
            <button>清空</button>
          </div>
          <div class="content">
            <div class="title">用途：</div>
            <div class="value-list">
              <div class="value" v-for="i in 3" :key="i">
                礼品兑换<el-icon><Close /></el-icon>
              </div>
            </div>
            <div class="title">用途：</div>
            <div class="value-list">
              <div class="value" v-for="i in 3" :key="i">
                礼品兑换<el-icon><Close /></el-icon>
              </div>
            </div>
          </div>
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

const tagList = ref([
  { name: "用途", tags: ["礼品兑换", "彩票兑换", "礼物机"] },
  { name: "五一优惠活动", tags: ["不用劳动", "要努力劳动"] },
  {
    name: "仓库",
    tags: [
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
      "仓库1",
    ],
  },
]);

// 表格数据
let tableData = ref([{ id: 1 }]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);

const searchList = ref({
  name: "",
});

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
.items-page {
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
  width: 604px;
  .search {
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
    width: 604px;
    height: 440px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 16px;
    overflow: auto;
    .item {
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: stretch;
      .item-left {
        width: 160px;
        background: #eef1f6;
        margin-right: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #2f343a;
        margin-bottom: 6px;
      }
      .item-right {
        margin-bottom: 6px;
        width: 426px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        background: #eef1f6;
        padding: 6px 14px 12px 14px;

        .right-item {
          padding: 7px;
          font-size: 13px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #696c70;
          margin-right: 6px;
          margin-top: 6px;
          cursor: pointer;
        }
        .right-item-active {
          padding: 7px;
          color: #ffffff;
          background: #4996f3;
          border-radius: 4px;
        }
      }
    }
  }
}
.right {
  width: 240px;
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 16px;
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
    width: 240px;
    height: 440px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 13px 12px;
    .title {
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #434343;
    }
    .title:not(:first-child) {
      margin-top: 16px;
    }
    .value-list {
      margin-top: 12px;
      .value {
        width: 216px;
        background: #e1eefd;
        border-radius: 4px;
        padding: 8px 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 12px;
        color: #318cf9;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .value:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
