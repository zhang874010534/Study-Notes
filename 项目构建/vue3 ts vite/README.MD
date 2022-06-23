### 1.初始化项目

npm init vue https://vuejs.org/guide/quick-start.html

### 2.增加husky验证

文章中通过使用 `ESLint` 、`Prettier` 、 `StyleLint` 实现了对代码语法和风格的统一

#### Husky

首先先来介绍一下，什么是 `Husky` 。

它可以向我们的项目中添加 `Git hooks` 。同时配合 `lint-staged` 可以方便的在代码提交前进行你想要的检测。

#### 安装

husky 7 版本和之前版本方式不同

```js
pnpm i husky -D
```

接着在 `package.json` 中添加 `prepare` 脚本

```shell
"prepare": "husky install"
```

`prepare` 脚本会在 `pnpm install` 之后自动执行。也就是说当我们执行 `pnpm install` 安装完项目依赖后会执行 `husky install `命令，该命令会创建 `.husky/` 目录并指定该目录为 `git hooks` 所在的目录。

当然，首次创建可以直接执行 `pnpm i` 重新跑下依赖安装，或者也可以执行 `npx husky install` ，这两个方法都可以创建 `.husky` 目录。