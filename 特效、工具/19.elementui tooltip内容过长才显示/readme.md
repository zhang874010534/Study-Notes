# 1. 介绍

Tooltip常用于展示鼠标 hover 时的提示信息。

而在实际过程中，有这么一个需求：只有文字内容排不下，出现省略号，才需要显示tooltip的提示内容。

本文章的思路是通过一个自定义指令实现如下效果：姓名字段过长时才显示tooltip

![img](https://img2022.cnblogs.com/blog/153475/202203/153475-20220324180045860-517714265.gif)

 

# 2. element-ui(vue2版本)

## 2.1 注册指令

### 1) akTooltipAutoShow.js

**说明**：注册了一个名称为 'ak-tooltip-auto-show' 的指令。会根据内容进行判断是否展示tooltip。

```
import Vue from 'vue';
import { on, off, getStyle } from 'element-ui/src/utils/dom';

/**
 * ak-tooltip-auto-show
 * 当text没有被折叠时，不显示tooltip
 */
Vue.directive('ak-tooltip-auto-show', {
  inserted: function (el, binding, vnode) {
    el.addEventListener('mouseenter', function (e) {
      let defalutSilent = !!Vue.config.silent;
      Vue.config.silent = true;
      vnode.componentInstance.disabled = true;
      const range = document.createRange();
      range.setStart(el, 0);
      range.setEnd(el, el.childNodes.length);
      const rangeWidth = Math.round(range.getBoundingClientRect().width);
      const padding = (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(el, 'paddingRight'), 10) || 0);
      if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
        vnode.componentInstance.disabled = false;
      }
      Vue.config.silent = defalutSilent;
    });
  }
});
```

 

## 2.2 使用

**说明**：使用<el-tooltip v-ak-tooltip-auto-show>包囊展示的内容。

```
<div class="details-inner__row">
    <span class="details-inner__row-name">姓名:</span>
    <el-tooltip placement="top" effect="dark" :content="item.name" v-ak-tooltip-auto-show>
        <span class="details-inner__row-value">{{item.name}}</span>
    </el-tooltip>
</div> 

// css
.details-inner__row-value {
　　width: 80%;
　　display: inline-block;
　　white-space: nowrap;
　　text-overflow: ellipsis;
　　overflow: hidden;
}
```

　　

# 3. element-plus(vue3版本)

## 3.1 注册指令

### 1) akTooltipAutoShow.js

**说明**：注册了一个名称为 'ak-tooltip-auto-show' 的指令。会根据内容进行判断是否展示tooltip。

**注意**：因为element-plus与之前的element-ui不一样，在element-plus(vue3版本)中是 <展示组件>包含<el-tooltip>的，所以代码中需要在<展示组件>内查找<el-tooltop>。

```
import { getStyle } from 'element-plus/lib/utils/dom/index';

/**
 * show-overflow-tooltip for text
 * 当text没有被折叠时，不显示tooltip
 */
const akTooltipAutoShow = {
  created(el, binding, vnode) {
    let tooltipNode = vnode.children.find((childrenCmpt) => childrenCmpt.component?.type.name == 'ElTooltip');
    if (tooltipNode) {
      let { content } = tooltipNode.props;
      if (content && ['添加', '编辑', '删除','查看'].includes(content)) {
        el.addEventListener('click', function (e) {
          let defalutDisabled = tooltipNode.component.props.disabled;
          if (!defalutDisabled) {
            tooltipNode.component.props.disabled = true;
            setTimeout(() => {
              tooltipNode.component.props.disabled = defalutDisabled;
            }, 200);
          }
        });
      } else {
        el.addEventListener('mouseenter', (e) => {
          tooltipNode.component.props.disabled = true;
          const range = document.createRange();
          range.setStart(el, 0);
          range.setEnd(el, el.childNodes.length);
          const rangeWidth = Math.round(range.getBoundingClientRect().width);
          const padding = (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(el, 'paddingRight'), 10) || 0);
          if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
            tooltipNode.component.props.disabled = false;
          }
        });
      }
    }
  }
};

export default akTooltipAutoShow;
```

 

### 2) 进行局部或全局注册

```
// main.js
const app = createApp(App);
import akTooltipAutoShow from './akTooltipAutoShow.js';
app.directive('ak-tooltip-auto-show', akTooltipAutoShow);
```

　　

## 3.2 使用

**说明**：因element-plus(vue3版本)本身不提供 root element，所以需要把此指令放到<el-tooltip>的父级组件。

```
<div class="details-inner__row">
　　<span class="details-inner__row-name">姓名:</span>
　　<span class="details-inner__row-value" v-ak-tooltip-auto-show>
　　　　<el-tooltip placement="top-end" :content="item.name">{{item.name}}</el-tooltip>
　　</span>
</div> 


// css
.details-inner__row-value {
　　width: 80%;
　　display: inline-block;
　　white-space: nowrap;
　　text-overflow: ellipsis;
　　overflow: hidden;
}
```