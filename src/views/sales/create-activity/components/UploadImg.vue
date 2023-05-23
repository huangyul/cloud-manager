<!-- 上传文件组件 -->
<script setup>
import { ref } from 'vue'

const mainImage = ref(null)
const attachment = ref([])

const generateDataUrl = (file) => {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function (e) {
			resolve(this.result)
		}
	})
}

const beforeMainUpload = async (file) => {
	const url = await generateDataUrl(file)
	mainImage.value = {
		file,
		url,
		name: file.name,
		id: file.uid,
	}
	return false
}

const beforeAttachmentUpload = async (file) => {
	const url = await generateDataUrl(file)
	attachment.value.push({
		file,
		url,
		id: file.uid,
		name: file.name,
	})
	return false
}

const deleteImg = (type, id) => {
	if (type == 'main') {
		mainImage.value = null
	} else {
		attachment.value = attachment.value.filter((img) => img.id != id)
	}
}
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
				:before-upload="beforeMainUpload"
				v-if="!mainImage"
			>
				<el-icon :size="18" class="mb10"><Plus /></el-icon>
				上传缩略图
			</el-upload>
			<div v-if="mainImage" class="image">
				<img :src="mainImage.url" />
				<el-icon
					@click="deleteImg('main')"
					class="close"
					style="color: #ff4d4d"
				>
					<CircleCloseFilled />
				</el-icon>
			</div>
		</div>

		<!-- 附图 -->
		<div class="ml40 box">
			<div class="title mb12">附图</div>
			<div class="flex">
				<el-upload
					v-if="attachment.length < 8"
					class="uploader mr14"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAttachmentUpload"
				>
					<el-icon :size="18" class="mb10"><Plus /></el-icon>
					上传附图
				</el-upload>
				<div class="flex-wrap" v-if="attachment.length > 0">
					<div class="image mb14 mr14" v-for="img in attachment" :key="img.id">
						<img :src="img.url" />
						<el-icon
							@click="deleteImg('no', img.id)"
							class="close"
							style="color: #ff4d4d"
						>
							<CircleCloseFilled />
						</el-icon>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="tips">
		<div>
			• 主图:
			用于小程序套餐列表缩略图和详情页主图，要求小于200KB，格式为jpg、png、jpeg、gif，建议图片宽度高度：750
			* 750
		</div>
		<div>
			• 附图:
			用于小程序商品详情页附图，格式为jpg、png、jpeg、gif，尺寸无限制，最多上传8张
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
		object-fit: contain;
		border: 1px solid #e8e8e8;
	}
	.close {
		position: absolute;
		background-color: #ffffff;
		border-radius: 50%;
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
		content: '';
		width: 1px;
		height: 100px;
		top: 32px;
		left: -20px;
		background: #e6e6e6;
	}
}
.tips {
	font-size: 13px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #97999c;
	line-height: 20px;
	margin-top: 20px;
	user-select: text;
}
</style>
