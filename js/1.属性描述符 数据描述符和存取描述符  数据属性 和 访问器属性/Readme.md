JS的原型对象上有一个方法：Object.defineProperty()；

这个方法需要传入三个参数：[obj，prop，discriptor]；

我们通过"discriptor"来定义属性，它被叫做**属性描述符**，是一种**对象**，该对象有且只有两种：**存取描述符**、**数据描述符**。

**用存取描述符定义的属性**就是**访问器属性**

属性描述符有两种主要形式：数据描述符和存取描述符。

- 数据描述符是一个拥有可写或不可写值的属性。
- 存取描述符是由一对 getter-setter 函数功能来描述的属性。

描述符必须是两种形式之一，不能同时是两者。

**数据描述符**

以下属性只在**defineProperty**中生效，在基本的对象数据结构中，下面的属性默认是为**true**的。

- **configurable**

是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。**默认为 false**。

- **enumerable**

此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。**默认为false**。

- **writable**

属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。**默认为false**。

- **value**

属性对应的值,可以使任意类型的值，**默认为undefined**。

```text
var obj = {
    test:"hello"
}
//对象已有的属性添加特性描述
Object.defineProperty(obj,"test",{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});
//对象新添加的属性的特性描述
Object.defineProperty(obj,"newKey",{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});
```

查看设置：

```text
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

ES5有三个操作会忽略enumerable为false的属性。

1. for...in循环：只遍历对象自身的和继承的可枚举的属性
2. Object.keys()：返回对象自身的所有可枚举的属性的键名
3. JSON.stringify()：只串行化对象自身的可枚举的属性

ES6新增了一个操作Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

```text
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。

**存取描述符**

当使用存取器描述属性的特性的时候，允许设置以下特性属性：

```text
var obj = {};
Object.defineProperty(obj,"newKey",{
    get:function (){} | undefined,
    set:function (value){} | undefined
    configurable: true | false
    enumerable: true | false
});
```

> **当使用了getter或setter方法，不允许使用writable和value这两个属性**。

- getter 是一种获得属性值的方法
- setter是一种设置属性值的方法。

```text
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,"newKey",{
    get:function (){
        //当获取值的时候触发的函数
        return initValue;    
    },
    set:function (value){
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        initValue = value;
    }
});
//获取值
console.log( obj.newKey );  //hello

//设置值
obj.newKey = 'change value';

console.log( obj.newKey ); //change value
```