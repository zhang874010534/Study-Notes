## 常见问题

### TypeScript 'cannot find module... in Vue project

加个index.d.ts文件

```typescript
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
```

## 配置

### 路径别名

首先，因为开发环境是ts，并且还要使用到node中的path模块，所以需要先安装一下node的类型声明文件。

```js
npm i -D @types/node
```

安装完成后，就可以在vue.config.ts中增加如下的配置。

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

