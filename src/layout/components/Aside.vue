<template>
  <div class="aside">
    <div class="menu">
      <div
        class="menu-item"
        v-for="menu in menuList"
        @mouseover="openSecondMenu(menu)"
        @mouseleave="closeSecondMenu(500)"
      >
        <img
          :src="`/images/layout/sidebar/${menu.icon}${
            activeMenu.name == menu.name ? '_hover' : ''
          }.png`"
        />
        {{ menu.name }}
      </div>
    </div>
    <div class="shop-info">
      <div>{{ userStore.user.OrganizationName }}</div>
    </div>
    <div
      class="second-menu"
      v-if="isShow"
      @mouseover="openSecondMenu(null)"
      @mouseleave="closeSecondMenu(0)"
    >
      <el-scrollbar>
        <div class="second-item" v-for="second in activeMenu.children">
          <div class="title">{{ second.ModuleName }}</div>
          <div
            class="third-menu-item"
            v-for="child in second.Subs"
            @click="toPage(child?.path)"
            @mouseover="hoverThridMenu(child.ModuleCode)"
            @mouseleave="leaveThridMenu"
          >
            <img
              :src="`/images/layout/sidebar/three-menu/${child?.meta?.icon}${
                activeThreeMenu == child.ModuleCode ? '_hover' : ''
              }.png`"
            />
            <div class="name">{{ child.ModuleName }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePermissionStore } from "../../store/modules/permission";
import { useUserStore } from "/@/store/modules/user";
import { routes } from "/@/router/routes";
import { useRouter } from "vue-router";
const router = useRouter();
const permissionStore = usePermissionStore();
const userStore = useUserStore();
const menuList = ref([
  {
    name: "营业",
    ModuleCode: "Business",
    children: [],
    icon: "business",
  },
  {
    name: "商品",
    ModuleCode: "mnuAssetManagement",
    children: [],
    icon: "commodity",
  },
  {
    name: "会员",
    ModuleCode: "mnuLeagManagement",
    children: [],
    icon: "member",
  },
  {
    name: "物流",
    ModuleCode: "PurchaseManagement",
    children: [],
    icon: "logistics",
  },
  {
    name: "库存",
    ModuleCode: "Inventory",
    children: [],
    icon: "inventory",
  },
  {
    name: "设备",
    ModuleCode: "mnuAmusementManagement",
    children: [],
    icon: "equipment",
  },
  {
    name: "系统",
    ModuleCode: "mnuSystemManager",
    children: [],
    icon: "system",
  },
]);
// 生成权限菜单
const init = () => {
  menuList.value.forEach((menu, index, arr) => {
    const permission = permissionStore.menuList.find(
      (m) => m.ModuleCode == menu.ModuleCode
    );
    if (permission) {
      menu.children = permission.Subs;
      debugger;
      if (menu.children.length > 0) {
        for (let i = 0; i < menu.children.length; i++) {
          if (menu.children[i].Subs?.length > 0) {
            for (let j = 0; j < menu.children[i].Subs.length; j++) {
              addRouteToMenu(menu.children[i].Subs[j]);
            }
          }
        }
      }
    } else {
      arr.splice(index, 1);
    }
  });
};
const addRouteToMenu = (menu) => {
  const route = routes[0].children.find((route) => {
    if (route.paht == "/member/exchange-rank") {
      console.log(route.meta, menu.ModuleCode);
    }
    if (route?.meta?.ModuleCode) {
      return route.meta.ModuleCode == menu.ModuleCode;
    } else {
      return false;
    }
  });
  if (route) {
    menu.path = route.path ?? "";
    menu.meta = route.meta ?? {};
  }
};

const toPage = (path = "") => {
  if (path.length > 0) {
    router.push(path);
  }
};

const isShow = ref(false);
let timer = null;
let activeMenu = ref({});
const openSecondMenu = (item) => {
  if (item) {
    activeMenu.value = item;
  }
  clearTimeout(timer);
  isShow.value = true;
};
const closeSecondMenu = (duration = 500) => {
  timer = setTimeout(() => {
    isShow.value = false;
  }, duration);
};

// 三级菜单
const activeThreeMenu = ref("");
const hoverThridMenu = (code) => {
  activeThreeMenu.value = code;
  console.log(activeThreeMenu.value);
};
const leaveThridMenu = () => {
  activeThreeMenu.value = "";
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.aside {
  width: 90px;
  background: #767676;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  position: relative;

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    .menu-item {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.8;
      width: 72px;
      height: 72px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &:hover {
        background: #626262;
        border-radius: 4px;
      }
      img {
        width: 28px;
        height: 28px;
        margin-bottom: 4px;
      }
    }
  }
  .shop-info {
    border-top: 1px solid rgba($color: #e6e6e6, $alpha: 0.1);
    padding-top: 14px;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.6;
  }
  .second-menu {
    width: 200px;
    position: absolute;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    top: 0;
    bottom: 0;
    left: 90px;
    padding: 24px 10px;
    overflow-y: auto;
    z-index: 999;
    &:not(:last-child) {
      margin-bottom: 10px;
      border-bottom: 1px solid red;
    }
    .second-item {
      .title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #696c70;
        line-height: 36px;
        padding: 0 14px;
      }
      .third-menu-item {
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
        width: 180px;
        height: 32px;
        padding: 0 14px;
        margin: 4px 0;
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #696c70;
        transition: all 0.1s ease;
        &:hover {
          background: #4996f3;
          color: #ffffff;
        }
        img {
          width: 18px;
          height: 18px;
          margin-right: 9px;
        }
      }
    }
  }
}
</style>
