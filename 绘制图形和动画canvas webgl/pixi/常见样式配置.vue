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
  // backgroundColor: 'pink',
  // resizeTo: window
})
const graphics = new PIXI.Graphics()


/*// 设置填充色
graphics.beginFill('hotpink', 0.8)
// 图形
graphics.drawRect(50, 50, 200, 100)

// 绘制
graphics.endFill()*/

/*// 边框样式
graphics.lineStyle(2, 0xff0000)
graphics.drawRect(50, 50, 200, 100)
app.stage.addChild(graphics)*/

// // 文本样式
// const text = new PIXI.Text('hello', {
//   fontFamily: 'Arial', // 字体
//   fontSize: 36, // 字号
//   stroke: 'red', // 描边颜色
//   strokeThickness: 2, // 描边宽度，默认是0
//   letterSpacing: 20, // 字距
//   dropShadow: true, // 开启投影
//   dropShadowColor: 'red', // 投影颜色
//   dropShadowBlur: 6, // 投影羽化程度（模糊度）
//   dropShadowAngle: 45 * Math.PI / 180, // 投影角度
//   dropShadowDistance: 10, // 投影距离
//   fill: ['yellow', 'red', 'purple', 'blue'], // 填充色
//   fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_HORIZONTAL
// })
// app.stage.addChild(text)


// 纹理
const text = new PIXI.Text(
    'hello world',
    {
      fontSize: 60,
      fontWeight: 900, // 字体重量
      fill: 0xffffff // 必须设置非黑色的填充色
    }
)
// 加载图片
const sprite = PIXI.Sprite.from('https://github.githubassets.com/assets/mona-loading-default-static-8f7c56ad1b9a.svg')

// 设置图片宽高
sprite.width = app.screen.width
sprite.height = app.screen.height

// 配置文字遮罩层
sprite.mask = text
app.stage.addChild(sprite)

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
