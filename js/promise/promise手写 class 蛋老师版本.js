class MyPromise {
  static PENDING = '待定'
  static FULFILLED = '成功'
  static REJECT = '拒绝'
  constructor(func) {
    this.status = MyPromise.PENDING
    this.result = null
    this.resolveCallBacks = []
    this.rejectCallBacks = []
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // 直接执行而不是创建了实例再执行，所以不需要bind this
      this.reject(error)
    }
  }
  resolve(result) {
    setTimeout(() => {
      if(this.status == MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED
        this.result = result
        this.resolveCallBacks.forEach(callBack => callBack(result))
      } 
    });
  }
  reject(result) {
    setTimeout(() => {
      if(this.status == MyPromise.PENDING) {
        this.status = MyPromise.REJECT
        this.result = result
        this.rejectCallBacks.forEach(callBack => callBack(result))
      } 
    });

  }
  then(onFULFILLED, onREJECTED) {
    // 还需要MutationObserver 实现微任务
    return new MyPromise((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED == 'function' ? onFULFILLED : () => {}
      onREJECTED = typeof onREJECTED == 'function' ? onREJECTED : () => {}
      if(this.status == MyPromise.PENDING) {
        this.resolveCallBacks.push(onFULFILLED)
        this.rejectCallBacks.push(onREJECTED)
      }
      if(this.status == MyPromise.FULFILLED) {
        setTimeout(() => {
          onFULFILLED(this.result)
        });
      }
      if(this.status == MyPromise.REJECT) {
        setTimeout(() => {
          onREJECTED(this.result)
        });
      }  
    })
  }
}
console.log('1')
let promise = new MyPromise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    resolve('张策')
    console.log(5)
  }, 1000);
  // throw new Error('失败了')
})

setTimeout(() => {
  console.log(3) 
},1000);
promise.then(
  (result) => {
    console.log(result)
  },
  (result) => {
    console.log(result)
  }
)
console.log(4)