<!-- 选择商品弹窗 -->
<template>
  <div class="items-choose-page">
    <el-dialog
      v-model="props.isChooseDialogShow"
      :destroy-on-close="true"
      :width="1000"
      :show-close="false"
      :before-close="close"
      style="height: 640px"
    >
      <!-- header区 -->
      <template #header>
        <div class="header">
          <div>选择商品</div>
          <div class="close" @click="close">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>

      <!-- 条件区域 -->
      <div class="pr24 pl24 pt16">
        <el-row>
          <el-col :span="8">
            <el-form-item :label-width="120" label="商品名称">
              <el-input v-model="searchList.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label-width="120" label="商品编号">
              <el-input v-model="searchList.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label-width="120" label="商品类别">
              <el-select v-model="searchList.type_id">
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label-width="120" label="供应商">
              <el-select v-model="searchList.supply_id">
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              :label-width="120"
              label="商品名称标签"
              style="margin-bottom: 10px"
            >
              <div class="input-tags">
                <div class="tag-list">
                  <div class="tag" v-for="i in 2" :key="i">
                    用途：礼品兑换<el-icon class="ml4"><Close /></el-icon>
                  </div>
                </div>
                <button
                  type="button"
                  class="choose-btn"
                  @click="isChooseTagDialogShow = true"
                >
                  选择
                </button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="flex-row-right mt2">
          <button class="btn-blue btn mr12" @click="doSearch()">查询</button>
          <button class="btn-grey btn" @click="onReset()">重置</button>
        </div>
      </div>

      <div class="table p16">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          height="400"
          border
          @sort-change="sortChange"
          @selection-change="onSelectChange"
          empty-text="暂无数据"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column
            label="商品名称"
            min-width="160"
            sortable="custom"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            label="商品编号"
            prop="code"
            min-width="120"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="商品类别"
            prop="type_name"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            min-width="120"
            label="采购价"
            prop="avg_cost"
            :show-overflow-tooltip="true"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="单位"
            prop="unit_name"
            min-width="100"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable="custom"
            label="供应商"
            prop="supply_name"
          ></el-table-column>
        </el-table>

        <!-- 分页-->
        <div class="page">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            small="small"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="doSearch()"
            @current-change="doSearch()"
          />
        </div>
      </div>

      <!-- footer区 -->
      <template #footer>
        <div class="footer">
          <button class="btn-grey btn mr12" @click="close">关闭</button>
          <button class="btn-blue btn" @click="onConfirm">保存</button>
        </div>
      </template>
    </el-dialog>

    <ChooseGoodsTagsDialog
      v-model:isShow="isChooseTagDialogShow"
    ></ChooseGoodsTagsDialog>
  </div>
</template>

<script setup>
import { fetchGoodList } from "@/api/amescloud";
import { onMounted, ref, watch } from "vue";
import ChooseGoodsTagsDialog from "./ChooseGoodsTagsDialog.vue";
const props = defineProps({
  isChooseDialogShow: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:isChooseDialogShow", "confirm"]);

// 表格数据
let tableData = ref([]);
let pageSize = ref(10);
let currentPage = ref(1);
let total = ref(0);
let selectData = ref([]);

const onSelectChange = (selection) => {
  selectData.value = selection;
};

const searchList = ref({
  name: "",
  code: "",
  type_id: "",
  supply_id: "",
});

const doSearch = async () => {
  const res = await fetchGoodList({
    ResultSerialize: false,
    ParamDict: {
      org_id: "4U4SZ1JN9Z7Z153YYXAF6KWM512Y75LLSD1FHD", ///这个参数是必须的
      ...searchList.value,
    },
    PageSetting: {
      page_num: currentPage.value,
      page_size: pageSize.value,
    },
  });
  tableData.value = res.List;
  total.value = res.Total.TotalRows;
};

const onReset = () => {
  for (let key in searchList.value) {
    searchList.value[key] = "";
  }
};

// 关闭弹窗
const close = () => {
  emits("update:isChooseDialogShow", false);
};

// 点击确定按钮
const onConfirm = () => {
  emits("confirm", selectData.value);
  close();
};

/**
 * 商品便签
 */
let isChooseTagDialogShow = ref(false);

watch(
  () => props.isChooseDialogShow,
  (value) => {
    if (value) {
      doSearch();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.items-choose-page {
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
      cursor: pointer;
    }
  }
}
</style>
