function Dep(){
  this.subs = [];
}

Dep.prototype.addSub = function(sub){
  this.subs.push(sub);
}
// 添加依赖
Dep.prototype.depend = function() {
  // addSub添加的是一个订阅者/依赖对象
  // Watcher实例就是订阅者,在Watcher实例初始化的时候，已经将自己保存到了Dep.target中
  if(Dep.target){
      this.addSub(Dep.target);
  } 
}

// 移除依赖
Dep.prototype.removeSub = function(sub) {
  // 源码中是通过抽出来一个remove方法来实现移除的
  if(this.subs.length > 0){
      var index = this.subs.indexOf(sub);
      if(index > -1){
          // 注意splice的用法
          this.subs.splice(index, 1);
      }
  }
}

// 通知数据更新
Dep.prototype.notify = function() {
  for(var i = 0; i < this.subs.length; i++ ){
      // 这里相当于依次调用subs中每个元素的update方法
      // update方法内部实现可以先不用关注,了解其目的就是为了更新数据
      this.subs[i].update()
  }
}
