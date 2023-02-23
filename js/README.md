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
