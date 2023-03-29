<!-- 仓库管理 -->
<template>
  <div>
    <!-- 顶部操作栏 -->
    <div class="action">
      <!-- TODO 判断用户是否有新建权限 -->
      <button class="btn btn-green flex flex-col-center" @click="onCreate">
        <el-icon class="mr6"><Plus /></el-icon>新建仓库
      </button>
    </div>
    <div class="page">
      <!-- 搜索栏 -->
      <MySearch
        :searchList="searchList"
        class="mb16"
        :options="options"
        @search="getSearchCondition"
      ></MySearch>
      <!-- 表格 -->
      <div class="table">
        <el-table :data="tableData" border empty-text="暂无数据">
          <el-table-column label="名称" prop="fname">
            <template #default="{ row }">
              <span class="can-click" @click="onEdit(row)">{{
                row.fname
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="fcode"> </el-table-column>
          <el-table-column label="类型" prop="wh_type">
            <template #default="{ row }">
              <span v-if="row.wh_type == 1">普通仓库</span>
              <span v-if="row.wh_type == 2">礼品机仓库</span>
              <span v-if="row.wh_type == 3">实物币仓库</span>
            </template>
          </el-table-column>
          <el-table-column label="备注"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template #default="{ row }">
              <span v-if="row.status == 1">启用</span>
              <span v-if="row.status == 0">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="修改人"></el-table-column>
          <el-table-column label="修改时间"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <!-- TODO 判断用户是否有删除权限 -->
              <button class="btn btn-blue btn-table" @click="onDelete(row)">
                删除
              </button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页-->
        <div class="page">
          <el-pagination
            v-model:currentPage="currentPage"
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

      <!-- 删除弹窗 -->
      <DeleteDialog
        v-model:deleteDialog="deleteDialog"
        :data="currentItem"
        @reflesh="deleteSuccess()"
      ></DeleteDialog>

      <!-- 新增弹窗 -->
      <MyDialog
        :title="editDialogTitle"
        v-model:isDialogShow="editDialog"
        :dialogWidth="800"
        :destroy-on-close="true"
      >
        <template #default>
          <Form ref="addForm" v-if="editDialog" :data="currentItem"></Form>
        </template>
        <template #footer-right>
          <button class="btn btn-blue ml12" @click="onSubmit">保存</button>
        </template>
      </MyDialog>
    </div>
  </div>
</template>

<script setup>
import MySearch from "/@/components/common/MySearch.vue";
// import { fetchWarehouseCode, getWarehouseList } from '/@/api/warehouse'
import { onMounted, ref } from "vue";
import MyDialog from "/@/components/common/MyDialog.vue";
import Form from "./components/form.vue";
import DeleteDialog from "./components/deleteDialog.vue";
import { ElMessage } from "element-plus";

const searchList = ref({
  fname: {
    type: "text",
    value: "",
    label: "名称",
    placeholder: " ",
  },
  fcode: {
    type: "text",
    value: "",
    label: "编号",
    placeholder: " ",
  },
  wh_type: {
    type: "select",
    value: -1,
    label: "类型",
    noclearable: true,
  },
  status: {
    type: "select",
    value: -1,
    label: "状态",
    noclearable: true,
  },
});
const options = {
  status: [
    { value: -1, label: "全部" },
    { value: 1, label: "启用" },
    { value: 0, label: "禁用" },
  ],
  // -1全部、1普通仓库、2礼品机仓库、3实物币仓库
  wh_type: [
    { value: -1, label: "全部" },
    { value: 1, label: "普通仓库" },
    { value: 2, label: "礼品机仓库" },
    { value: 3, label: "实物币仓库" },
  ],
};
let searchCondition = ref({});
// 获取搜索条件
const getSearchCondition = (value) => {
  searchCondition.value = value;
  // 默认页面加载会搜索一次
  doSearch();
};

let tableData = ref([]);

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let currentItem = ref(null);

const doSearch = async () => {
  // let res = await getWarehouseList({
  //   condition: searchCondition.value,
  //   page_size: pageSize.value,
  //   page_index: currentPage.value,
  //   total: -1,
  // })
  // tableData.value = res.warehouses
  // total.value = res.total
};

// 删除弹窗
let deleteDialog = ref(false);
// 点击删除按钮
const onDelete = (row) => {
  currentItem.value = row;
  deleteDialog.value = true;
};
// 删除成功
const deleteSuccess = () => {
  deleteDialog.value = false;
  ElMessage.success("删除仓库成功");
  doSearch();
};

// 新增/编辑仓库
let editDialog = ref(false);
let editDialogTitle = ref("");
const addForm = ref(null);
const onSubmit = async () => {
  // await addForm.value.sumbit()
  editDialog.value = false;

  doSearch();
};
const onCreate = () => {
  editDialogTitle.value = "新增仓库";
  currentItem.value = null;
  editDialog.value = true;
};
const onEdit = (row) => {
  editDialogTitle.value = "编辑仓库";
  currentItem.value = row;
  editDialog.value = true;
};

// 页面初始化
const init = async () => {};

onMounted(async () => {});
</script>

<style lang="scss" scoped>
.action {
  padding: 9px 16px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
