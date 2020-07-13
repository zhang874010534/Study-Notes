源码地址 core/instance/state.js   line:169

initComputed=> new Watcher=>defineComputed=>createComputedGetter

面试回答:

1. 首先初始化computed,获取到计算属性里的函数,计算属性本质上就是一个函数return了一个值，为什么不用method呢，因为method会每次都执行，而computed不会，只有在他依赖的值改变的时候才会重新执行（computed存在一个dirty值，只有dirty值为true的时候才会重新执行watcher实例的evaluate,从而重新执行watcher实例的get)
2. 紧接着初始化watcher，将vm实例，计算属性的函数传入,
3. 将计算属性挂载在vm实例上，也是通过Object.defineProperty挂载,第三个参数对象对应的getter通过createComputedGetter函数生成
4. 判断watcher.dirty是否为true 为true说明他依赖的数据更新了，那么执行watcher.evaluate更新数据，设置watcher.value为最新的值（每一次数据更新触发watcher.update函数都会让wathcer上的dirty变成true）
5. evaluate调用了watcher.get()方法，get 调用dep的pushTarget方法讲自己挂载在Dep.target上，之后执行了getter也就是最开始拿到的那个计算属性函数
6. 之后判断Dep.target上是否有值，有就调用watcher.depend()执行watcher的依赖收集方法然后执行dep.depend()=> Dep.target.addDep(this)=>*dep*.addSub(this)=>this.subs.push(*sub*)
7. 也就是watcher.depend=>dep.depend=>watcher.addDep=>dep.addSub=>dep.subs.push

#### initComputed 

> 初始化computed 

```javascript
function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  // 在vm实例上占个坑位
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    // 获取到computed里的一个函数
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      // 在刚才的坑位上把Watcher实例对象塞进去 相当于vm._computedWatchers[key]
      // 传入vm实例，getter就是计算属性里的那个函数，computedWatcherOptions用来代表这是一个计算属性
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions //lazy:true 默认不会执行
      )
    }

    
    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef) //将计算属性定义到实例上 如果vm实例上没有的话
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```

#### defineComputed

> 创建一个对象 一个包含getter和setter的对象并挂载到vm实例上

```javascript
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key) //创建getter
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

#### createComputedGetter

> 创建getter

```javascript
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      // 如果watcher.dirty是ture说明他是脏的 说明依赖的数据被修改过了
      if (watcher.dirty) {
        watcher.evaluate()//就会执行evaluate重新计算
      }
      if (Dep.target) {//如果存在Dep.target 则执行watcher.depend()
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

##### watcher.evaluate()

> 重新计算数据

```javascript
evaluate () {
    this.value = this.get()//执行watcher实例上的get方法
    this.dirty = false
  }
```

##### watcher.get()

```javascript
get () {
    pushTarget(this)//这个就是Dep.target = target  这是Dep的方法
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)//执行最早获取的那个计算属性里的函数getter
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
```

##### pushTarget()

```javascript
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target//将watcher实例放在了Dep构造函数的target属性上
}
```

##### watcher.depend()

```javascript
depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()//执行dep的depend 也就是依赖收集
    }
  }
```

##### dep.depend()

```javascript
depend () {
    if (Dep.target) {
      Dep.target.addDep(this)//Dep.target是watcher实例 这是watcher实例的addDep方法
    }
  }
```

##### watcher.addDep()

```javascript
addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)//调用传进来的dep上的addSub将watcher实例添加进dep的subs里
      }
    }
  }
```

##### dep.addSub()

```javascript
addSub (sub: Watcher) {
    this.subs.push(sub)//subs就是存放订阅者的地方
  }
```

##### watcher上的update()

```js
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      //lazy是true 说明是计算属性用了这个watcher
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }
```



