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
4. ts-node xxx.ts 可以直接编译并运行

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
a = '123';

```

```typescript
interface   {
  name:number;
}
let obj: Person = {
  name: 1
};
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

