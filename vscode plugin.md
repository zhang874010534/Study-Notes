### 通用

1. Chinese(Simplified) 中文简体

2. Image preview 导入图片的时候鼠标放上去可以看见图片 来确定路径是否正确

3. Live Server 在浏览器中打开实时更新

4. One Dark pro 主题

5. Setting Sync 自动同步到github

6. vscode-icons 

7. Path Intellisense 路劲自动补全

8. Highlight Matching Tag    高亮对应的 HTML 标签 以及 标识出对应的各种括号。

9. Auto Rename Tag   自动修改匹配的 HTML 标签。

10. Prettier - Code formatter  格式化工具

11. GitLens   **详细的 Git 提交日志**。

12. Regex Previewer   **实时预览正则表达式的效果**。

13. cssrem 将px转化成rem

14. 驼峰翻译助手

15. 别名路径跳转

    ```js
    "alias-skip.mappings": {
        "@": "/src"
    },
    ```

16. any-rule  查正则插件

### Vue

- Vetur Vue tooling for VS Code 可以识别vue文件 格式化vue

  - ```
    "vetur.format.defaultFormatterOptions": {
            "prettier": {
                "semi": false, // 格式化不加分号
                "singleQuote":true // 单引号 
            }
        },
    ```

    

- Volar  Vetur升级版，支持vue3，用于为`.vue`单文件组件提供代码高亮以及语法支持

- Vue 2 Snippets  vue代码片段

### Element UI

- Element UI Snippets   Element UI 代码片段

### React

- Simple React Snippets   react模版

  - | Snippet | Renders                          |
    | ------- | -------------------------------- |
    | `imrc`  | Import React / Component         |
    | `ccc`   | Class Component With Constructor |

### SVG

- SVG   .svg文件代码提示 SVG Language Support

### SASS

- [Live Sass Compiler](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md) Compile Sass or Scss to CSS at realtime with live browser reload

### 微信小程序

1. wechat-snippet 微信小程序代码辅助,代码片段自动完成
2. minapp 
   - 微信小程序标签、属性的智能补全（同时支持原生小程序、mpvue 和 wepy 框架，并提供 snippets）
     需要输入<才会触发标签补全
     输入空格会触发对应标签的属性补全

3. wxapp-helper 选择创建wx组件，自动生成配套的文件，简直不要太爽
