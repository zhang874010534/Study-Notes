<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js'
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

const gui = new GUI()


// 纹理加载器
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./texture/watercover/CityNewYork002_COL_VAR1_1K.png')
// 加载ao贴图
const aoMap = textureLoader.load('./texture/watercover/CityNewYork002_AO_1K.jpg')

const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // map: texture,
  transparent: true,
  aoMap: aoMap, // ao贴图
})
planeMaterial.map = texture
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(plane)

gui.add(planeMaterial, "aoMapIntensity").min(0).max(1).name('ao强度')

function animate () {
  controls.update()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
</script>

<template>
</template>

<style scoped>
</style>
