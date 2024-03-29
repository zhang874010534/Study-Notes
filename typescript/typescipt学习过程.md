### 	  typescript的一些优势

##### 在开发过程中，就发现潜在的问题

> 应有 1 个参数，但获得 0 个

```typescript
function demo(data: { x: Number }) {
  return data.x;
}
demo();//这个会报错
```

##### 更好的编辑器代码提示

```typescript
function demo(data: { x: Number }) {
  return data.x;//这个x会自动提示  因为传入的参数肯定有
}
demo({ x: 1});
```

##### 语义化更强,看形参就大概知道传入的是什么

### 环境搭建

1. npm i typescript -g
2. tsc xxx.ts      //tsc  typescript compile的缩写  将ts转化成js
3. npm i ts-node -g  
4. ts-node xxx.ts //可以直接编译并运行
5. yarn add parcel@next --dev  //parcel ./src/index.html 直接运行html，html里可以直接引入ts文件

- tsc --init    //ts配置文件
- tsc -w 监听模式(watch)下运行tsc 类似于热更新
- nodemon app.js //自动用node执行app.js
  - 所以可以tsc -w监听ts文件变化 自动生成js文件,nodemon监听js文件变化自动运行
- concurrently npm:dev:*       ===   npm run dev:build   + npm run dev:start

### 类型注解和类型推断

> type annotation and type inference

```typescript
let data=123 //ts知道是number类型 自动推断
function demo(data:number):number{ //这里无法判断所以要自己注解 最好再规定一下返回值的类型
  //return data+'' 这会报错
  return data
}
let a=demo(data) 因为注解了所以ts能推断出return的是一个number类型的数据
```

### 函数相关类型

```typescript
function demo(): void {//没有返回值
  console.log('hello');
}
```

```typescript
function demo():never{//函数永远不会执行完
  throw new Error()
  console.log('hello')
}
```

```typescript
  return first;
}
demo({ first: 1 });

```

```typescript
let a: number | string = 123;//或者
a = '123'
```

```typescript
// 定义函数类型
interface SayHi {
  (word: string): string;
}

let say: SayHi = (word) => {
  return word
};

interface Say {
    name: string
}
const say = ({name}:Say):void => {
    
};
//对象里的函数
interface Person {
  say(word:string): string; //一个方法 需要返回string类型
}
let person: Person = {
  say(word) {
    return word;
  }
};
interface Animal {
  say: (word: string) => string;
}
let animal:Animal={
  say(word){
    return word
  }
}

```



### 数组和元组

```typescript
// 数组
let arr: (number | string)[] = [1, '2', 3];
let stringArr: string[] = ['1', '2'];
let undefinedArr: undefined[] = [undefined, undefined];

//type alias 类型别名
type Person=string //还可以这么写 而interface就不行
type User = {
  name: string;
  age: number;
};
class Teacher {
  name: string;
  age: number;
}

let objectArr: Teacher[] = [
  {
    name: 'dd',
    age: 22
  }
];

// 元组 tuple 一个数组长度固定，数组中的每一项类型固定，就可以用元组来约束
let teacherInfo:[string,string,number]=['dd','male',22]
// 比如读取一个excel文件的数据
let teacherList:[string,string,number][]=[
  ['dd','male',22],
  ['dd','male',22],
  ['dd','male',22]
]

```

### interface接口

```typescript
// 1.定义对象
interface Person {
  // readonly name: string;//只读
  name: string;
  age?: number; //可有可无
  [propName: string]: any; //加了这个下面多一个sex也没关系了 键名是string 类型是any
  say(): string; //一个方法 需要返回string类型
}
// 继承
interface Teacher extends Person {
  teach(): string;
}
const getPersonName = (person: Person) => {
  return person.name
};
const setPersonName = (person: Person, name: string): void => {
  person.name = name;
};
getPersonName({
  name: 'dd',
  sex: 'male',
  say() {
    return 'hello';
  }
});
// 应用
class User implements Person {
  name = 'dd';
  say() {
    return 'hello';
  }
}

// 2.定义函数类型 函数重载SayHi可以传string类型也可以传number类型 在写.d.ts文件(类型定义文件)的时候可以使用
// 一个参数
interface SayHi {
  (word: string): string,
  (name: number): number
}

let say: SayHi = (word) => {
  return word;
};
// 多个参数
interface SayHi {
  (a: string,b:number): string,
}

let say: SayHi = (a,b) => {
  return a + b;
};
say('str',123)
```



```typescript
// interface简化ts代码
interface Person {
  name: string;
  age: number;
}
interface Teacher extends Person {
  teachAge: number;
}
interface Student extends Person {
  learnAge: number;
}

let teacher = {
  name: 'dd',
  age: 30,
  teachAge:2
};
let student = {
  name: 'gg',
  age: 22,
  learnAge:2
};

let getUserName = (user: Person) => {//简化的部分在这里
  console.log(user.name);
};
getUserName(teacher);
getUserName(student);
```

### type

```typescript
type Name = string; // 基本类型
type NameFun = (x: number) => string; // 
type NameOrRFun = Name | NameFun; // 联合类型
type direction = 'up' | 'down'
let to:direction = 'up'
type User = {
  name: string
  age: number
};
```

### 类的定义和继承

```typescript
class Person {
  name='dd';
  getName() {
    return this.name;
  }
}

class Teacher extends Person{
  getName(){
    return super.getName()+'lee'//重写了父类方法，通过super可以再次调用父类的方法
  }
}
let t=new Teacher()
console.log(t.getName())

```

### 类中的访问类型和构造器

```typescript
//public 默认的 类内外
//private 内
//protected 内、继承
class Person {
  // private name:string
  // public name:string
  protected name: string;
}
class Teacher extends Person {
  sayHi() {
    this.name;
  }
}
let person = new Person();
// console.log(person.name='dd')

class Animal {
  // private name: string;
  constructor(public name: string) {
    // this.name = name;
  }
}
class Dog extends Animal{
  constructor(public age:number){
    super('dd')
  }
}
let dog = new Dog(22);
console.log(dog);//Dog { name: 'dd', age: 22 }

```

### 类的静态属性getter、setter

```typescript
// 保护私有属性一般用_来表示 然后通过get来处理后返回
class Person {
  constructor(private _name: string) {}
  // 获取
  get name() {
    return this._name + 'qq';
  }
  // 设置
  set name(name: string) {
    this._name = name;
  }
}
let person = new Person('dd');
person.name = 'teer';
console.log(person.name);
```

### js设计模式 单例模式

```typescript
class Demo {
  private static instance: Demo;
  constructor(public name: string) {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('dd');
    }
    return this.instance;
  }
}

let demo1 = Demo.getInstance();
let demo2 = Demo.getInstance();
console.log(demo1 === demo2); //true
```

### [抽象类](https://www.tslang.cn/docs/handbook/classes.html)

```typescript
// 抽象类做为其它派生类的基类使用
abstract class Animal {
  constructor(public name: string) {}
  abstract sayHi(): string;//抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  sayHi() {//在子类中必须有sayHi 因为抽象父类定义了抽象方法
    return 'hello';
  }
}

let dog = new Dog('dd');
console.log(dog.sayHi());//hello
```

### [tsconfig.json配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

```typescript
{
    "exclude": ["./demo2.ts"],//除了这个文件都编译
    "compilerOptions":{
        "allowJs": true,/* 允许编译js文件,Allow javascript files to be compiled. */
        "checkJs": true,//允许在写js文件的时候有代码检测
        "sourceMap": true, //生产.map文件
        "outDir": "./build",//编译输出目录
        "removeComments": true,/* Do not emit comments to output. */
        "noImplicitAny": true,//不能有隐式的any
        "strictNullChecks": true,//null校验，就是不能将null赋值给其他类型
            
         /* Additional Checks */
        "noUnusedLocals": true, //变量声明但是没使用，会警告
        "noUnusedParameters": true, //未使用参数警告
            
        /* Experimental Options */
        "experimentalDecorators": true,/* Enables experimental support for ES7 decorators. */
        "emitDecoratorMetadata": true,/* Enables experimental support for emitting typemetadata for decorators. */
    }
}
```

### [交叉类型(Intersection Types)](https://www.tslang.cn/docs/handbook/advanced-types.html)  [英文文档](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

#### interface

```typescript
interface Radio {
  switchRadio(trigger:boolean):void
}
interface Batter {
  check():void

class Car implements Radio{
  switchRadio(trigger:boolean){

  }
}
class Cellphone implements Radio,Batter{
  switchRadio(trigger:boolean):void{
    
  }
  check(){
    
  }
}
```

#### &


```typescript
TypeScript 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker;

const staff: IStaff = {
  id: 'E1006',
  age: 33,
  companyId: 'EFT'
};
在上面示例中，我们首先为 IPerson 和 IWorker 类型定义了不同的成员，然后通过 `&` 运算符定义了 IStaff  交叉类型，所以该类型同时拥有 IPerson 和 IWorker 这两种类型的成员。
```

```tsx
class HeaderComponent extends React.Component<PropsType & WithTranslation, IState> {}
```

#### type

### [联合类型(Union Types)和类型保护(Type Guards)](https://www.tslang.cn/docs/handbook/advanced-types.html)

> 联合类型    值可以为不同类型的情况

##### type 联合类型

```typescript
type Name = string; // 基本类型
type NameFun = () => string; // 
type NameOrRFun = Name | NameFun; // 联合类型
```

##### 类型断言 类型保护

```typescript
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    (<Bird>animal).birdSay();
  } else {
    (animal as Dog).dogSay();
  }
}
```

##### in的类型保护

```typescript
function trainAnimal2(animal: Bird | Dog) {
  if ('birdSay' in animal) {
    console.log(animal.birdSay());
  } else {
    animal.dogSay();
  }
}
```

##### typeof 类型保护

```typescript
function concat(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`;
  }
  return first + second;
}
```

##### instanceof 类型保护

```typescript
class NumberObj {
  constructor(public count:number){
  }
}
function add(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

### [Enum 枚举类型](https://www.tslang.cn/docs/handbook/enums.html)

```typescript
enum Status {
  online=1,
  offline=2,
  delete=3
}
console.log(Status)//{  '1': 'online',  '2': 'offline',  '3': 'delete',  online: 1,  offline: 2,  delete: 3}
// let Status={
//   online:0,
//   offline:1,
//   delete:2
// }

function getResult(status: number) {
  if (status === Status.online) {
    return 'on';
  } else if (status === Status.offline) {
    return 'off';
  } else if (status === Status.delete) {
    return 'delete';
  }
}
console.log(getResult(1))
```

### [泛型](https://www.tslang.cn/docs/handbook/generics.html)

> 在用的时候再指定具体的类型

##### 函数中

```typescript
//generic 泛型
// 我希望传string的时候另外一个也要得是string
function join<T>(first: T, second: T) {
  return `${first}${second}`;
}
join<string>('1', '1');

//还可以这样子
function join2<T,P>(first: T, second: P) {
  return `${first}${second}`;
}
join2<number,string>(1, '1');

function join3<T>(first: T[]) {
  return first;
}
// 上下这俩是一样的
//Array是内置的interface
function join4<T>(first: Array<T>) {
  return first;
}
join3<string>(['1']);

// 约束泛型 
interface Length {
  length: number
}

function echo<T extends Length>(params:T):T{
  return params
}
echo({length:1})
echo([1,2])
echo('str')
```

##### 类中 

```typescript
interface Item {
  name: string;
}
class DataManager<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name;
  }
}
let data = new DataManager([
  {
    name: 'dd'
  }
]);
console.log(data.getItem(0));

//如果想要约束传入的泛型范围可以
class DataManager2<T extends string|number>{
  constructor(private data: T[]) {}
  getItem(index: number):T {
    return this.data[index];
  }
}
```

##### interface中

```typescript
interface Animal<T,U> {
  name:T;
  age:U;
} 
let dog:Animal<string,number> = {
  name:'1234',
  age:1234
}
```



##### [索引类型查询操作符](https://www.tslang.cn/docs/handbook/advanced-types.html)

> 首先是 `keyof T`， **索引类型查询操作符**。 对于任何类型 `T`， `keyof T`的结果为 `T`上已知的公共属性名的联合

```typescript
interface Person {
  name: string;
  age: number;
}
// 类似于type T='name' 那么key就是'name'  Person['name']就是string
class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}
let teacher = new Teacher({
  name: 'dd',
  age: 20
});

console.log(teacher.getInfo('name'));
```



### [命名空间](https://www.tslang.cn/docs/handbook/namespaces.html)

> 随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。
>
> 命名空间是位于全局命名空间下的一个普通的带有名字的JavaScript对象。 这令命名空间十分容易使用。 它们可以在多文件中同时使用，并通过 `--outFile`结合在一起。 命名空间是帮你组织Web应用不错的方式，你可以把所有依赖都放在HTML页面的 `<script>`标签里。

```typescript
namespace Components{
  export class Header{
    constructor(){
      let div=document.createElement('div')
      div.innerHTML='Header'
      document.body.appendChild(div)
    }
  }
}
/// <reference path="components.ts" />
namespace Home{
  //暴露出来 编译出的js里会多一句 Home.Page=Page
  export class Page{
    constructor(){
      new Components.Header()
    }
  }
}

//然后再页面里调用 new Home.Page()
```

### 描述文件.d.ts编写

```typescript
// 定义全局变量
// declare var $: (param: () => void) => void;
// 定义全局函数
declare function $(params: () => void): void {
};
declare function $(params: string): { html: (html: string) => {} };

// 既要是对象又要是函数，就得这个样子
declare namespace ${
  namespace fn{
    function init(){
      
    }
  }
  // 不加export也可以在外面被.出来
  interface CourseItem {
      title: string;
  }
}

// 使用interface来实现函数重载
interface html{
  html(param: string):html
}
interface jQuery {
  (params: () => void): void;
  (selector:string):html
}

```

##### [模块](https://www.tslang.cn/docs/handbook/modules.html)

> 像命名空间一样，模块可以包含代码和声明。 不同的是模块可以 *声明*它的依赖。
>
> /// <reference path="myModules.d.ts" />

```typescript
/// <reference path="myModules.d.ts" />
declare module 'jquery' {
  function $(params: () => void): void {}
  function $(params: string): { html: (html: string) => {} };

  // 既要是对象又要是函数，就得这个样子
  namespace $ {
    namespace fn {
      function init() {}
    }
  }
  //export default $ //页面搜'默认导出'
  export = $; //TypeScript提供了export =语法  定义一个模块的导出对象
}
```

##### 常用.d.ts

````tsx
declare module "*.css" {
  const css : {[key:string]:string}
  export default css
}
````



### [装饰器](https://www.tslang.cn/docs/handbook/decorators.html)

##### 类装饰器

```typescript
// 类的装饰器
// 装饰器本身是一个函数
// 类装饰器接受的参数是一个构造函数
// 装饰器用@符号来使用

// 这个不规范!!!!! 帮助理解
function decorator(flag: boolean) {
  if (flag === true) {
    return function (constructor: any) {
      //接受的参数是这个构造函数
      constructor.prototype.getName = () => {
        console.log('dd');
      };
      console.log(1);
    };
  } else {
    return function (constructor: any) {};
  }
}

@decorator(true)
class Test {}

let test = new Test();
(test as any).getName();
```

```typescript
// 类装饰器工厂
function decorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = 'teer';
      getName() {
        return this.name;
      }
    };
  };
}
// 这返回的就已经是装饰过的类，所以后面代码可以提示
let Test = decorator()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

let test = new Test('dd');
console.log(test.getName()); //这样子就有代码提示了
```

##### 方法装饰器

[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 可以参考一下这个2个很像

```typescript
// target 对于实例成员是类的原型对象,对于静态成员来说是类的构造函数，
// descriptor类似于原生方法Object.defineProperty里的descriptor
function getNameDecorator(target: any,key:string,descriptor:PropertyDescriptor) {
  
}
class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 不加static target就是指向prototype 加了就是指向构造函数
  @getNameDecorator
  static getName() {
    return '123'
  }
}
```

###### 方法装饰器实战

> 把重复的try catch去掉，全部整合到装饰器里

```typescript
let userInfo: any = undefined;
function catchError(msg: string) {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    let fn = descriptor.value;
    // 不能用target[key]来修改 虽然看起来也是原型上的方法，我怀疑这是个假的原型
    descriptor.value = function () {
      try {
        fn();
      } catch (error) {
        console.log(msg);
      }
    };
  };
}
class Test {
  @catchError('name错误')
  getName() {
    return userInfo.name;
  }
  @catchError('age错误')
  getAge() {
    return userInfo.age;
  }
}
let test = new Test();
test.getName();// name错误
test.getAge();// age错误
```



##### 访问器装饰器

```typescript
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // 在这边进行装饰
}
class Test {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}
let test = new Test('dd');
test.name = 'qq';
console.log(test.name);

```

##### 属性装饰器

```typescript
function propertyDecorator(target:any,key:string):any{
  // 他是没有属性描述符的
  // 创建一个descriptor并返回，会去替换原来的descriptor，从而实现修改
  let descriptor:PropertyDescriptor={
    writable:false
  }
  return descriptor
}
class Test{
  @propertyDecorator
  name:string='dd'
}
let test=new Test()
console.log(test.name)
```

```typescript
function propertyDecorator(target:any,key:string):any{
  target[key]='gg'// 这里修改的是prototype原型上的属性，所以和实例化对象这个操作没关系
}
class Test{
  @propertyDecorator
  name='dd' //他是在constructor上的，所以只是为了实例化对象
}
let test=new Test()

console.log(Test.prototype)
console.log((test as any).__proto__.name)// 'gg'
```

##### 参数装饰器

```typescript
/**
 * 
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param key 成员的名字。
 * @param paramIndex 参数在函数参数列表中的索引。
 */
function propertyDecorator(target:any,key:string,paramIndex:number):any{
  console.log(target,paramIndex)
}
class Test{
  getInfo(@ name:string){

  }
}
let test=new Test()
```

### [Utility Types(内置的工具type)](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) 

```typescript
interface IPerson {
  name:string,
  age:number
}
let person:IPerson = {name:'abao',age:1234}
type IPartial = Partial<IPerson>// 全体可有可无
let person2:IPartial = { name:'abao'}
type IOmit = Omit<IPerson,'name'>;//忽略
let person3:IOmit = { age:124}
```

#### ReturnType

> 获取函数返回值的类型

```tsx
import { createStore } from "redux";
import languageReducer from "./language/languageReducer";

const store = createStore(languageReducer);

export type RootState = ReturnType<typeof store.getState>

```

#### Parameters

> 获取函数参数的类型

#### ConstructorParameters

>  获取构造函数的参数类型
