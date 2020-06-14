### typescript的一些优势

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
demo({ x: 1 });
```

##### 语义化更强,看形参就大概知道传入的是什么

### 环境搭建

1. npm i typescript -g
2. tsc xxx.ts      //tsc  typescript compile的缩写  将ts转化成js
3. npm i ts-node -g  
4. ts-node xxx.ts //可以直接编译并运行

- tsc --init    //ts配置文件
- tsc -w 监听模式下运行tsc 类似于热更新
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
function demo({ first }: { first: number }): number {//解构赋值
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
  return word;
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
  return person.name;
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

// 定义函数类型
interface SayHi {
  (word: string): string;
}

let say: SayHi = (word) => {
  return word;
};

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
    }
}
```

