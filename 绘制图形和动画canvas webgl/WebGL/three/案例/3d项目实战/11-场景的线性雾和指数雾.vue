<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
scene.add(controls)


// 创建长方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 100)
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})

const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

// 创建场景fog
// scene.fog = new THREE.Fog(0x999999, 0.1, 50)
// 创建场景指数fog
scene.fog = new THREE.FogExp2(0x999999, 0.1)
scene.background = new THREE.Color(0x999999)

function animate () {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
</script>

<template>
</template>

<style scoped>
</style>
