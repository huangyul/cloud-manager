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
    @drop="drop"
  >
    <div class="item-name" v-if="type != 'empty'">{{ props.title }}</div>
    <div class="item-num" v-if="type != 'empty'">{{ props.value }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  value: {
    type: [Number, String],
    default: "",
  },
  type: {
    type: String,
    validator(value) {
      // empty:空，占位 drag：拖拽 no-drag：不可拖拽
      return ["empty", "drag", "no-drag"].includes(value);
    },
    default: "empty",
  },
  domId: String,
});

const drag = (ev) => {
  if (props.type == "drag") {
    ev.dataTransfer.setData("Text", ev.target.id);
    window.dragDom = ev.target;
  }
};
const drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
  const dragDom = document.querySelector(".draggable");
  console.log(ev.target);
  window.dragDom.style.top = ev.target.offsetTop + "px";
  window.dragDom.style.left = ev.target.offsetLeft + "px";
  window.dragDom = null;
};
const allowDrop = (ev) => {
  ev.preventDefault();
};
const dragover = (ev) => {
  if (props.type == "empty") {
    ev.preventDefault();
  }
};
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
}
</style>
