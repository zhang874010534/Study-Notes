[Generator](https://juejin.im/post/5ef8377f6fb9a07e693a6061#heading-70)   [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

Generator函数可以说是Iterator接口的具体实现方式。Generator 最大的特点就是可以控制函数的执行。

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

- 首先 Generator 函数调用时它会返回一个迭代器
- 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
- 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
- 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42

**也就是说第二次.next传入的12 就是yield(x+1)的结果，所以y就是2*12也就是24,第三次的.next之后，参数的值就看我有没有传入值，因为传入了第二个yeild所以y是24而不是12，因为传入了13，所以z不是8而是13**



### 传统的生成器方法

- `Generator.prototype.next() `

  返回 [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 表达式产生的值. 与ES2015 生成器对象的**next()**方法对应.

- `Generator.prototype.close()` 

  关闭生成器，因此执行该函数后调用`next()函数时将会抛出` [`StopIteration`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/StopIteration) 错误. 与ES2015 生成器对象的**return()**方法对应..

- `Generator.prototype.send()` 

  用于将值发送到生成器。 该值由 [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 表达式返回, 并且返回下一个 [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 表达式产生的值. `send(x)` 对应于ES2015生成器对象中的 **next(x)**

- `Generator.prototype.throw()`

  向生成器抛出错误. 与ES2015 生成器对象的**throw()**方法对应.