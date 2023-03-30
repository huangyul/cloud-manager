<!-- 上传文件组件 -->
<script setup>
const beforeAvatarUpload = (file) => {
  console.log(file);
  return false;
};
</script>

<template>
  <div class="flex">
    <!-- 主图 -->
    <div>
      <div class="title mb12">主图</div>
      <el-upload
        class="uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon :size="18" class="mb10"><Plus /></el-icon>
        上传缩略图
      </el-upload>
      <div class="image">
        <img />
        <el-icon class="close" style="color: #ff4d4d"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>

    <!-- 附图 -->
    <div class="ml40 box">
      <div class="title mb12">附图</div>
      <el-upload
        class="uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon :size="18" class="mb10"><Plus /></el-icon>
        上传附图
      </el-upload>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2f3339;
  line-height: 20px;
  opacity: 0.8;
}
.uploader {
  width: 100px;
  height: 100px;
  background: #ebeced;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #63666b;
  opacity: 0.8;
}
::v-deep .el-upload {
  display: flex;
  width: 100px;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image {
  width: 100px;
  height: 100px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    cursor: pointer;
    transform: translate(50%, -50%);
  }
}
.box {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 100px;
    top: 32px;
    left: -20px;
    background: #e6e6e6;
  }
}
</style>
