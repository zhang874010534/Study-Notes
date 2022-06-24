https://juejin.cn/post/7047682306294677512

# .eslintrc.cjs

## env

env: {
    // 一个环境定义了一组预定义的全局变量。
    browser: true,
    // 会自动开启es6语法支持。
    es6: true,
    node: true,
  },

```
module.exports = {
  /**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */
  root: true,
  // 指定解析器
  // babel-ESLint: 一个对Babel解析器的包装，使其能够与ESLint兼容。
  // parser: 'babel-eslint',
  // 设置解析器能帮助ESLint确定什么是解析错误。
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint",
    // 指定js版本。语法上的支持
    ecmaVersion: 6,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  // 脚本在执行期间访问的额外的全局变量
  // globals: {},
  // env: 指定脚本的运行环境
  env: {
    // 一个环境定义了一组预定义的全局变量。
    browser: true,
    // 会自动开启es6语法支持。
    es6: true,
    node: true,
  },
  // 使用第三方插件。全局安装的 ESLint 实例只能使用全局安装的ESLint插件。本地同理，不支持混用。
  plugins: ["html", "vue"],
  // 配置文件从基础配置中继承已启用的规则。
  /**
   * eslint:recommended  启用核心规则，在规则页面中被标记为 √ 的。
   */
  extends: [
    // plugin:(此处不能有空格)包名/配置名称。解析时plugin是解析成 eslint-plugin-vue。如果有空格会解析失败，eslint-plugin- vue。
    // plugin可以省略包名的前缀 eslint-plugin-
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier', // 以处理prettier和eslint的冲突。
  ],

  /**
   * 每个规则有【3】个错误级别。
   * off或0: 关闭该规则；
   * warn或1: 开启规则，使用警告级别的错误，不会导致程序退出；
   * error或2: 开启规则，使用错误级别的错误，当被触发的时候，程序会退出。
   */
  rules: {
    /**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关。
     */
    // 强制"for"循环中更新子句的计算器朝着正确的方向移动
    "for-direction": 2,
    // 禁止function定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对象字面量中出现重复的key
    "no-dupe-keys": 2,
    // 禁止出现重复的case标签
    "no-duplicate-case": 2,
    // 禁用 console
    "no-console": 1,
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off',
    /* // 还可以写表达式，厉害了~
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off', */
    
    // ......
  },
};
```

如果有需要忽略的文件也可以在 `.eslintignore` 文件中进行配置:



# .prettierrc.js

```js
module.exports = {
  // 让prettier使用eslint的代码格式进行校验
  eslintIntegration: true,
  // 缩进
  tabWidth: 2,
  // 使用tab还是空格
  useTabs: false,
  // 最大长度80个字符
  printWidth: 200,
  // 行末分号
  semi: false,
  // 单引号
  singleQuote: true,
  // JSX双引号
  jsxSingleQuote: false,
  // 尽可能使用尾随逗号（包括函数参数）
  trailingComma: "none",
  // 在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 箭头圆括号
  arrowParens: "avoid",
  // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  // 行尾换行格式
  endOfLine: "auto",
  HTMLWhitespaceSensitivity: "ignore",
};

```





# 1.初始化项目

npm init vue https://vuejs.org/guide/quick-start.html

# 2.增加husky验证

文章中通过使用 `ESLint` 、`Prettier` 、 `StyleLint` 实现了对代码语法和风格的统一

## Husky

首先先来介绍一下，什么是 `Husky` 。

它可以向我们的项目中添加 `Git hooks` 。同时配合 `lint-staged` 可以方便的在代码提交前进行你想要的检测。

## 安装

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

添加git hooks，运行一下命令创建git hooks

```bash
npx husky add .husky/pre-commit "npm run lint"
```

运行完该命令后我们会看到`.husky/`目录下新增了一个名为`pre-commit`的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。`pre-commit`脚本内容如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
```

该脚本的功能就是执行npm run lint这个命令



## 配置

在 `package.json` 中添加运行命令

- 使用 --config 或 -c 标志传递配置文件进行配置

```base
"lint": "lint-staged -c ./.husky/lintstagedrc.js"
```

接着，在 `.husky` 目录下创建 `lintstagedrc.js` 文件，并添加以下代码

```javaScript
module.exports = {
  "{src,server}/**/!(*.min).js": [
    "eslint --fix",
    "prettier --write"
  ],
  "{src,server}/**/*.{ts,vue}": [
    "eslint --fix",
    "prettier --write"
  ],
  "src/**/*.{html,css,scss,sass,stylus}": [
    "prettier --write"
  ]
}

```



# Git commit 验证

为了保证提交信息的可读性及统一性，我们需要对提交信息进行验证，只有符合规范的提交信息，才能提交到远程仓库来。

## 安装

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

- `@commitlint/cli` 是commitlint提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下
- `@commitlint/config-conventional` 是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置

## 配置

执行 `npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

该命令会在 `.husky` 目录下生成一个 `commit-msg` 文件。

```shell
\#!/bin/sh
"$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

## commitlint.config.js

接着在根目录下创建 `commitlint.config.js` 文件，并添加以下代码

```js
/*
 * @Description: commit-msg提交信息格式规范
 * 
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *     - ci: 持续集成修改
 *     - docs: 文档修改
 *     - feat: 新特性、新功能
 *     - fix: 修改bug
 *     - perf: 优化相关，比如提升性能、体验
 *     - refactor: 代码重构
 *     - revert: 回滚到上一个版本
 *     - style: 代码格式修改, 注意不是 css 修改
 *     - test: 测试用例修改
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'build', 'chore', 'revert', 'style', 'test'],
    ],
    'type-empty': [2, 'never'], // <type> 不能为空
    // 'type-case': [2, 'always', 'lower-case'], // <type>格式小写
    'type-case': [0],
    'scope-empty': [0],
    // 'scope-case': [2, 'always', 'lower-case'], // <scope> 格式 小写
    'scope-case': [0],
    'subject-empty': [2, 'never'], // <subject> 不能为空 (默认)
    // 'subject-full-stop': [2, 'never', '.'], // <subject> 以.为结束标志
    'subject-full-stop': [0, 'never'],
    // 'subject-case': [2, 'never', 'lower-case'],
    'subject-case': [0, 'never'],
      // case可选值
      // 'lower-case' 小写 lowercase
      // 'upper-case' 大写 UPPERCASE
      // 'camel-case' 小驼峰 camelCase
      // 'kebab-case' 短横线 kebab-case
      // 'pascal-case' 大驼峰 PascalCase
      // 'sentence-case' 首字母大写 Sentence case
      // 'snake-case' 下划线 snake_case
      // 'start-case' 所有首字母大写 start-case

    'header-max-length': [0, 'always', 72], // header 最长72
    // 'body-leading-blank': [2, 'always'], // body换行
    // 'footer-leading-blank': [1, 'always'], // <footer> 以空行开头
  },
};

```



## commitlint定制提交规范

`commitlint`是什么： 当我们运行 `git commmit -m 'xxx'` 时，用来**检查 `xxx` 是否满足固定格式的工具。**

为什么使用`commitlint`：团队中规范了 commit 规范可以更清晰的查看每一次代码提交记录，还可以根据自定义的规则，自动生成 changeLog 文件。

- 定制提交格式

  代码提交基本格式为：`<type>(scope?): <subject>`

  > type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
  >  scope: 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
  >  Subject: 一句话描述此次提交的主要内容，做到言简意赅

- 常用的type类别

| 类型     | 描述                                                   |
| -------- | ------------------------------------------------------ |
| ci       | 持续集成修改                                           |
| docs     | 文档修改                                               |
| feat     | 新特性、新功能                                         |
| fix      | 修改bug                                                |
| perf     | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
| revert   | 回滚到上一个版本                                       |
| style    | 代码格式修改, 注意不是 css 修改                        |
| test     | 测试用例修改                                           |
| build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
| update   | 普通更新                                               |

使用方式：

```bash
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'fix(account): 修复xxx的bug'
```

rule由name和配置数组组成，如：`'name: [0, 'always', 72]'`，数组中第一位表示level，可选`0,1,2`，0为disable，1为warning，2为error，第二位表示是否应用，可选`always|never`，第三位表示该rule的值。

- 如果commit message的格式不符合上述要求，则会报错，检查不通过

  ```bash
  ✔ Preparing...
  ✔ Running tasks...
  ✔ Applying modifications...
  ✔ Cleaning up...
  ⧗   input: 修改bug
  ✖   subject may not be empty [subject-empty]
  
  ✖   found 1 problems, 0 warnings
  ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
  
  husky - commit-msg hook exited with code 1 (error)
  ```

至此，整套流程工具全部配置完毕，按照下面操作：

- 代码改动（lint-staged中配置的指定目录指定文件的改动才进行格式化）
- 执行`git add .`将改动的内容添加到暂存区
- 执行`git commit -m "feat: 新增xxx功能"`

程序会自动执行 代码检查、代码格式化、然后commit提交。

当然，如果暂时不想commit代码，可以在执行 `git add .` 命令后直接执行 `npm run lint`进行代码检查和格式化，接着继续进行开发。

