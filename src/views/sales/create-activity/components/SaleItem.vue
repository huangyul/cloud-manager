<template>
  <div class="flex-align-center flex-row-between mb14">
    <el-checkbox
      v-model="isChecked"
      class="w120"
      :label="data.title"
    ></el-checkbox>
    <div v-if="isChecked" class="flex-align-center flex-row-left sale-item">
      <div class="label">{{ data.label }}</div>
      <el-input v-model="data.value"></el-input>
      <div v-if="data.isSelectBtn" class="btn btn-blue" @click="chooseSale">
        选择
      </div>
    </div>

    <!-- 选择销售页面 -->
    <ChooseSaleDialog
      v-model:isShow="isChooseSaleDilaogShow"
    ></ChooseSaleDialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ChooseSaleDialog from "../../../../components/common/ChooseSalePositionDialog.vue";

const props = defineProps({
  data: {
    type: Object,
    defaunt() {
      return {
        title: "",
        isSelectBtn: true,
        value: "",
        label: "",
        isCheck: false,
      };
    },
  },
});

const emits = defineEmits(["update:data"]);

const isChecked = computed({
  get: () => {
    return props.data.isCheck;
  },
  set: (value) => {
    emits("update:data", Object.assign(props.data, { isCheck: value }));
  },
});

/**
 * 选择销售页面
 */
let isChooseSaleDilaogShow = ref(true);
const chooseSale = () => {
  isChooseSaleDilaogShow.value = true;
};
</script>

<style lang="scss" scoped>
.sale-item {
  flex: 1;
  font-size: 14px;
  color: #2f3339;
  ::v-deep .el-input {
    max-width: 512px;
    margin-right: 8px;
  }
  .label {
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
}
</style>
