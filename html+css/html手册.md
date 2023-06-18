## script

### [\<script type="importmap">](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script/type/importmap)

> 用于指定 JavaScript 模块的导入映射关系

```html
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "lodash": "./node_modules/lodash-es/lodash.js"
        }
      }
    </script>
    <script type="module">
      import { map } from 'lodash';
      console.log(map([1, 2, 3], x => x * 2));
    </script>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

