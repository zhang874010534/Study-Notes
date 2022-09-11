import {RoutesType} from "@/routers/RouterWaiter/type";

const routes: RoutesType = [
  {
    path: "newUserList",
    component: () => import(/* webpackChunkName: "newUser" */ '@/views/monitor/newUser/newUserList'),
  },
];
export default routes
