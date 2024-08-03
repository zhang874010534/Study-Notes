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
camera.position.set(100, 100, 0)
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
controls.maxDistance = 50

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

function getSprite () {
  const canvas = document.createElement('canvas')
  canvas.width = 160
  canvas.height = 160

  const c = canvas.getContext('2d')
  c.fillStyle = 'red'
  c.arc(80, 80, 32, 0, Math.PI * 2, true)
  c.fill()

  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true // 需要通知 Three.js 纹理已经更新
  return texture
}

// 立方体贴图是和环境一致, 球体是跟随当前环境
const cubeMaterial = new THREE.MeshBasicMaterial({
  map: getSprite()
})

const cube = new THREE.Mesh(cubeBoxGeometry, cubeMaterial)
cube.position.x = -5
cube.castShadow = true // 立方体投射阴影
cube.receiveShadow = true // 立方体接收阴影
scene.add(cube)

const animation = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  controls.update(clock.getDelta())
  // 更新立方体相机并渲染到其目标纹理
  cube.visible = false // 隐藏立方体以避免自身渲染到环境贴图中
  cubeCamera.update(renderer, scene)
  cube.visible = true // 恢复立方体的可见性

  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
