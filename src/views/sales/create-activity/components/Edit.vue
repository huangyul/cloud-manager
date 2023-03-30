<!-- 新建活动-编辑 -->
<script setup>
import { ref } from "vue";
import Steps from "./Steps.vue";
import UploadImg from "./UploadImg.vue";
const radio1 = ref("");
</script>

<template>
  <div class="box">
    <div class="header">
      <div class="flex">
        <el-icon style="color: #4996f3; cursor: pointer">
          <ArrowLeftBold />
        </el-icon>
        <span class="header-name">创建 - 代币入会套餐</span>
        <Steps></Steps>
      </div>
      <div class="flex">
        <div class="btn btn-grey mr10">关闭</div>
        <div class="btn btn-blue mr10">保存</div>
        <div class="btn btn-blue">保存并新增</div>
      </div>
    </div>

    <!-- 表单 -->
    <div class="form-box">
      <!-- 基本信息 -->
      <div class="form">
        <div class="form-title">
          基本信息<el-icon><ArrowDownBold /></el-icon>
        </div>
        <div class="pt20 pr60 pl20">
          <div class="form-item">
            <div class="form-label">活动名称:</div>
            <div class="form-item-content">
              <el-input></el-input>
              <el-checkbox class="ml30" v-model="checked1" label="授权销售" />
            </div>
          </div>
          <div class="form-item mt14">
            <div class="form-label">活动编号:</div>
            <div class="form-item-content">
              <el-input></el-input>
            </div>
          </div>
          <div class="form-item mt14">
            <div class="form-label">活动时间:</div>
            <div class="form-item-content">
              <el-date-picker
                type="daterange"
                range-separator="~"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </div>
          </div>
          <div class="form-item mt14">
            <div class="form-label">适用门店:</div>
            <div class="form-item-content">
              <div class="btn btn-blue">选择门店</div>
              <!-- 表格 -->
              <div class="table w-100 mt14">
                <el-table border empty-text="暂无数据">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column label="编号" prop="qty"></el-table-column>
                  <el-table-column label="名称" prop="goods_name">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template #default>
                      <div class="btn-blue btn-table">删除</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /基本信息 -->
      <!-- 活动详情 -->
      <div class="form">
        <div class="form-title">
          活动详情<el-icon><ArrowDownBold /></el-icon>
        </div>
        <div class="pt20 pr60 pl20">
          <div class="form-item-inline mr40">
            <div class="form-label">支付金额:</div>
            <div class="form-item-content">
              <el-input class="w200">
                <template #suffix> 元 </template>
              </el-input>
            </div>
          </div>
          <div class="form-item-inline">
            <div class="form-label">获得代币:</div>
            <div class="form-item-content">
              <el-input class="w200">
                <template #suffix> 元 </template>
              </el-input>
            </div>
          </div>
          <div class="form-item mt14">
            <div class="form-label">活动对象:</div>
            <div class="form-item-content">
              <el-radio-group v-model="radio1">
                <el-radio label="1" size="large">不限制</el-radio>
                <el-radio label="2" size="large">仅限会员</el-radio>
              </el-radio-group>
              <div class="form-item-box p16">
                <el-radio-group v-model="radio1">
                  <el-radio label="1" size="large">不限制</el-radio>
                </el-radio-group>
                <div class="br mt5 mb5"></div>
                <el-radio-group v-model="radio1" class="flex">
                  <el-radio
                    style="width: 23%"
                    size="large"
                    :label="3"
                    v-for="i in 9"
                    >Option A</el-radio
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="form-item mt14">
            <div class="form-label">图片:</div>
            <div class="form-item-content">
              <div class="form-item-box p20">
                <UploadImg></UploadImg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /活动详情 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  .header {
    padding: 13px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    .header-name {
      margin-left: 25px;
      margin-right: 45px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #2f3339;
    }
  }
  .form-box {
    padding: 20px;
    .form {
      &:not(:first-child) {
        margin-top: 20px;
      }
      .form-title {
        cursor: pointer;
        height: 36px;
        background: rgba($color: #4996f3, $alpha: 0.2);
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2f3339;
      }

      .form-item {
        display: flex;
        align-items: flex-start;
        .form-label {
          text-align: right;
          min-width: 80px;
          width: 80px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2f3339;
          line-height: 32px;
          margin-right: 10px;
        }
        .form-item-content {
          flex: 1;
          ::v-deep .el-input,
          ::v-deep .el-date-editor {
            width: 400px;
            height: 32px;
          }
        }
        .form-item-box {
          background: #ffffff;
          border: 1px solid #d8d8d8;
        }
      }
      .form-item-inline {
        @extend .form-item;
        display: inline-flex;
      }
    }
  }
}
</style>
