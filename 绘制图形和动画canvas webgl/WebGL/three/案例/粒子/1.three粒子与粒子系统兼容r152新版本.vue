<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js'
// 轨道控件
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const clock = new THREE.Clock()
// 创建一个场景
const scene = new THREE.Scene()
scene.background = new THREE.Color("#FFFFFF")

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(0, 0, 200)
camera.lookAt(new THREE.Vector3(0, 0, 0))


// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true  // 启用阴影映射

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 轨道
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1
controls.maxDistance = 100


// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 3) // 创建环境光
scene.add(ambientLight) // 将环境光添加到场景

const spotLight = new THREE.SpotLight(0xffffff, 5) // 创建聚光灯
spotLight.position.set(200, 200, 200)
spotLight.castShadow = true
scene.add(spotLight)

// 创建一个球体 和一个立方体
const cubeBoxGeometry = new THREE.BoxGeometry(5, 5, 5)

// 通过立方体相机来实现
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
})
const cubeCamera = new THREE.CubeCamera(0.1, 2000, cubeRenderTarget)
scene.add(cubeCamera)

// 创建一个基础粒子
function createNormalSprite () {
  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      const material = new THREE.SpriteMaterial({
        color: Math.random() * 0xffffff,
      })
      const sprite = new THREE.Sprite(material)
      // sprite.scale.set(2, 2, 2)
      sprite.position.set(i * 10 , j * 10, 0)
      scene.add(sprite)
    }
  }
}

// 粒子系统来创建粒子 老版本
// function createSystemSprite () {
//   const geometry = new THREE.Geometry()
//   const material = new THREE.PointsMaterial({
//     size: 4,
//     vertexColors: true,
//     // color: 0xffffff
//   })
//   for (let i = -5; i < 5; i++) {
//     for (let j = -5; j < 5; j++) {
//       geometry.vertices.push(new THREE.Vector3(i * 10, j * 10, 0))
//       geometry.colors.push(new THREE.Color(Math.random() * 0xffffff))
//     }
//   }
//   scene.add(new THREE.PointCloud(geometry, material))
// }

// 粒子系统来创建粒子 新版本
function createSystemSprite() {
  const geometry = new THREE.BufferGeometry()
  // 存储顶点坐标和颜色的数组
  const vertices = []
  const colors = []

  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      // 添加顶点坐标
      vertices.push(i * 10, j * 10, 0)

      // 随机生成颜色并添加
      const color = new THREE.Color(Math.random() * 0xffffff)
      colors.push(color.r, color.g, color.b)
    }
  }
  // 将顶点坐标和颜色数组添加到 BufferGeometry 中
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  // 创建 PointsMaterial，启用顶点颜色
  const material = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true // 启用顶点颜色
  })

  // Three.js r152 版本发布后，PointCloud 类已经被移除
  // 使用 Points 替换 PointCloud
  const pointCloud = new THREE.Points(geometry, material)

  // 将点云添加到场景中
  scene.add(pointCloud)
}
createSystemSprite()
const animation = () => {
  // 轨道
  controls.update(clock.getDelta())
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
