### Vue3学习过程中遇到的问题

#### props  required:true

```js
如果直接传内部会进行ts的类型判断
https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiDefineComponent.ts
the Readonly constraint allows TS to treat the type of { required: true }
as constant instead of boolean.

但是提出来后,没法判断,所以要手动的告诉ts这个就是readonly
const Props = {
  msg: {
    type: String,
    required: true
  },
} as const

export default defineComponent({
  name: "HelloWorld",
  props: Props,
  mounted() {
    // 这里如果不加as const required:true 会无效 提示 string || undefined
    this.msg
  },
});
```

#### package.json

```js
{
    "devDependencies": {
        @vue/babel-plugin-jsx: '^1.1.1'
    }
}
```



#### .prettierrc

```js
{
  "semi": false,
  "singleQuote": true
}
```

#### tsconfig.json

```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest",
      "node"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

### JSX

[Vue3+tsx开发语法详解](https://mp.weixin.qq.com/s/KIsLl5aPI9WbZ222RRJZjA)
