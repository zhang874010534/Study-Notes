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

### ECMAScript

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

