<script setup>
import * as THREE from 'three';
// gui
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入tween.js
import TWEEN from '@tweenjs/tween.js'
// 创建一个场景
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshBasicMaterial({
      color: 0x0000ff
    })
)
sphere.position.x = 0
scene.add(sphere)

// 移动小球
const tween = new TWEEN.Tween(sphere.position)
// 设置目标位置
tween.to({
  x: 4
}, 2000).onUpdate(() => {

})
// 设置缓动函数
tween.easing(TWEEN.Easing.Quadratic.InOut)
// 设置循环
// tween.repeat(Infinity)
// 设置来回循环
tween.yoyo(true)
// 开始动画
tween.start()

const tween2 = new TWEEN.Tween(sphere.position)
tween2.to({
  y: -4
}, 2000).onUpdate(() => {

})
tween.chain(tween2)
tween2.chain(tween)
const params = {
  stop () {
    tween.stop()
  }
}
const gui = new GUI()
gui.add(params, 'stop')

function animate () {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  TWEEN.update()
}
animate()
</script>
<template>
</template>

<style scoped>
</style>
