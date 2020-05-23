/*
*   obj数据实际上就是vue中的data数据
*/
function Observer(obj){
  this.obj = obj;
  if(Array.isArray(this.obj)){
      //如果是数组，则会调用数组的侦测方法
  }else{
      this.walk(obj);
  }
}
Observer.prototype.walk = function(obj) {
  // 获取obj对象中所有的属性
  var keysArr = Object.keys(obj);
  keysArr.forEach(element =>{
      defineReactive(obj, element, obj[element]);
  })
}
// 参照源码,将该方法为独立一个方法
function defineReactive(obj, key, val) {
  // 如果obj是包含多层数据属性的对象，就需要递归每一个子属性
  if(typeof val === 'object'){
      new Observer(val);
  }
  var dep = new Dep();    
  Object.defineProperty(obj, key,{
      enumerable: true,
      configurable: true,
      get: function(){
          // 在get中添加依赖
          dep.depend();
          return val;
      },
      set: function(newVal) {
          val = newVal;
          // 在set中通知数据更新
          dep.notify();

      }
  })        
}
