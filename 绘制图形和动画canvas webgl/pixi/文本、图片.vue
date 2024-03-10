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
// 文本
// const text = new PIXI.Text('hello', {
//   fill: '#ff0000'
// })
// app.stage.addChild(text)

// 图片
const texture = PIXI.Texture.from('https://github.githubassets.com/assets/mona-loading-default-static-8f7c56ad1b9a.svg')
// 将纹理放在“精灵“的图形对象上
const sprite = new PIXI.Sprite(texture)
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
