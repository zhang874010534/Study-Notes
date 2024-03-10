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
import gradientmap_pars_fragmentGlsl from 'three/src/renderers/shaders/ShaderChunk/gradientmap_pars_fragment.glsl.js'
const app = new PIXI.Application({
  width: 300,
  height: 300,
  backgroundColor: 'pink',
  // resizeTo: window
})

// 创建图形类
const graphics = new PIXI.Graphics()
// 设置填充颜色
// graphics.beginFill('0xffd900', 1)
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
// const path = [
//   30, 30,
//   100, 50,
//   100, 180,
//   30, 200
// ]
// 创建多边形
// graphics.drawPolygon(path)
// 正多边形
// graphics.drawRegularPolygon(100, 100, 50, 6, Math.PI / 4)
// 圆角多边形
// graphics.drawRoundedPolygon(100, 100, 50, 6, 10, Math.PI / 4)
// 环形
// graphics.drawTorus(100, 100, 30, 60)
// 星型
// graphics.drawStar(100, 100, 5, 50, 30, Math.PI / 2)
// 创建一个多边形对象
// const path2 = new PIXI.Polygon([
//   10, 10, // 第一个点的坐标
//   50, 100, // 第二个点的坐标
//   100, 10 // 第三个点的坐标
// ])
// graphics.drawShape(path2)

// 设置描边颜色 beginFill(颜色, 不透明度)
// graphics.lineStyle(4, 0xffd900, 1)
// // 创建折线
// graphics.moveTo(10, 40) // 起始点
// graphics.lineTo(40, 20) // 经过的点
// graphics.lineTo(50, 80)
// graphics.lineTo(100, 70)
// // 闭合路径
// graphics.closePath()
// 绘制
// graphics.endFill()


// // 设置线的颜色
// graphics.lineStyle(4, 0xffd900, 1)
// // 圆弧
// graphics.arc(100, 100, 50, Math.PI, 2.3 * Math.PI)

// 圆弧to
// 设置线的颜色
// graphics.lineStyle(4, 0xffd900, 1)
// graphics.moveTo(40, 40) // 先确定起始点
// graphics.arcTo(150, 40, 120, 120, 80)
// graphics.endFill()

// 贝塞尔曲线
graphics.lineStyle(4, 0xffd900, 1)
graphics.moveTo(50, 100)
graphics.quadraticCurveTo(100, 50, 150, 100) // 二次贝塞尔曲线


// 添加到舞台
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
