import {RouteObject} from "react-router-dom";

/**
 * @Description: 类型定义
 * @Author: Neo
 * @Date: 2022-03-08
 * @LastEditTime: 2022-03-11
 * @LastEditors: Neo
 */
interface MetaType {
  [propName: strimport { useRoutes } from 'react-router-dom'
import { RouterWaiterPropsType } from './type'
import Fn from "./fn";

function RouterWaiter (
  {
    routes,
    onRouteBefore,
    loading,
  } : RouterWaiterPropsType
) {
  const fn = new Fn({
    routes,
    onRouteBefore,
    loading,
  })
  const reactRoutes = fn.transformRoutes()

  return useRoutes(reactRoutes)
}

export default RouterWaiter
ing]: any;
}

interface FunctionalImportType {
  (): any;
}

type ReactElementType = JSX.Element

interface RoutesItemType extends RouteObject {
  redirect?: string;
  component?: FunctionalImportType;
  meta?: MetaType;
  children?: RoutesItemType[];
}

type RoutesType = RoutesItemType[]

type OnRouteBeforeResType = string | void

interface OnRouteBeforeType {
  (payload: {
    pathname: string;
    meta: MetaType;
  }): OnRouteBeforeResType | Promise<OnRouteBeforeResType>;
}

interface RouterWaiterPropsType {
  routes: RoutesType;
  onRouteBefore?: OnRouteBeforeType;
  loading?: ReactElementType;
}

interface RouterWaiterType {
  (payload: RouterWaiterPropsType): JSX.Element;
}

export type {
  MetaType, // 路由meta字段类型
  FunctionalImportType, // 懒加载函数式导入组件的类型
  ReactElementType, // react组件实例元素类型
  RoutesItemType, // 路由配属数组项类型
  RoutesType, // 路由配置数组类型
  OnRouteBeforeResType, // 路由拦截函数（实际有效使用的）返回值类型
  OnRouteBeforeType, // 路由拦截函数类型
  RouterWaiterPropsType, // RouterWaiter主组件props类型
  RouterWaiterType, // RouterWaiter主组件类型
}

declare const RouterWaiter: RouterWaiterType

export default RouterWaiter
