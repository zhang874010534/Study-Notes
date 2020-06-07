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



