<template>
	<div class="search-box">
		<div class="search-com">
			<div class="search-list">
				<div
					v-for="(value, key) in ownSearchList"
					:key="key"
					:class="[
						`item-${value.width ? value.width : 1}`,
						'search-item',
						{ '!items-start': value.type == 'select-tag' },
					]"
				>
					<div
						class="label-text"
						:class="[
							{ relative: value.type == 'select-tag' },
							{ 'top-2': value.type == 'select-tag' },
						]"
					>
						{{ value.label }}
					</div>
					<el-select
						multiple
						collapse-tags
						v-model="value.value"
						v-if="value.type == 'select'"
						:placeholder="value.placeholder || '请选择'"
						:clearable="value.noclearable ? false : true"
						:filterable="value.filterable"
					>
						<el-option
							v-for="(o, i) in props.options[key]"
							:key="i"
							:value="o.value"
							:label="o.label"
						></el-option>
					</el-select>
					<el-radio-group v-model="value.value" v-if="value.type == 'radio'">
						<el-radio
							:label="o.value"
							v-for="(o, i) in props.options[key]"
							:key="i"
						>
							{{ o.label }}
						</el-radio>
					</el-radio-group>
					<el-date-picker
						:clearable="value.noclearable ? false : true"
						v-if="value.type == 'date'"
						v-model="value.value"
						type="date"
						:placeholder="value.placeholder || '请选择'"
					/>
					<el-date-picker
						:clearable="value.noclearable ? false : true"
						v-if="value.type == 'time'"
						v-model="value.value"
						type="datetime"
						:placeholder="value.placeholder || '请选择'"
					/>
					<el-date-picker
						:clearable="value.noclearable ? false : true"
						v-if="value.type == 'daterange'"
						v-model="value.value"
						:type="props.dealTime == 'one' ? 'datetimerange' : 'daterange'"
						:shortcuts="shortcuts"
						:placeholder="value.placeholder || '请选择'"
					></el-date-picker>
					<el-input
						:clearable="value.noclearable ? false : true"
						v-if="!value.type || value.type == 'text'"
						v-model="value.value"
						:placeholder="value.placeholder || ' '"
					></el-input>
					<div v-if="value.type == 'range'" class="range-input">
						<input />
						-
						<input />
					</div>
					<!-- 标签选择 -->
					<div
						v-if="value.type == 'select-tag'"
						class="item-input !items-start"
					>
						<div class="tag-box !items-start">
							<template v-for="(tagCat, index) in tagList">
								<div
									class="flex items-start flex-1 tag-item"
									v-if="index < 1"
									:key="tagCat.value"
								>
									<div>{{ tagCat.name }}：</div>
									<div class="flex flex-wrap flex-1">
										<span
											class="flex items-center pl-1"
											v-for="tag in tagCat.tags"
											:key="tag.value"
										>
											{{ tag.name }}
											<el-icon
												class="tag-close"
												@click="handleCloseTag(tagCat, tag)"
											>
												<Close />
											</el-icon>
										</span>
									</div>
								</div>
							</template>

							<div
								class="tag-more"
								@click="openTagDialog"
								v-if="tagList.length > 1"
							>
								+ {{ tagList.length - 1 }}
							</div>
						</div>
						<div class="tag-btn" @click="openTagDialog">选择</div>
					</div>
					<el-checkbox-group
						v-if="value.type === 'checkbox'"
						v-model="value.value"
					>
						<el-checkbox
							:label="o.value"
							v-for="(o, i) in props.options[key]"
							:key="i"
						/>
					</el-checkbox-group>
				</div>
			</div>
			<div class="func">
				<button class="btn btn-blue" @click="doSearch">查询</button>
				<button class="btn btn-grey" @click="onReset">重置</button>
				<slot name="func-more"></slot>
			</div>
		</div>
		<div class="more">
			<img
				src="/images/common/extends.png"
				@click="onExpand"
				v-if="isExceed"
				:class="{ extends: isExpand }"
			/>
		</div>

		<!-- 便签选择弹窗 -->
		<ChooseGoodsTagsDialog
			v-if="isDialogShow"
			ref="tagRef"
			:tagType="props.tagType"
			v-model:isShow="isDialogShow"
			@confirm="handleTagConfirm"
		></ChooseGoodsTagsDialog>
	</div>
</template>

<script setup>
import { deepClone, getCTime, timeSlotChange } from '/@/utils/helper'

import { nextTick, onMounted, ref, watch } from 'vue'
import ChooseGoodsTagsDialog from '../../components/common/ChooseGoodsTagsDialog.vue'
import { useElTable } from '/@/hooks/basic'

const emits = defineEmits(['search', 'choose-tags', 'on-reset', 'click-expend'])

const props = defineProps({
	// 超过多少行折叠，默认两行
	columns: {
		type: Number,
		default: 2,
	},
	// 搜索条件
	/**
	 * 搜索条件
	 * keyName:  字段名{
	 * type: '' 控件类型， text | textarea | select | date | time | daterange
	 * value: ''
	 *
	 * label: '' label名
	 * width: 1, 所占宽度，默认1
	 * placeholder: ''
	 * }
	 */
	searchList: {
		type: Object,
		default() {
			return []
		},
	},
	/**
	 * 搜素条件的选项
	 * 如搜索条件中有个字段sex需要下拉搜索
	 * {
	 * sex: [
	 * {value: 1, label: '男'},
	 * {value: 0, label: '女'}]
	 * }
	 */
	options: {
		type: Object,
		default() {
			return {}
		},
	},
	/**
	 * 处理时间的方式
	 * two: 返回   xxx_start: '',  xxx_end: '' 两个字段
	 * one: 返回   xxx: {from: '', to: ''}
	 */
	dealTime: {
		type: String,
		default: 'two',
	},
	tagType: {
		type: String,
		default: 'FrmPromotionData0', // 营销方案: FrmPromotionData1    销售套餐: FrmPromotionData0
	},
})

let ownSearchList = ref(deepClone(props.searchList))

// 搜索栏超过两行是否展开
const isExpand = ref(false)
// 搜索栏是否超出两行
const isExceed = ref(false)
const { updateTableHeight } = useElTable()
// 点击展开图片
const onExpand = () => {
	if (!isExceed.value) {
		return false
	} else {
		isExpand.value = !isExpand.value
	}
	emits('click-expend')
}

// 搜索
const doSearch = () => {
	const search = {}
	for (let key in ownSearchList.value) {
		// 处理时间范围选择器的返回数据结构
		if (
			ownSearchList.value[key].type == 'daterange' ||
			ownSearchList.value[key].type == 'datetimerange'
		) {
			if (props.dealTime == 'two') {
				let format = search.format ? search.format : '$$Time'
				let tags = ['Start', 'End']
				if (ownSearchList.value[key].value.length > 0) {
					search[`${format.replace(/\$[^$]*\$/g, tags[0])}`] = new Date(
						ownSearchList.value[key].value[0],
					)
						.toLocaleDateString()
						.replace(/\//g, '-')
					search[`${format.replace(/\$[^$]*\$/g, tags[1])}`] = new Date(
						ownSearchList.value[key].value[1],
					)
						.toLocaleDateString()
						.replace(/\//g, '-')
				} else {
					search[`${format.replace(/\$[^$]*\$/g, tags[0])}`] = ''
					search[`${format.replace(/\$[^$]*\$/g, tags[1])}`] = ''
				}
			} else if (props.dealTime == 'one') {
				if (ownSearchList.value[key].value) {
					search[key] = {
						from: getCTime(ownSearchList.value[key].value[0]),
						to: getCTime(ownSearchList.value[key].value[1]),
					}
				} else {
					search[key] = {
						from: null,
						to: null,
					}
				}
			}
		} else if (ownSearchList.value[key].type == 'select-tag') {
			let res = []
			tagList.value.forEach((i) => {
				i.tags.forEach((t) => {
					res.push(`LabelValue${i.value}:${t.value}`)
				})
			})
			search[key] = res.join(',')
		} else if (
			ownSearchList.value[key].type == 'select' &&
			ownSearchList.value[key].value
		) {
			search[key] = ownSearchList.value[key].value.join(',')
		} else {
			search[key] = ownSearchList.value[key].value
		}
	}
	emits('search', search)
}

// 本日、本周、本月、本季度、本年
const shortcuts = [
	{
		text: '本日',
		value: () => {
			return timeSlotChange('本日')
		},
	},
	{
		text: '本周',
		value: () => {
			return timeSlotChange('本周')
		},
	},
	{
		text: '本月',
		value: () => {
			return timeSlotChange('本月')
		},
	},
	{
		text: '本季度',
		value: () => {
			return timeSlotChange('本季度')
		},
	},
	{
		text: '本年',
		value: () => {
			return timeSlotChange('本年')
		},
	},
]

// 重置
const onReset = () => {
	ownSearchList.value = deepClone(props.searchList)
	tagList.value = []
	emits('on-reset', ownSearchList.value)
}

// 数据初始化
const init = () => {
	// 获取搜索菜单的高
	const height = document.querySelector('.search-list').clientHeight
	// 如果高大于两行
	if (height > 41 * props.columns) {
		isExceed.value = true
	} else {
		isExceed.value = false
	}
	// 如果小于一行，搜索按钮顶上去
	if (height <= 41) {
		const oFunc = document.querySelector('.func')
		document.querySelector('.search-list').appendChild(oFunc)
		oFunc.className = 'func item-1 search-item'
	}
	document.querySelector('.search-list').style.height =
		height > 41 * props.columnss ? 'auto' : '80px'

	// 获取所有item距离父元素的高度，判断如果大于两行，则隐藏
	// const searchItemList = document.querySelectorAll('.search-item')
	// for (let i = 0; i < searchItemList.length; i++) {
	//   if (searchItemList[i].offsetTop > props.columns * 41) {
	//     searchItemList[i].classList.add('item-exceed')
	//   }
	// }
}

// 重设控件的宽度
const resetItemSize = () => {
	const elements1 = document.querySelectorAll('.item-1')
	const elements2 = document.querySelectorAll('.item-2')
	let width1 = ''
	let width2 = ''
	if (window.innerWidth <= 1200) {
		width1 = '50%'
		width2 = '100%'
	} else if (window.innerWidth <= 1500) {
		width1 = '33%'
		width2 = '50%'
	} else {
		width1 = '25%'
		width2 = '50%'
	}
	for (let i = 0; i < elements1.length; i++) {
		elements1[i].style.width = width1
	}
	for (let i = 0; i < elements2.length; i++) {
		elements2[i].style.width = width2
	}
}

/**
 * 标签弹窗
 */
let isDialogShow = ref(false)
const tagList = ref([])
// 打开标签选择窗口
const tagRef = ref()
const openTagDialog = () => {
	isDialogShow.value = true
	tagRef.value.fillTag(tagList.value)
}
const handleTagConfirm = (value) => {
	tagList.value = deepClone(value)
	// nextTick(() => {
	// 	let tagWidth = document.querySelector(".tag-item").clientWidth
	// 	const selectInputWidth = document.querySelector(".tag-box").clientWidth
	// 	if (tagList.value.length > 1) {
	// 		console.log(document.querySelector(".tag-more").clientWidth)
	// 		tagWidth += document.querySelector(".tag-more").clientWidth
	// 	}
	// 	if (tagWidth + 24 > selectInputWidth) {
	// 		console.log('width')
	// 		document.querySelector(".tag-item").style.width = "20px!important"
	// 	}
	// 	console.log(tagWidth, selectInputWidth)
	// })
}
const handleCloseTag = (pTag, cTag) => {
	tagList.value.forEach((tag) => {
		if (tag.value == pTag.value) {
			tag.tags.splice(
				tag.tags.findIndex((i) => i.value == cTag.value),
				1,
			)
		}
	})
	tagList.value = tagList.value.filter((i) => i.tags.length > 0)
}

watch(isExpand, (value) => {
	// const nodeList = document.querySelectorAll('.item-exceed')
	// for (let i = 0; i < nodeList.length; i++) {
	//   nodeList[i].style.display = value ? 'flex' : 'none'
	// }
	document.querySelector('.search-list').style.height = value ? 'auto' : '80px'
})

onMounted(() => {
	// 自己保留一份searchList
	// ownSearchList.value = Object.assign({}, props.searchList)
	// 初始化搜索
	resetItemSize()
	doSearch()
	init()
	window.onresize = () => {
		resetItemSize()
	}
})
</script>

<style lang="scss" scoped>
.search-box {
	margin-right: 28px;
	position: relative;
	margin-bottom: 16px;

	.search-com {
		.search-list {
			overflow: hidden;

			::v-deep .el-form-item__label {
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #2f3339;
			}

			::v-deep .el-input {
				height: 32px;
				background: #ffffff;
				border-radius: 4px;
			}

			::v-deep .el-select {
				width: 100%;
			}

			::v-deep .el-date-editor.el-input,
			.el-date-editor.el-input__wrapper {
				width: 100%;
			}

			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.item {
				display: flex;
				align-items: center;
				margin-top: 8px;

				.label-text {
					min-width: 110px;
					margin-right: 8px;
					text-align: right;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #2f3339;
					font-size: 14px;
				}
			}

			.item-1 {
				@extend .item;
				width: 25%;
			}

			.item-2 {
				@extend .item;
				width: 50%;
			}

			.item-3 {
				@extend .item;
				width: 75%;
			}

			.item-4 {
				@extend .item;
				width: 100%;
			}

			.item-exceed {
				display: none;
			}

			.tag-btn {
				width: 40px;
				height: 24px;
				background: #4996f3;
				border-radius: 2px;
				font-size: 13px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}

			.item-input {
				display: inline-flex;
				align-items: center;
				justify-content: space-between;
				padding: 4px;
				min-height: 32px;
				// width: 100%;
				width: calc(100% - 118px);
				box-sizing: border-box;
				background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
				background-image: none;
				border-radius: var(
					--el-input-border-radius,
					var(--el-border-radius-base)
				);
				transition: var(--el-transition-box-shadow);
				box-shadow: 0 0 0 1px
					var(--el-input-border-color, var(--el-border-color)) inset;

				.tag-box {
					flex: 1;
					display: flex;
					align-items: center;
					overflow: hidden;

					.tag-item {
						background: #e1eefd;
						border-radius: 2px;
						font-size: 13px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #318cf9;
						flex-shrink: 0;
						margin-right: 4px;
						padding: 4px 8px;

						.tag-close {
							cursor: pointer;
						}
					}

					.tag-more {
						@extend .tag-item;
						cursor: pointer;
						max-height: 24px;
					}
				}
			}

			.range-input {
				display: inline-flex;
				flex-grow: 1;
				align-items: center;
				justify-content: space-between;
				padding: 1px 11px;
				background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
				background-image: none;
				border-radius: var(
					--el-input-border-radius,
					var(--el-border-radius-base)
				);
				transition: var(--el-transition-box-shadow);
				box-shadow: 0 0 0 1px
					var(--el-input-border-color, var(--el-border-color)) inset;

				input {
					border: none;
					outline: none;
					height: 30px;
					width: 100%;
					margin: 0 10px;
					color: #606266;
					text-align: center;
				}
			}
		}

		.func {
			display: flex;
			justify-content: flex-end;
			margin-top: 8px;

			.btn:not(:last-child) {
				margin-right: 10px;
			}
		}
	}

	.more {
		position: absolute;
		right: 0;
		right: -26px;
		top: 55px;
		width: 15px;
		height: 15px;

		img {
			width: 15px;
			height: 15px;
			transition: all 0.3 ease;
			transition: all 0.5s;
			cursor: pointer;
			user-select: none;
		}

		.extends {
			transform: rotateX(180deg);
		}
	}
}
</style>
