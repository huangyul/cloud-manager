# 云管家前端

## 项目启动及打包

```bash
# 先安装pnpm
npm i pnpm -g

pnpm install
# 启动
pnpm dev
# 打包
pnpm build
```

## git 提交规范

先执行`pnpm commit`，然后在出现的选项中选择`commit`的类型，详细可参考[如何规范你的 Git commit？](https://zhuanlan.zhihu.com/p/182553920)

> 如果不想使用，可以删掉`.husky`目录下的`commit-msg`和`pre-commit`文件即可

## 新增页面路由配置

当需要新增页面时，确定好是哪个模块的，在相应的模块中加入路由配置，如果是新模块，就新建模块文件

例如：要新增`test.vue`这个页面的路由

1. 新建或找到路由模块文件，`src/router/routes/modules/test.js`
2. 新增以下路由

```js
const route = [
  // 其他路由

  // 新增路由
  {
    path: '/test/test',
    name: 'report',
    component: () => import(''),
    meta: {
      tabName: '营业报表', // tab标签名
      ModuleCode: 'BusinessReport', // 对应后端的模块字段，通过此字段将后端模块与路由关联起来，实现页面权限控制
      icon: '营业报表', // icon名，新增的icon需要放到assets\images\layout\sidebar\three-menu
    },
  },
]
```

> 只能新增三级菜单路由，一级和二级是没有路由跳转功能的

## 通用组件

### 
