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
// uv
const uvTexture = new THREE.TextureLoader().load('/texture/uv_grid_opengl.jpg')

// 创建平面几何体
const planeGeometry = new THREE.PlaneGeometry(2, 2)
console.log(planeGeometry)
// 材质
const planeMaterial = new THREE.MeshBasicMaterial({
  map: uvTexture,
  side: THREE.DoubleSide,
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)

// 创建几何体
const geometry = new THREE.BufferGeometry()
// 使用索引绘制
const vertices = new Float32Array([
  -1.0,-1.0,0.0,
  1.0,-1.0,0.0,
  1.0,1.0,0.0,
  -1.0,1.0,0.0,
])
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])

// 设置索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 创建uv
const uv = new Float32Array([
  0.0,0.0,
  1.0,0.0,
  1.0,1.0,
  0.0,0.0,
])
// 设置uv属性
geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
// 创建材质
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: uvTexture,
})
const plane = new THREE.Mesh(geometry, material)
plane.position.x = 3
scene.add(plane)
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
