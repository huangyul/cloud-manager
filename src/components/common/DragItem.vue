<template>
	<div
		class="item-box"
		:class="[
			{ 'item-drag': type == 'drag' },
			{ 'item-no-drag': type == 'no-drag' },
			{ 'item-empty': type == 'empty' },
		]"
		:draggable="type == 'drag'"
		:id="props.domId"
		@dragstart="drag($event)"
		@dragover="dragover($event)"
		@drop="drop($event)"
	>
		<div class="item-name" v-if="type != 'empty'">{{ props.title }}</div>
		<div class="item-num" v-if="type != 'empty'">{{ props.value }}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: '',
	},

	value: {
		type: [Number, String],
		default: '',
	},
	type: {
		type: String,
		validator(value) {
			// empty:空，占位 drag：拖拽 no-drag：不可拖拽
			return ['empty', 'drag', 'no-drag'].includes(value)
		},
		default: 'empty',
	},
	domId: String,
})

const emits = defineEmits(['clear'])

const drag = (ev) => {
	if (props.type == 'drag') {
		console.log('被拖拽的dom')
		console.log(ev)
		ev.dataTransfer.setData('Text', ev.target.id)
		window.dragDom = ev.target
	}
}
const drop = (ev) => {
	if (ev.target == window.dragDom) return
	if (
		window.dragDom.parentNode !== ev.target.parentNode &&
		ev.target.parentNode.id == 'drag-list'
	) {
		emits('clear')
		ev.target.parentNode
		// window.dragDom.parentNode.removeChild(window.dragDom);
		// ev.target.appendChild(window.dragDom);
		const cloneElement = window.dragDom.cloneNode(true)
		cloneElement.id = 'cloneEl'
		// const cloneElement = window.dragDom.cloneElement(true)
		ev.target.appendChild(cloneElement)
	}
}
const dragover = (ev) => {
	if (props.type == 'empty') {
		ev.preventDefault()
	}
}
</script>

<style lang="scss" scoped>
.item-box {
	width: 240px;
	height: 125px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.item-name {
		font-size: 18px;
	}
}
.item-drag {
	padding: 18px;
	background-color: #2d64c2;
	color: #ffffff;
	cursor: move;
	position: absolute;
	top: 0;
	left: 0;
}
.item-no-drag {
	@extend .item-drag;
	opacity: 0.65;
	cursor: not-allowed;
}
.item-empty {
	border: 1px dashed rgb(221, 221, 221);
	position: relative;
}
</style>
