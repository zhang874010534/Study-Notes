import {Navigate, RouteObject} from 'react-router-dom'
import React from "react";
import Guard from "./guard";
import {FunctionalImportType, MetaType, RouterWaiterPropsType, RoutesType} from "./type";
export default class Fn {
  routes
  onRouteBefore
  loading

  constructor (option: RouterWaiterPropsType) {
    this.routes = option.routes || []
    this.onRouteBefore = option.onRouteBefore
    this.loading = option.loading || (<div></div>)
  }

  /**
   * @description: 路由配置列表数据转换
   * @param {string} redirect 要重定向的路由路径
   * @param {function} component 函数形式import懒加载组件
   * @param {object} meta 自定义字段
   * @param routeList
   */
  transformRoutes (routeList:RoutesType = this.routes) {
    const list:RouteObject[] = []
    routeList.forEach(route => {
      const obj = { ...route }
      if (obj.path === undefined) {
        return
      }
      if (obj.redirect) {
        obj.element = <Navigate to={obj.redirect} replace={true}/>
      } else if (obj.component) {
        obj.element = this.lazyLoad(obj.component, obj.meta || {})
      }
      Reflect.deleteProperty(obj, "redirect")
      Reflect.deleteProperty(obj, "component")
      Reflect.deleteProperty(obj, "meta")
      if (obj.children) {
        obj.children = this.transformRoutes(obj.children)
      }
      list.push(obj)
    })
    return list
  }

  /**
   * @description: 路由懒加载
   */
  lazyLoad (importFn: FunctionalImportType, meta: MetaType) {
    const Element = React.lazy(importFn)
    const lazyElement = (
      <React.Suspense fallback={this.loading}>
        <Element meta={meta}/>
      </React.Suspense>
    )
    return (
      <Guard
        element={lazyElement}
        meta={meta}
        onRouteBefore={this.onRouteBefore}
      />
    )
  }
}
