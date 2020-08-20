https://segmentfault.com/q/1010000022163687 观念更正  MutationObserver

https://juejin.im/post/6844904088963022856#heading-1  promise源码可供参考,  .then微任务模拟用的setTimeout宏任务(**错误做法**)

https://blog.csdn.net/XuM222222/article/details/88582131 promise.then()中的函数是在resolve()被推出微任务的，还是在then的时候被推入微任务的？

```js
  let p1 = new Promise((resolve) => {
    setTimeout(() => {
      console.log('1');
      resolve();
      console.log('1');
    });
  }).then(() => {
    console.log('2');
  });
  console.log('3');
```

第一次如果没有执行resolve 那么第一个promise实例上就没有value，status也是pending

那么.then执行的时候会将自己的这个函数添加进promise实例的一个数组上,等待resolve()执行这个微任务,

被添加的这个数组.then在外面封装了一层MutationObserver(很多文章用setTimeout宏任务来模拟，我觉得不太好),

所以输出的顺序是3 1 1 2 ,



如果第一次执行了resolve(value),那么this.value上就会有值(this.value=value,这是给之后.then里的函数用的),状态会变成resolve,.then阶段直接执行.then里的函数,自己去拿this.value来用，这是微任务所以resolve如果放在setTimeout的外面，最后会输出 3 2 2 1

```js
  let p1 = new Promise((resolve) => {
    resolve();
    setTimeout(() => {
      console.log('1');
      console.log('1');
    });
  }).then(() => {
    console.log('2');
  });
  console.log('3');
```

