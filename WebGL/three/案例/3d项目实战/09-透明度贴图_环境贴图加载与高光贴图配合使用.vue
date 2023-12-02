<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js'
// 导入hdr加载器
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js'
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
const aoMap = textureLoader.load('./texture/watercover/CityNewYork002_COL_VAR2_1K.png')
// 透明度贴图 白色表示完全透明
const alphaMap = textureLoader.load('./texture/door/height.jpg')

// 光照贴图
const lightMap = textureLoader.load('./texture/c olors.png')

// 高光贴图 白色反射 黑色不反射
let specularMap = textureLoader.load('./texture/watercover/CityNewYork002_GLOSS_1K.jpg')

// rgbeLoadg
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境贴图
  scene.background = envMap
  scene.environment = envMap
  planeMaterial.envMap = envMap
})

const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // map: texture,
  transparent: true,
  aoMap: aoMap, // ao贴图
  aoMapIntensity: 1, // 默认1
  // alphaMap: alphaMap, // 透明度贴图
  // lightMap: lightMap, // 光照贴图
  // reflectivity: 0.1, // 反射效果
  specularMap: specularMap,
})
planeMaterial.map = texture
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(plane)

gui.add(planeMaterial, "aoMapIntensity").min(0).max(1).name('ao强度')

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
