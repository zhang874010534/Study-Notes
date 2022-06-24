[参考地址](https://juejin.cn/post/7086634880083165221)

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

## 配置

接着需要添加 `git hooks` ，运行一下命令创建 `git hooks`

```shell
npx husky add .husky/pre-commit "npm run lint:eslint"
npx husky add .husky/pre-commit "npm run lint:format"
npx husky add .husky/pre-commit "npm run lint:style"
```

这样，当我们在执行 `git commit` 的时候，就会先去执行 `npm run lint:eslint` 、 `npm run lint:format` 、`npm run lint:style` 这三个命令了。

这里，就会出现一个问题，就是以上三个命令，是针对所有文件进行处理，这导致了有些没有更改过的文件也会去执行代码格式化，增加了一些不必要的负担，所以，我们需要进行优化，这里采用了 `lint-staged` 来检测暂存区的文件。

# lint-staged

## 安装

首先需要安装 `lint-staged`

```shell
pnpm i lint-staged -D
```

## 配置

在 `package.json` 中添加运行命令

```base
"lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js"
```

更改 `.husky/pre-commit` 文件的脚本

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:lint-staged
```

接着，在 `.husky` 目录下创建 `lintstagedrc.js` 文件，并添加以下代码

```javaScript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write', 'stylelint --fix'],
  '*.{scss,less,styl,css,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.hbs': ['prettier --write']
}
```