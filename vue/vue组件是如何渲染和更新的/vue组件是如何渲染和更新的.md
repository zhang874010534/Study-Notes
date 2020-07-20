### 初次渲染过程

- 解析模板为render函数(或在开发环境已经完成,vue-loader)
- 触发响应式，监听data属性getter,setter
- 执行render函数(这个时候会触发getter获取数据)，生成vnode，patch(elem,vnode)

### 更新过程

- 修改data,触发setter(此前在getter中已被监听)
- 重新执行render函数,生成newVnode
- patch(vnode,nodeVnode)   diff算法会计算出新旧虚拟dom的差异，再来更新真实的dom

