<!-- 仓库新增表单组件 -->
<template>
  <div class="page">
    <el-form :label-width="120" :model="form" :rules="rules" ref="ruleFormRef">
      <el-row justify="space-between">
        <el-col :span="12">
          <el-form-item label="名称" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="fcode">
            <el-input
              v-model="form.fcode"
              :maxlength="6"
              :minlength="6"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select v-model="form.wh_type" class="w240">
              <el-option
                v-for="i in typeList"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="1" size="large">启用</el-radio>
              <el-radio :label="0" size="large">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              :rows="3"
              type="textarea"
              resize="none"
              v-model="form.summary"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改人">
            <el-input v-model="form.modify_user" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改时间">
            <el-input v-model="form.modify_time" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
// import {
//   createWarehouse,
//   fetchWarehouseCode,
//   getWarehouseDetailById,
//   updateWarehouse,
// } from '/@/api/warehouse'
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});
const ruleFormRef = ref(null);
const typeList = [
  { value: 1, label: "普通仓库" },
  { value: 2, label: "礼品机仓库" },
  { value: 3, label: "实物币仓库" },
];
const form = ref({
  user_id: "USER001",
  fcode: "", // 编号
  fname: "", // 名称
  wh_type: 1, // 仓库类型：1普通仓库、2礼品机仓库、3实物币仓库
  contact: "", // 联系人
  tel: "", // 联系电话
  summary: "", // 备注
  status: 1, // 状态：1-启用；0-禁用
  modify_user: "",
  modify_time: new Date().toLocaleString().replace(/\//g, "-"),
});
const rules = {
  fname: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
  fcode: [{ required: true, message: "请输入仓库编号", trigger: "blur" }],
};

const init = async () => {
  if (props.data) {
    console.log(props.data);
    // const res = await getWarehouseDetailById({ id: props.data.id })
    // form.value = Object.assign(form.value, res)
  } else {
    // 获取仓库编号
    // const res = await fetchWarehouseCode()
    // form.value.fcode = res
  }
};

const sumbit = async () => {
  return new Promise((resolve, reject) => {
    ruleFormRef.value.validate(async (valid, fields) => {
      if (valid) {
        // if (!form.value.id) {
        //   await createWarehouse(form.value)
        // } else {
        //   await updateWarehouse(form.value)
        // }
        ElMessage.success("保存成功");
        resolve();
      } else {
        for (let key in fields) {
          ElMessage.warning(fields[key][0].message);
        }
        reject();
      }
    });
  });
};

defineExpose({
  sumbit,
});
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.page {
  padding: 25px 40px;
}
</style>
