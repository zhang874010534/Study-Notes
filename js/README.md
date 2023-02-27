#### [window.atob   window.btoa](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64)

> `atob()` 函数能够解码通过base-64编码的字符串数据。
>
> 相反地，`btoa()` 函数能够从二进制数据“字符串”创建一个base-64编码的ASCII字符串。

#### [atan2](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)(y,x)

> 返回正切值

#### Math.cos()

> 传入弧度 比如Math.PI 那就返回-1

#### Math.sin()

> 传入弧度 比如Math.PI 那就返回1.2246467991473532e-16   无限接近于0  。。。。。

#### [navigator.storage.estimate()](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/NavigatorStorage/storage)

> 了解您的浏览器使用的大约多少空间用于本地存储。

#### [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

> 接口定义了一些实用的方法来处理 URL 的查询字符串

#### [Node.contains()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

> 返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

#### [document.scrollingElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement)

> 能自己识别文档的滚动元素， 其在PC端等于`document.documentElement`, 其在移动端等于`document.body`

#### [Element.scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

> 滚动元素的父容器，可以用来滚动到顶部

#### [Dom.scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)

> 滚动

```js
// 平滑滚动
window.scrollTo({
    top: 1000,
    left: 1000,
    behavior: "smooth"
});
```

#### [ToLocalString](https://blog.csdn.net/qq_42453950/article/details/88339163)

```js
const num = 2333333;
num.toLocaleString('zh', { style: 'decimal' });   //2,333,333
num.toLocaleString('zh', { style: 'percent' });   //233,333,300%


const num = 2333333;
num.toLocaleString('zh', { style: 'currency', currency: 'CNY' });    //￥2,333,333.00
num.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'code' });      //CNY2,333,333.00
num.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'name' });      //2,333,333.00人民币

const date = new Date();
date.toLocaleString('zh', { hour12: true });        //2018/4/4 下午6:57:36
date.toLocaleString('zh', { hour12: false });       //2018/4/4 18:57:36

```

### Element

#### [Element.closest()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)

> **`Element.closest()`** 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 `null`。

```js
e.target.closest('.item').classList.add("current");
```

### Window

#### getComputedStyle

```js
// 拿到CSSStyleDeclaration上面有一个方法getPropertyValue获取属性
getComputedStyle(temp1).getPropertyValue('bottom')
```

#### matchMedia

[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 的 **`matchMedia()`** 方法返回一个新的 [`MediaQueryList`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList) 对象，表示指定的[媒体查询 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)字符串解析后的结果。返回的 `MediaQueryList` 可被用于判定 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 是否匹配媒体查询，或者监控一个 `document` 来判定它匹配了或者停止匹配了此媒体查询。

matchMedia() 方法的值可以是任何一个 [CSS @media 规则](https://www.runoob.com/cssref/css3-pr-mediaquery.html) 的特性, 如 **min-height, min-width, orientation** 等。

MediaQueryList 对象有以下两个属性：

- **media**：查询语句的内容。
- **matches**：用于检测查询结果，如果文档匹配 media query 列表，值为 true，否则为 false。

```js
if (window.matchMedia("(max-width: 700px)").matches) {
    /* 窗口小于或等于 700 像素 */
} else {
    /*窗口大于 700 像素 */
}
```

### [ECMAScript](http://es.xiecheng.live/introduction/preface.html)

#### ES6（2015）

##### 类(class)

```js
class Man{
    constructor(options){
        this.name = options.name
    }
    log(){
        console.log(this.name);
    }
}
const man = new Man({name:"mgd"});
man.log(); //mgd
```

##### 模块化(ES Module)

```js
export const sub = (a,b)=>a+b
import { sub } from './test'
console.log(sub(2,5));
```

##### 箭头函数

```js
const func = (a,b)=> a+b
func(2,5);
console.log(func(2,5)); //7
```

##### 函数参数默认值

```js
function func2(age = 25){
    console.log(age);
}
func2() //25
func2(18) //18
```

##### 模板字符串

```js
let food = '包子'
const str = `爱吃${food}`
console.log(str); //爱吃包子
```

##### 解构赋值

```js
let a = 1;
let b = 2;
[a,b] = [b,a]
console.log([a,b]); //[2, 1]
```

##### 扩展运算符

```js
let arr = [1,2,3,4,5,56,7]
let str2 = 'good good study'
console.log(...arr); //1 2 3 4 5 56 7
console.log(...str2); //g o o d   g o o d   s t u d y
```

##### 对象属性简写

```js
const name = 'mgd'
const obj = {name}
console.log(obj); // {name: "mgd"}
```

##### Promise

```js
Promise.resolve().then(()=>{
    console.log(2);
})
console.log(1);
// 先打印1，后打印2
```

##### let和const

```js
let name2 = "zhangce"
const arr2 = []
```

#### ES7（2016）

##### Array.prototype.includes()

```js
let arr3 = [1,2,34,56]
let bull = arr3.includes(34)
console.log(bull); //true
```

##### 指数操作符

```js
let num = 2**10
console.log(num); //1024
```

#### ES8（2017）

##### async/await 异步终极解决方案

```js
async getData(){
    const res = await api.getListData() //异步任务
    // 执行函数
}
```

##### Object.values()

```js
let obj2 = {a: 1, b: 2, c: 3}
let arr4 = Object.values(obj2); 
console.log(arr4); // [1, 2, 3]
```

##### Object.entries()

```js
let arr5 = Object.entries(obj2)
console.log(arr5); //[["a", 1], ["b", 2], ["c", 3]] 
```

##### String padding

```js
let str3 = "好好学习"
// padStart
let str4 = str3.padStart(10); 
console.log(str4); //      好好学习
// padEnd
let str5 = str3.padEnd(10)
console.log(str5,"。"); //好好学习  
```

##### 函数参数列表结尾允许逗号

```js
function (age,name,height,){
    console.log(age,name,height);
}
```

##### Object.getOwnPropertyDescriptors()

获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

##### SharedArrayBuffer对象

SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区

```js
/**
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
*/
new SharedArrayBuffer(10)
```

##### Atomics对象

```js
Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
const sab = new SharedArrayBuffer(1024);
const ta = new Uint8Array(sab);
console.log(ta[0]); //0
ta[0] = 5
console.log(ta[0]);// 5
```

###### Atomics.add()

将指定位置上的数组元素与给定的值相加，并返回相加前该元素的值。

```js
Atomics.add(ta, 0, 12);
console.log(ta[0]); //17
```

###### Atomics.load()

返回数组中指定元素的值。

```js
Atomics.load(ta, 0);
console.log(Atomics.load(ta, 0)); //17
```

###### Atomics.and()

```js
将指定位置上的数组元素与给定的值相与，并返回与操作前该元素的值。
Atomics.and(ta, 0, 1);
console.log(Atomics.and(ta, 0, 1)); //1
console.log(Atomics.load(ta, 0)); //1
```

##### Atomics.compareExchange()

如果数组中指定的元素与给定的值相等，则将其更新为新的值，并返回该元素原先的值。

```js
Atomics.compareExchange(ta, 0, 5, 12);
Atomics.load(ta, 0); // 12
```

##### Atomics.exchange()

将数组中指定的元素更新为给定的值，并返回该元素更新前的值。

```js
Atomics.exchange(ta, 0, 12);
Atomics.load(ta, 0); // 12
```

##### Atomics.isLockFree(size)

可以用来检测当前系统是否支持硬件级的原子操作。对于指定大小的数组，如果当前系统支持硬件级的原子操作，则返回 true；否则就意味着对于该数组，Atomics 对象中的各原子操作都只能用锁来实现。此函数面向的是技术专家。

```js
Atomics.isLockFree(1); // true
Atomics.isLockFree(2); // true
Atomics.isLockFree(3); // false
Atomics.isLockFree(4); // true
```

##### Atomics.or()

将指定位置上的数组元素与给定的值相或，并返回或操作前该元素的值。

```js
Atomics.or(ta, 0, 1);
Atomics.load(ta, 0);  // 5
```

##### Atomics.store()

将数组中指定的元素设置为给定的值，并返回该值。

```js
Atomics.store(ta, 0, 12); // 12
```

##### Atomics.sub()

将指定位置上的数组元素与给定的值相减，并返回相减前该元素的值。

```js
Atomics.sub(ta, 0, 2);
Atomics.load(ta, 0); // 3
```

##### Atomics.xor()

将指定位置上的数组元素与给定的值相异或，并返回异或操作前该元素的值。

```js
Atomics.xor(ta, 0, 1);
Atomics.load(ta, 0); // 4
```

#### ES9（2018）

##### 异步迭代

await可以和for…of循环一起使用，以串行的方式运行异步操作

for await of 循环可以暂停循环，当第一个异步执行完成后才会执行下一个，最后结果是让输出结果保持同步顺序输出

```js
function getTime(seconds){
    return new Promise(resolve=>{
        setTimeout(() => {
            console.log(seconds)
            resolve(seconds)
        }, seconds);
    })
}
async function test(){
    let arr = [getTime(2000), getTime(300), getTime(1000)]
    for await (let x of arr){
        console.log(x,'fff');
    }
}
test() // 300 1000 2000 2000 300 1000
```

##### Promise.finally()

```js
Promise.resolve().then().catch(e => e).finally();
```

##### Rest/Spread 属性

```js
const obj = {
    foo: 1,
    bar: 2,
    baz: 3,
}
const {foo, ...rest} = obj
```

##### 正则表达式命名捕获组

```js
let s = 'aaa bbb ccc'
let reg = /\w+\b/g
// reg是正则方法 match是String方法
reg.exec(s) // ['aaa', index: 0, input: 'aaa bbb ccc', groups: undefined]
reg.exec(s) // ['bbb', index: 4, input: 'aaa bbb ccc', groups: undefined]
reg.exec(s) // ['ccc', index: 8, input: 'aaa bbb ccc', groups: undefined]
s.match(reg)// ['aaa', 'bbb', 'ccc']
```

##### [正则表达式反向引用、零宽断言](https://segmentfault.com/a/1190000020279201)

###### 反向引用

```js
\1代表和第一个分组匹配的内容一致 \2代表和第二个分组匹配的内容一致
'abacdcdab'.match(/(\w)(\w)\1\2/g) // ['cdcd']

会匹配aba
'abacdcdab'.match(/(\w)(\w)\1)/  ['aba', 'a', 'b', index: 0, input: 'abacdcdad', groups: undefined]
                  
判断是否存在连续小写字符
/([a-z])\1/.test('abcdeff') // true
```

###### 零宽断言

断言又有很多中叫法，比如环视，巡视。断言一共又分4种：

1. x(?=y) 匹配‘x’仅仅当‘x’后面跟着‘y’.这种叫做先行肯定断言。
2. (?<=y)x 匹配‘x’仅仅当‘x’前面是‘y’.这种叫做后行肯定断言。
3. x(?!y) 仅仅当‘x’后面不跟着‘y’时匹配‘x’，这被称为正向否定断言。
4. (?<!y)x 仅仅当‘x’前面不是‘y’时匹配‘x’，这被称为反向否定断言。

不同语言叫法不同，先行后行，正向反向都是一个意思。

```js
>'zhangce'.replace(/zhang(?=ce)/,'left')
<'leftce'
>'zhangce'.replace(/(?<=zhang)ce/,'right')
<'zhangright'
```

千分位处理

```js
>let a = '12345677'
>a.replace(/(\d)(?=(\d{3})+$)/g,"$1,")
<'12,345,678'
```

##### 正则表达式dotAll模式

正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现

```js
/hello.world/.test('hello\nworld'); // false
/hello.world/s.test('hello\nworld'); // true
```

s 的含义是 singleline 和 dotAll。

singleline(单行)对应的是 multiline(多行)。

`m` 标志用于指定多行输入字符串应该被视为多个行。如果使用 `m` 标志，`^` 和 `$` 匹配的开始或结束是字符串中的每一行，而不是整个字符串的开始或结束。

- `m` 标志只影响 `^` 和 `$`
- `s` 标志只影响 `.`

```js
/^java/.test('just\njava\n');   // false
/^java/m.test('just\njava\n');  // true
```

#### ES10（2019）

##### Array.flat()和Array.flatMap()

```js
let arr6 = [1, 2, [3, 4]].flat(Infinity);
console.log(arr6); //[1, 2, 3, 4]

[1,3,[4,5]].flatMap( item => {
    if(Object.prototype.toString.call(item) === '[object Array]') {
       return item.map(mapItem => mapItem * 2)
    }
    return item * 2
}) // [2, 6, 8, 10]
```

##### String.trimStart()和String.trimEnd()

去除字符串首尾空白字符

```js
let str = '    ccc     '
console.log(str.trimStart()); //ccc     
console.log(sr.trimEnd());//    ccc
```

##### String.prototype.matchAll

matchAll（）为所有匹配的匹配对象返回一个迭代器

```js
let s = 'aaa bbb ccc'
let reg = /\w+\b/g
for (let match  of smatch.matchAll(reg)) {
    console.log(match)
}

['aaa', index: 0, input: 'aaa bbb ccc', groups: undefined]
['bbb', index: 4, input: 'aaa bbb ccc', groups: undefined]
['ccc', index: 8, input: 'aaa bbb ccc', groups: undefined]
```

##### Symbol.prototype.description

只读属性，回 Symbol 对象的可选描述的字符串。

```js
Symbol('123').description; // '123'
```

##### Object.fromEntries()

把键值对列表转换为一个对象

```js
const arr = [['name','zhangce']]
Object.fromEntries(arr) // {name: 'zhangce'}
```

##### 可选Catch

ES10之前

```js
try {
    // tryCode
} catch (err) {
    // catchCode
}
```

ES10 可省略 err

```
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```

#### ES11（2020）

##### Nullish coalescing Operator(空值处理)

表达式在 ?? 的左侧 运算符求值为undefined或null，返回其右侧。

```js
0 ?? 'you' // 0
false ?? 'you' // false
'' ?? 'you' // ''
null ?? 'you' // 'you'
undefined ?? 'you' // 'you'
```

##### Optional chaining（可选链）

 ? 表示如果问号左边表达式有值, 就会继续查询问号后面的字段

```js
const obj = {
    like: {
        name: 123,
    }
}
console.log(obj?.other?.age) // undefined
console.log(obj.other.age) // Uncaught TypeError: Cannot read properties of undefined (reading 'age')
```

##### Promise.allSettled

学习了ES新特性，我们都知道 Promise.all() 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态

```js
Promise.allSettled([
    Promise.reject({
        code: 500,
        msg: '服务异常'
    }),
    Promise.resolve({
        code: 200,
        data: ['1', '2', '3']
    }),
    Promise.resolve({
        code: 200,
        data: ['4', '5', '6']
    })
]).then(res => {
    console.log(res) // 这里会输出3个包括异常的
    const data = res.filter(item => item.status === 'fulfilled')
    console.log(data)
}).catch(err => {
    console.log(err)
    console.log('失败')
})
```

##### Dynamic Import

按需 import 提案几年前就已提出，如今终于能进入ES正式规范。这里个人理解成“按需”更为贴切。现代前端打包资源越来越大，打包成几M的JS资源已成常态，而往往前端应用初始化时根本不需要全量加载逻辑资源，为了首屏渲染速度更快，很多时候都是按需加载，比如懒加载图片等。而这些按需执行逻辑资源都体现在某一个事件回调中去加载。

页面上有一个按钮，点击按钮才去加载ajax模块。

```js
const oBtn = document.querySelector('#btn')
oBtn.addEventListener('click', () => {
    import('./ajax').then(mod => {
        // console.log(mod)
        mod.default('static/a.json', res => {
            console.log(res)
        })
    })
})
```

当然，webpack目前已很好的支持了该特性。

Vue中也已使用Dynamic Import实现组件的动态导入，这个我们会在后面的实战项目中讲到。

##### BigInt

在 ES10 增加了新的原始数据类型：BigInt，表示一个任意精度的整数，可以表示超长数据，可以超出2的53次方。

Js 中 Number类型只能安全的表示-(2^53-1)至 2^53-1 范的值

```js
console.log(2 ** 53) // es7 幂运算符
console.log(Number.MAX_SAFE_INTEGER) // 最大值-1
```

使用 BigInt 有两种方式：

方式一：数字后面增加n

```js
const bigInt = 9007199254740993n
console.log(bigInt)
console.log(typeof bigInt) // bigint

console.log(1n == 1) // true
console.log(1n === 1) // false
```

方式二：使用 BigInt 函数

```js
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum)
```

##### globalThis

Javascript 在不同的环境获取全局对象有不通的方式：

- node 中通过 global
- web 中通过 window, self 等.

```js
console.log(globalThis)
```

#### ES12（2021）

##### replaceAll

返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉

```js
const str = 'hello world
str.replaceAll(l,'') // heo word
```

##### Promise.any

Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

```js
  const promise1 = new Promise((resolve, reject) => resolve(1));
  const promise2 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
  const promiseList = [promise1, promise2];
  Promise.any(promiseList)
    .then(values=>{
      console.log(values);
    })
    .catch(e=>{
      console.log(e);
    });
```

##### WeakRefs

用于直接创建对象的弱引用

```js
let target = {};
let wr = new WeakRef(target);
wr.deref() // 获取原始对象
```

##### FinalizationRegistry

清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。

```js
const registry = new FinalizationRegistry(heldValue => {
  // ....
});

// 注册需要观察的对象
registry.register(theObject, "some value", theObject);
// 取消注册 如果以后还想取消已经注册的回调函数，则要向register()传入第三个参数，作为标记值。这个标记值必须是对象，一般都用原始对象。接着，再使用注册表实例对象的unregister()方法取消注册。
registry.unregister(theObject);

//由于无法知道清理器何时会执行，所以最好避免使用它。另外，如果浏览器窗口关闭或者进程意外退出，清理器则不会运行。
```

##### 逻辑运算符和赋值表达式

```js
a ||= b
//等价于
a = a || b

a &&= b
//等价于
a = a && b

a ??= b
//等价于
a = a ?? b
```

##### [数字分隔符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#literals) Numeric separators

数字分隔符，可以在数字之间创建可视化分隔符，通过_下划线来分割数字，使数字更具可读性

```js
const money = 1_000_000_000;
//等价于
const moneys = 1000000000;
money === moneys // true
```

#### ES13（2022）

##### [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

```js
class Private {
  #name = '#name'; // 私有变量
  static #staticName = '#staticName'; // 静态私有变量

  #method() { // 私有方法
    console.log(this.#name)
  }
  static #staticMethod() { // 静态私有方法
    console.log(this.#staticName)
  }
  publicMethod() { // 公共方法
    this.#method()
  }
  static publicStaticMethod() { // 静态公共方法
    this.#staticMethod()
  }
}
const private = new Private()
private.publicMethod() // #name 
Private.publicStaticMethod() // #staticName
```

##### RegExp Match Indices

正则匹配结果的开始位置和结束位置，目前获取并不是很方便。正则实例的 `exec()`方法，返回结果有一个 `index` 属性，可以获取整个匹配结果的开始位置，但是如果包含组匹配，每个组匹配的开始位置，很难拿到。

ES2022 中提供`d`修饰符，为 `exec()`方法的返回结果加上 `indices` 属性，在这个属性上面可以拿到匹配的开始位置和结束位置。

注意：出于性能原因，`indices` 只有在 `d` 指定了标志时才会添加到结果中。

```js
const text = 'zabbcdef';
const re = /ab/d;
const result = re.exec(text);

result.index; // 1
result.indices; // [ [1, 3] ]
```

上面例子中，`exec()`方法的返回结果 `result`，它的 index 属性是整个匹配结果`（ab）`的开始位置，而它的 `indices` 属性是一个数组，成员是每个匹配的开始位置和结束位置的数组。由于该例子的正则表达式没有组匹配，所以 `indices` 数组只有一个成员，表示整个匹配的开始位置是 `1`，结束位置是 `3`。

注意，开始位置包含在匹配结果之中，但是结束位置不包含在匹配结果之中。比如，匹配结果为 `ab`，分别是原始字符串的第 1 位和第 2 位，那么结束位置就是第 3 位。

如果正则表达式包含组匹配，那么 `indices` 属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置。

```javascript
const text = 'zabbcdef';
const re = /ab+(cd)/d;
const result = re.exec(text);

result.indices; // [ [ 1, 6 ], [ 4, 6 ] ]
```

上面例子中，正则表达式包含一个组匹配，那么 `indices` 属性数组就有两个成员，第一个成员是整个匹配结果`（abbcd）`的开始位置和结束位置，第二个成员是组匹配`（cd）`的开始位置和结束位置。

下面是多个组匹配的例子。

```javascript
const text = 'zabbcdef';
const re = /ab+(cd(ef))/d;
const result = re.exec(text);

result.indices; // [ [1, 8], [4, 8], [6, 8] ]
```

上面例子中，正则表达式包含两个组匹配，所以 `indices` 属性数组就有三个成员。

##### Top-level

以前我们使用 `await` 时，必须要放到 `async` 函数里，这就限制了一些场景，比如我们在全局作用域使用 `import` 的异步加载方式。而这个特性就是为这些场景提供了便利：

```js
const strings = await import(`/i18n/${navigator.language}`);
```

#####  Ergonomic brand checks for Private Fields

```js
class C {
    #brand;

    #method() {}

    get #getter() {}

    static isC(obj) {
        return #brand in obj && #method in obj && #getter in obj;
    }
}
const obj = new C()
console.log(C.isC(obj)) // true
```

###### .at()

```js
var a = [1, 2, 3];
a.at(1) // 2
a.at(-1) // 3
```

因为 JavaScript 数组的特殊性(一个特殊的对象）,我们无法通过 `a[-1]` 这种形式取到数组的倒数第一项，所以有了这个语法。

##### hasOwn 

因为 JS 并没有保护叫做 'hasOwnProperty' 的属性名，为了防止意外的产生，现在 Eslint 一般都会默认开启不允许在对象上判断 `hasOwnProperty` 这条校验。

除此之外，我们有一个对象没有原型，也就不能调用 `hasOwnProperty` 方法了：

```js
Object.create(null).hasOwnProperty("foo")
// Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
复制代码
```

于是乎，我们一般都这样来判断：

```js
let hasOwnProperty = Object.prototype.hasOwnProperty

if (hasOwnProperty.call(object, "foo")) {
  console.log("has property foo")
}
复制代码
```

我自己在项目中也是这么写的，但是大家都这么写，JS 就觉得可以考虑出一个公共方法了，就有了 `hasOwn` 方法，可以比较大的简化我们上面的写法：

```typescript
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo")
}
```

##### Class Static Block

以前，我们初始化类的静态成员变量只能在定义的时候去做，不能放到构造函数里面（静态方法不用实例化，就不用调用构造函数了）。

现在，我们可以在类内部开辟一个专门为静态成员初始化的作用域，这对一些比较复杂的场景很适用：

在没有作用域之前，我们可能会使用一个工具函数去初始化：

```js
class Translator {
  static translations = {
    yes: 'ja',
    no: 'nein',
    maybe: 'vielleicht',
  };
  static englishWords = [];
  static germanWords = [];
  static _ = initializeTranslator(); // (A)
}
function initializeTranslator() {
  for (const [english, german] of Object.entries(Translator.translations)) {
    Translator.englishWords.push(english);
    Translator.germanWords.push(german);
  }
}
```

有了类的静态作用域之后，我们就可以按如下的格式了：

```js
class Translator {
  static translations = {
    yes: 'ja',
    no: 'nein',
    maybe: 'vielleicht',
  };
  static englishWords = [];
  static germanWords = [];
  static { // (A)
    for (const [english, german] of Object.entries(this.translations)) {
      this.englishWords.push(english);
      this.germanWords.push(german);
    }
  }
}
```

