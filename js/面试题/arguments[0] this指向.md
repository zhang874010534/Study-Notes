### arguments 面试题

在`ES6`中，我们如果一个函数参数个数不确定，我们一般会使用扩展运算符即`function(...rest){}`,得到一个参数数组`rest`，但是在`ES6`之前，我们是不能使用扩展运算符的，这时候就需要考虑使用`arguments`

#### 题目

请说出以下程序输出的内容(chrome输出内容)

```javascript
let obj = {
  age: 18,
  foo: function(func) {
    func()
    arguments[0]()
  }
}

var age = 10
function fn() {
  console.log(this.age)
}

obj.foo(fn)
```

#### 答案

本题的答案是:

```javascript
// 第一个输出 10
func()
// 第一个输出 undefined
arguments[0]()
```

有点出乎意料了吗？

先来解释一下第一个，为什么不是输出`18`呢，虽然`func()`是在`foo`函数里面调用的，但是并没有显式指明作用域，这时候会使用默认作用域`window`，而对于浏览器来说，在全局通过`var`声明的变量会自动挂载到`window`上面，所以`var age = 10`相当于`window.age = 10`, 而第一个`func()`里面的`this.age`相当于`window.age`

第二个可能许多人有点蒙，为啥是`undefined`,先看一下下面的代码

```javascript
  let arr = [
    function () {
      console.log(this.age);
    },
    'nihao'
  ];
  arr.age = '123';
  arr[0]();// '123'
```

我们通过`arr[0]`获取到函数，这时候函数的作用域就是这个数组，所以再调用的时候，`this`就是`arr`, 

这时候回过头来看`arguments`,这个其实是一个类数组，里面存的是函数传入的参数，第一项就是传入的函数，和上面例子一样，`arguments[0]`的作用域就是`arguments`,而`arguments`上面并没有`age`属性，所以是`undefined`

链接：https://juejin.im/post/6866920515420815374#heading-7