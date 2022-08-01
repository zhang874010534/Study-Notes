import { RouteRecordRaw } from 'vue-router'
/*
 * 为了保持path和name的唯一性，尽量遵循以下命名规则：
 * path:'应用名/子页面'
 * name:'应用名-子页面'
 */
const routes: Array<RouteRecordRaw> = [
  // 业主管工单调度
  {
    path: '/userOrder/report',
    name: 'userOrder-report',
    component: () => import('views/userOrder/userProcess/userReport.vue'),
    meta: {
      title: '工单报事',
    },
  },
]

export default routes
