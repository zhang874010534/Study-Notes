/*
*   vm: vue实例对象
*   exp: 对象的属性
*   cb: 真正包含数据更新逻辑的函数
*/
function Watcher(vm, exp, cb){
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  // 初始化的时候触发数据属性的get方法，即可以将订阅者添加到订阅器中
  this.value = this.get();
}

// 触发数据属性的get方法: 访问数据属性即可实现
Watcher.prototype.get = function() {
  // 把Watcher实例保存到了Dep的target属性上
  Dep.target = this;
  // 访问数据属性逻辑
  var value =  this.vm.data[this.exp];
  // 将实例清空释放
  Dep.target = null;
  return value;
}
Watcher.prototype.update = function() {
  // 当update被触发时，此时获取到的数据属性值是已经被修改过后的新值
  var newValue = this.vm.data[this.exp];
  var oldValue = this.value;

  if(oldValue !== newValue){
      // 触发传递给Watcher的更新数据的函数
      this.cb.call(this.vm, newValue);
  }
}
