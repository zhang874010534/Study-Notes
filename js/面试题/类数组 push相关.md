### 一道类数组相关面试题

什么是类数组，类数组就是 拥有`length`属性，且其他属性（索引）为非负整数的对象，且不具备数组所用于的方法。比如我们常用的`document.querySelectorAll`返回的`NodeLists`就是一个类数组。这道题就是和类数组相关的内容.

#### 题目

请说出以下代码输出的内容，需要区分`nodejs`,`chrome`以及`chrome`去掉`splice`之后的输出内容

```javascript
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push //也可以自己把Array上的push  .call过来
}
obj.push(1)
obj.push(2)
console.log(obj)
```

#### 答案

这道题一共问了三种情况下面的输出，下面依次说明答案

1. `node`下面输出

   ```
   { '2': 1,
     '3': 2,
     length: 4,
     splice: [Function: splice],
     push: [Function: push] }
   ```

2. `chrome`下面输出

   ```
   [empty × 2, 1, 2, splice: ƒ, push: ƒ]
   ```

3. `chrome`去掉`splice`下面输出

   ```
   {2: 1, 3: 2, length: 4, push: ƒ}
   ```

通过上面输出的内容，可以看出相同的代码，不同情况输出的内容是有所不同的，下面进行详细分解。

#### 题解

在解答题目之前，我们再看看这段代码

```javascript
const arr = new Array(2)
// 输出  2 [empty * 2]
console.log(arr.length, arr)
arr.push(1)
// 输出  3 [empty * 2, 1]
console.log(arr.length, arr)
```

可以看到`push`方法会将数组的`length + 1`, 然后将值放在索引为`length - 1`的位置,比如上面的代码，因为在初始化数组的时候，已经将数组长度指定为了`2`, 所以在`push`之后`length`就变成了`3`,然后`arr[3 - 1] = 1`

在`MDN`上面对`push`的方法的解释是:

> **`push` 方法具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上**。`push` 方法根据 `length` 属性来决定从哪里开始插入给定的值。如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。

**根据`MDN`解释，`push`既可以使用到数组中，也可以使用到类数组中。而根据前文中对类数组的解释，可以看到题目中的`obj`就是一个标准的类数组，那就可以在`obj`上面使用数组的`push`方法。**

**再看`obj.push(1)`, 因为`obj.length = 2`, 所以会将`length + 1`就变成了`3`, 这时候 索引值时`obj[3 - 1] = 1` 即`obj[2] = 1`, 同理 `obj.push(2)` 也一样的。因为在`obj`中已经有了属性(索引)`2`和`3`，所以在`push`的时候会覆盖掉`2`和`3`上面的默认值。**

所以在`nodejs`中就会输出

```
{ '2': 1,
  '3': 2,
  length: 4,
  splice: [Function: splice],
  push: [Function: push] }

```

但是在`chrome`控制台中输出

```
[empty × 2, 1, 2, splice: ƒ, push: ƒ]

```

很奇怪，为什么会输出这样呢？这一块有一个很特殊的陷阱，就是`chrome`控制台是如何判断打印的内容是数组还是其他对象呢？对于这个，`chrome`就是通过判断对象上面是否有`splice`和`length`这两个属性来判断的，所以如果你将`splice`去掉之后，就会输出以下内容

```
{2: 1, 3: 2, length: 4, push: ƒ}
```

你也可以试试下面的代码:

```javascript
console.log({splice:function(){},length:1})
console.log({slice:function(){},length:1})
```


链接：https://juejin.im/post/6866920515420815374#heading-0
