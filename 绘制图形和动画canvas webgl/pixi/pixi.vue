<template>
  <div class="wrapper">
    <button @click="destroy">删除画布</button>
    <div id="pixi">
    </div>
  </div>
</template>
<script setup>
import * as PIXI from 'pixi.js'
import '@pixi/graphics-extras';
import {nextTick} from 'vue'
const app = new PIXI.Application({
  width: 300,
  height: 300,
  backgroundColor: 'pink',
  // resizeTo: window
})

// 创建图形类
const graphics = new PIXI.Graphics()
// 设置填充颜色
graphics.beginFill('0xffd900', 1)
// 创建图形
// graphics.drawRect(50, 50, 200, 100)
// 圆角矩形
// graphics.drawRoundedRect(50, 50, 200, 100, 10)
// 倒角矩形
// graphics.drawChamferRect(50, 50, 200, 100, 10)
// 创建倒圆角矩形
// graphics.drawFilletRect(50, 50, 200, 100, -20) // 最后一个参数为负数时，圆角向内凹进去
// 创建椭圆
// graphics.drawEllipse(100, 50, 100, 50) // x, y, width, height
// 路径，两两一组代表一个坐标
const path = [
  30, 30,
  100, 50,
  100, 180,
  30, 200
]
// 创建多边形
graphics.drawPolygon(path)
// 绘制
graphics.endFill()

app.stage.addChild(graphics)


nextTick(() => {
  const dom = document.querySelector('#pixi')
  dom.appendChild(app.view)
})

const destroy = () => {
  app.destroy(true)
}

</script>
<style scoped>
#pixi {
  display: flex;
}
.wrapper {
  height: 100vh;
}
</style>
