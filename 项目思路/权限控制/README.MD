### router.addRoute("index", temp)

动态路由是当前用户拥有哪些访问的权限才添加对应的路由

在路由前置守卫中通过 token 来获取该用户存在哪些权限，在依次添加···

```js
// index.js 文件
// 把固定的路由先配置好
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from "../page/login/Login.vue"

export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login
  },
  {
    name: "index",
    path: "/",
    component: () => import("../page/container/Container.vue"),
    children: [
      {
        path: "addGoods",
        component: () => import("../page/goods/AddGoods.vue")
      },
      {
        path: "dashbord",
        component: () => import("../page/dashbord/Dashbord.vue")
      },
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

// 向 router 上添加一个，重新实例化 VueRouter 的方法
router.reloadRouter = function () {
  router.matcher = new VueRouter({
    mode: "history",
    routes
  }).matcher
}

export default router

```

```js
// permission.js 文件
import router from "../router/index"
import store from "../store/index"
// 请求的权限数据
import { menus } from "../api/roles/index";

// 首字母转大写
function firstUppercase(str) {
  return str[0].toUpperCase() + str.substring(1)
}

// 权限存储
function getRights() {
  menus()
    .then((res) => {
      store.dispatch("asyncGetRights", res);
      routesData(res)
    })
    .catch((err) => {
      console.error(err);
    });
}

// 动态添加路由
function routesData(data) {
  // 重新加载一次 VueRouter
  router.reloadRouter()
  data.forEach(item => {
    item.children.forEach(i => {
      // 组装路由配置
      const temp = {
        name: i.path,
        path: i.path,
        component: () => import(`../page/${item.path}/${firstUppercase(i.path)}.vue`)
      }
      // 动态添加为 index 的子路由
      router.addRoute("index", temp)
    })
  })
  // 动态添加一个 404 页面
  router.addRoute({
    path: "*",
    component: () => import("../page/404/404.vue")
  })
}

// 有 token 不能去登录页，没有 token 只能去登录页 
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有 token 并且不是登录页的时候，进行权限获取
    if (to.path !== "/login") {
      // 动态路由只能添加一次
      // 退出登录后可重新添加
      if (!store.state.isRights) {
        store.state.isRights = true
        getRights()
      }
    }
    if (to.path === "/login") {
      next("/dashbord")
    }
  } else {
    if (to.path !== "/login") {
      next("/login")
    }
  }
  next()
})

```

### 处理路由的方法

```js
// 前端组件名和组件映射表
const map = {
  //xx: require('@/views/xx.vue').default // 同步的⽅式
  xx: () => import('@/views/xx.vue') // 异步的⽅式
}
// 服务端返回的asyncRoutes
const asyncRoutes = [
  { path: '/xx', component: 'xx',... }
]
// 遍历asyncRoutes，将component替换为map[component]
function mapComponent(asyncRoutes) {
  asyncRoutes.forEach(route => {
    route.component = map[route.component];
    if(route.children) {
      route.children.map(child => mapComponent(child))
    }
    })
}
mapComponent(asyncRoutes)
```

