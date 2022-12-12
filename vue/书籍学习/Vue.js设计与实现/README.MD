## **第一篇 框架设计概览**

### 第1章 权衡的艺术

#### 命令式和声明式

我们直接操作dom的方式就是命令式，我们知道如何去修改dom，vue就是声明式，我希望一个变量从1 => 2，然后vue会用命令式的方式帮我们去修改dom

#### 性能与可维护性的权衡

声明式代码的性能不优于命令式代码的性能，因为声明式需要找出前后的差异并只更新变化的地方。

#### 虚拟DOM的性能到底如何

虚拟DOM，它是声明式的，因此可维护性最强，相较于直接js操作dom和innerHtml的方式,性能也是不错的

![](https://github.com/zhang874010534/tuchuan/blob/main/vue/%E8%99%9A%E6%8B%9FDOM%E7%9A%84%E6%80%A7%E8%83%BD%E5%88%B0%E5%BA%95%E5%A6%82%E4%BD%95.jfif?raw=true)

#### 运行时和编译时

vue是运行时+编译时的框架，template通过compiler转换成树型结构的数据对象放入render中，在运行的时候生成vnode，再通过patch函数生成真实的dom放入页面中。

在编译的时候可以分析用户提供的内容，看看哪些内容未来可能改变，哪些内容永远不会改变，在编译的时候提取这些信息，传给render函数，就可以做进一步的优化。

#### 总结

在本章中，我们先讨论了命令式和声明式这两种范式的差异，其中命令式更加关注过程，而声明式更加关注结果。命令式在理论上可以做到极致优化，但是用户要承受巨大的心智负担；而声明式能够有效减轻用户的心智负担，但是性能上有一定的牺牲，框架设计者要想办法尽量使性能损耗最小化。
接着，我们讨论了虚拟 DOM的性能，并给出了一个公式：**声明式的更新性能消耗=找出差异的性能消耗+ 直接修改的性能消耗**。虚拟 DOM的意义就在于使找出差异的性能消耗最小化。我们发现，用原生JavaScript操作DOM的方法（如 document.createElement）、虚拟DOM和innerHTML三者操作页面的性能，不可以简单地下定论，这与**页面大小**、变更部分的大小都有关系，除此之外，与**创建页面**还是**更新页面**也有关系，选择哪种更新策略，需要我们结合**心智负担**、**可维护性**等因素综合考虑。一番权衡之后，我们发现虚拟DOM是个还不错的选择。
最后，我们介绍了运行时和编译时的相关知识，了解纯运行时、纯编译时以及两者都支持的框架各有什么特点，并总结出Vuejs3是一个编译时+运行时的框架，它在保持灵活性的基础上，还能够通过编译手段分析用户提供的内容，从而进一步提升更新性能。

### 第2章 框架设计的核心要素

#### **提升用户的开发体验**

在框架设计和开发中，需要提供友好的警告信息。

#### **控制框架代码的体积**

一些警告的代码只在开发环境中执行，vue.global.prod.js中是不会出现这段代码的。在开发环境中为用户提供友好的警告信息的同时，不会增加生产环境代码的体积。

#### **框架要做到良好的Tree-Shaking**

有一些函数在生成环境虽然没有意义，但是可能会产生副作用，比如输出了某个对象上的属性，这个对象是通过proxy代理的，那么就会触发代理对象的get夹子，get夹子中是可能产生副作用的。如果我们确定一个函数确定不会产生副作用可以使用注释代码/*#_PURE_*/  foo(),这样foo就不会被编译到最终的文件里去。

rollup.js,webpack以及压缩工具比如terser都是识别它的。

#### **框架应该输出怎样的构建产物**

- vue.global.js

用于开发环境，会带警告

IIFE(Immediately Invoked Function Expresstion) 立即执行函数

- vue.global.prod.js

用于生成环境，不包含警告信息

- vue.esm-broser.js

主流浏览器对原生ESM的支持都不错，可通过script直接引入

```js
<script type="module" src='/vue.esm-browser.js'></script>
```

- vue.esm-bundler.js

和esm-broswer的区别 if(_DEV_) {    warn('111') } if((process.env.NODE_ENV !== 'production')) {    warn('111') }

- vue.cjs.js

commonjs规范

#### **特性开关**

提供开关，用户可以关闭特性

- 对于用户关闭的特性，我们可以利用Tree-Shaking 机制让其不包含在最终的资源中。
- 该机制为框架设计带来了灵活性，可以通过特性开关任意为框架添加新的特性，而不用担心资源体积变大。同时，当框架升级时，我们也可以通过特性开关来支持遗留API,这样新用户可以选择不使用遗留API，从而使最终打包的资源体积最小化。

#### **错误处理**

提供给用户的方法需要代替用户统一处理错误

```js
// util.js
let handleError = null
export default {
    foo(fn) {
        callWithErrorHandling(fn)
    },
    // 用户可以调用该函数注册统一的错误处理函数
    registryErrorHandler(fn) {
        handleError = fn    
    }
}
function callWithErrorHandling(fn) {
    try {
        fn && fn()        
    } catch(e) {
        handleError(e)              
    }
}


import util from 'util.js'
util.registryErrorHandler((e) => {
    console.log(e)
}))


// vue中使用
import App from 'App.vue'
const app = createApp(App)
app.config.errorHandle = () => {}
```



#### **良好的TypeScript类型支持**

编译器自动提示、代码可维护更强、避免低级错误

#### **总结**

本章首先讲解了框架设计中关于开发体验的内容，开发体验是衡量一个框架的重要指标之一。提供友好的警告信息至关重要，这有助于开发者快速定位问题，因为大多数情况下“框架”要比开发者更清楚问题出在哪里，因此在框架层面抛出有意义的警告信息是非常必要的。

但提供的警告信息越详细，就意味着框架体积越大。因此，为了框架体积不受警告信息的影响，我们需要利用Tree-Shaking机制，配合构建工具预定义常量的能力，例如预定义_DEV_常量，从而实现仅在开发环境中打印警告信息，而生产环境中则不包含这些用于提升开发体验的代码，从而实现线上代码体积的可控性。

Tree-Shaking是一种排除 dead code 的机制，框架中会内建多种能力，例如 Vue.js内建的组件等。对于用户可能用不到的能力，我们可以利用Tree-Shaking 机制使最终打包的代码体积最小化。另外，Tree-Shaking 本身基于 ESM，并且JavaScript是一门动态语言，通过纯静态分析的手段进行Tree-Shaking难度较大，因此大部分工具能够识别/#_PURE_#/注释，在编写框架代码时，我们可以利用/#_PURE_#/来辅助构建工具进行 Tree-Shaking。

接着我们讨论了框架的输出产物，不同类型的产物是为了满足不同的需求。为了让用户能够通过

### **第3章 Vue.js 3的设计思路**

#### **声明式地描述UI**

使用与HTML标签一致地方式来描述DOM元素、属性、事件、层级结构

h函数就是一个辅助创建虚拟DOM的工具函数

#### **初识渲染器**

 将虚拟DOM变成真实的DOM

```js
const vnode = {
    tag: 'div',
    props: {
        onClick: () => alert('hello')    
    },
    children: 'click me'
}
```

#### 渲染器

renderer中更复杂的逻辑是交给patch处理的

```js
function renderer(vnode, container) {
    // 使用vnode.tag 作为标签名称创建DOM元素
    const el = document.createElement(vnode.tag)
    // 遍历 vnode.props, 将属性、时间添加到DOM元素
    for(const key in vnode.props) {
        if(/^on/.test(key)) {
            // 如果 key 以 on开头、 说明它是事件
            el.addEventListener(
                key.subStr(2).toLowerCase(), // 事件名称 onClick ---> click
                vnode.props[key] // 事件处理函数     
            )
        }    
    }
    
    // 处理 children
    if(typeof vnode.children === 'string') {
        // 如果 children是字符串，说明它是元素的文本子节点
        el.appendChild(document.createTextNode(vnode.children))    
    }else if(Array.isArray(vnode.children)) {
        // 递归地调用 renderer 函数渲染子节点， 使用当前元素el 作为挂载点
        vnode.children.forEach(child => renderer(child, el))                    
    }
    
    // 将元素添加到挂载点下
    container.appendChild(el)
}
```

#### **组件的本质**

组件就是一组DOM元素的封装，我们可以定义一个函数来表示组件。

```js
const MyComponent = function () {
    return {
        tag: 'div',
        props: {
            onClick: () => alert('hello')        
        },
        children: 'click me'            
    }
}
```

让虚拟DOM对象中的tag属性来存储函数

```js
const vnode = {
    tag: MyComponent
}
```

修改前面的renderer函数来渲染组件

```js
function renderer(vnode, container) {
    if(typeof vnode.tag === 'string') {
        // 说明 vnode 描述的是标签元素
        mountElement(vnode, container)    
    }else if(typeof vnode.tag === 'function') {
        mountComponent(vnode, container)    
    }
}

function mountElement(vnode, container) {
    // 使用vnode.tag 作为标签名称创建DOM元素
    const el = document.createElement(vnode.tag)
    // 遍历 vnode.props, 将属性、时间添加到DOM元素
    for(const key in vnode.props) {
        if(/^on/.test(key)) {
            // 如果 key 以 on开头、 说明它是事件
            el.addEventListener(
                key.subStr(2).toLowerCase(), // 事件名称 onClick ---> click
                vnode.props[key] // 事件处理函数     
            )
        }    
    }
    
    // 处理 children
    if(typeof vnode.children === 'string') {
        // 如果 children是字符串，说明它是元素的文本子节点
        el.appendChild(document.createTextNode(vnode.children))    
    }else if(Array.isArray(vnode.children)) {
        // 递归地调用 renderer 函数渲染子节点， 使用当前元素el 作为挂载点
        vnode.children.forEach(child => renderer(child, el))                    
    }
    
    // 将元素添加到挂载点下
    container.appendChild(el)
}

function mountComponent(vnode, container) {
    // 调用组件函数、获取组件要渲染的内容(虚拟 DOM)
    const subTree = vnode.tag()
    // 递归地调用 renderer 渲染 subTree
    renderer(subTree, container)
}

```

如果MyComponent是一个对象

```js
const MyCompoent = {
    render() {
        return  {
            tag: 'div',
            props: {
                onClick: () => alert('hello')        
            },
            children: 'click me'            
        }   
    }
}


function renderer(vnode, container) {
    if(typeof vnode.tag === 'string') {
        // 说明 vnode 描述的是标签元素
        mountElement(vnode, container)    
    }else if(typeof vnode.tag === 'object') {
        mountComponent(vnode, container)    
    }
}

function mountComponent(vnode, container) {
    // 调用组件函数、获取组件要渲染的内容(虚拟 DOM)
    const subTree = vnode.tag.render()
    // 递归地调用 renderer 渲染 subTree
    renderer(subTree, container)
}
```

#### **模板的工作原理**

```js
<div @click="handler">
    click me
</div>
```

编译器会将模板（就是一个普通的字符串），分析成渲染函数

```js
render() {
    return h('div', { onClick: handler},'click me')
}
```

并添加到<script>标签块的组件对象上

```js
export default {
    data() {},
    methods: {
        handler: () => {}    
    },
    render() {
        return h('div', { onClick: handler},'click me')   
    }
}
```

#### **Vue.js 是各个模块组成的有机整体**

```js
<div id="foo" :class="cls"></div>
```

编译器在编译的时候是能识别出class是动态的然后生成如下render函数

```js
render() {
    return {
        tag: "div",
        props: {
            id: "foo",
            class: cls        
        },
        patchFlags: 1 // 假设数字1 代表 class 是动态的
    }
}
```

将这个render函数传递给渲染器renderer，渲染器可以省去寻找变更点的工作量。

#### **总结**

在本章中，我们首先介绍了声明式地描述UI的概念。我们知道，Vue.js是一个声明式的框架。声明式的好处在于，它直接描述结果，用户不需要关注过程。Vue.js采用模板的方式来描述UI，但它同样支持使用虚拟DOM 来描述UI。虚拟DOM要比模板更加灵活，但模板要比虚拟DOM更加直观。

然后我们讲解了最基本的渲染器的实现。渲染器的作用是，把虚拟DOM对象渲染为真实DOM 元素。它的工作原理是，递归地遍历虚拟DOM对象，并调用原生 DOM API来完成真实DOM的创建。渲染器的精髓在于后续的更新，它会通过Diff算法找出变更点，并且只会更新需要更新的内容。后面我们会专门讲解渲染器的相关知识。

接着，我们讨论了组件的本质。组件其实就是一组虚拟DOM元素的封装，它可以是一个返回虚拟DOM的函数，也可以是一个对象，但这个对象下必须要有一个函数用来产出组件要渲染的虚拟DOM。渲染器在渲染组件时，会先获取组件要渲染的内容，即执行组件的渲染函数并得到其返回值，我们称之为subtree，最后再递归地调用渲染器将 subtree 渲染出来即可。

Vue.js的模板会被一个叫作编译器的程序编译为渲染函数，后面我们会着重讲解编译器相关知识。最后，编译器、渲染器都是 Vue.js的核心组成部分，它们共同构成一个有机的整体，不同模块之间互相配合，进一步提升框架性能。

## **第二篇 响应系统**

### **第4章 响应系统的作用与实现**

#### **响应式数据与副作用函数**

```js
const obj = { text: 'hello world' }
function effect() {
    // effect 函数的执行会读取 obj.text
    ducument.body.innerText = obj.text
}
```

当obj.text的值发生变化时，希望副作用函数effect会重新执行

```js
obj.text = 'hello vue3' // 修改obj.text 的值，同时希望副作用函数会重新执行
```

#### **响应式数据的基本实现**

下面的实现还存在很多缺陷，例如直接通过名字（effect） 来获取副作用函数。

```js
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        // 将副作用函数effect 添加到存储副作用函数的桶中
        bucket.add(effect)
        // 返回属性值
        return target[key]
    },
    set(target, key, newVal) {
        // 设置属性值
        target[key] = newVal
        // 把副作用函数从桶里取出并执行
        bucket.forEach(fn => fn())
        // 返回 true 代表设置操作成功
        return true    
    }
})
```

#### **设计一个完善的响应系统**

希望哪怕副作用函数是一个匿名函数，也能够被正确地收集到桶中,下面提供一个注册副作用函数的机制

```js
// 用一个全局变量存储被注册的副作用函数
let activeEffect
// effect 函数用于注册副作用函数
function effect(fn) {
    // 当调用effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
    activeEffect = fn
    // 执行副作用函数
    fn()
}
```

按照如下方式使用effect函数

```js
effect(
    // 一个匿名的副作用函数
    () => {
        document.body.innerText = obj.text    
    }
)
```

匿名函数会被赋值给全局变量activeEffect，接着执行，触发obj.text的读取操作，proxy的get方法。

```js
const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        if(activeEffect) {
            bucket.add(activeEffect)        
        }
        // 返回属性值
        return target[key]
    },
    set(target, key, newVal) {
        // 设置属性值
        target[key] = newVal
        // 把副作用函数从桶里取出并执行
        bucket.forEach(fn => fn())
        // 返回 true 代表设置操作成功
        return true    
    }
})
```

