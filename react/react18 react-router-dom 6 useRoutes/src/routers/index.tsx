import type {RouteObject} from "react-router-dom"
//
// import Login from '@/views/login/login'
// import Navigate from '@/views/home/navigate'
// import Home from '@/views/home/home'
// import React from "react";
// import {Spin} from 'antd'
import {RoutesType, OnRouteBeforeType} from "./RouterWaiter/type";
// export const RouterAuth: React.FC<{children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null}> = ({children}) => {
//   console.log(children)
//   const [flag, setFlag] = useState(false)
//
//   const navigate = useNavigate()
//   const match = useMatch("/login")
//   console.log(match,"match")
//   // if(!localStorage.getItem("token")) {
//   //   navigate("login")
//   //   console.log(1)
//   // }
//   const getTree = () => {
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(123)
//       }, 2000)
//     }).then((res) => {
//       setFlag(true)
//     })
//   }
//
//   useEffect(() => {
//     getTree()
//   },[])
//   return flag ? <>{children}</> : <Spin />
// }

const routerContext = require.context('./module', false, /\.tsx$/)
let moduleRoutes: RouteObject[] = []
routerContext.keys().forEach(route => {
  const currentRoute = routerContext(route)
  moduleRoutes = moduleRoutes.concat(currentRoute.default)
})
export const onRouteBefore: OnRouteBeforeType = ({ pathname, meta }) => {

  // 动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title
  }
  // console.log(meta,"meta")

  if(!meta.noLogin) {// 需要登录

  }
}
const routes: RoutesType = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "demo" */ '@/views/demo'),
    meta: {
      title: "首页",
    }
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login'),
    meta: {
      noLogin: true
    }
  },
  {
    path: "/home",
    component:() => import(/* webpackChunkName: "home" */ '@/views/home/home'),
    children: moduleRoutes
  },
];
export default routes
