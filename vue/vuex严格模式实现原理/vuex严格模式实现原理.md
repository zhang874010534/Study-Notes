vuex-dev/dist/

#### 首先要开启严格模式。

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

#### 接受参数

```js
const {
      strict = false
    } = options

// strict mode
    this.strict = strict

 // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }
```

接收参数，如果strict就调用enableStrictMode方法

#### enableStrictMode实现

```js
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, `do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}
// util.js里提供的
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```

store._committing必须为true,否则就警报

#### Store.prototype.commit

```js
Store.prototype.commit = function commit(){
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
}
```

#### Store.prototype._withCommit

```js
Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
```

执行之前让_committing为true，那么 assert执行的时候就不会报错，之后再把值变回false





就是我们设置了严格模式 那么有个函数每次数据修改的时候都会执行(enableStrictMode) 当我是store.commit正常通过mutaition修改vuex里的数据的时候 在这个mutation方法触发的瞬间一个叫store._committing的值会暂时变成true 

方法执行完store.committing会再次变成false

所以如果不通过commit触发mutation上的方法 这个store.committing就一直是false 那么每次修改数据的时候enableStrictMode 都会报错

简单讲就是一个变量是true 才不会报错 然后只有commit触发vuex里的mutation方法的时候这个变量才能是true