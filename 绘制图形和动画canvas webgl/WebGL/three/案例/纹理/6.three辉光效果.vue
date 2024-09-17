<script setup>
import * as THREE from 'three'
// 轨道控件
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js'
import {OutlinePass} from 'three/addons/postprocessing/OutlinePass.js'

const clock = new THREE.Clock()
// 创建一个场景
const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(100, 100, 0)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 轨道
const controls = new OrbitControls(camera, renderer.domElement)

// 环境光
const ambientLight = new THREE.AmbientLight(0x000000, 3) // 创建环境光
scene.add(ambientLight) // 将环境光添加到场景

const spotLight = new THREE.SpotLight(0xffffff, 5) // 创建聚光灯
spotLight.position.set(200, 200, 200)
spotLight.castShadow = true
scene.add(spotLight)

const g1 = new THREE.BoxGeometry(18, 18, 18)
const g2 = new THREE.BoxGeometry(18, 18, 18)
const m1 = new THREE.MeshBasicMaterial({
  color: 0x00ff00
})
const m2 = new THREE.MeshBasicMaterial({
  color: 0xff0000
})

const c1 = new THREE.Mesh(g1, m1)
const c2 = new THREE.Mesh(g2, m2)
c1.position.y = 20
scene.add(c1)
scene.add(c2)

// 辉光
// 创建一个渲染通道,渲染到场景,不会渲染到屏幕
const renderScene = new RenderPass(scene, camera)
// 渲染场景中选定的对象的轮廓或边缘
// 分辨率、场景、相机、物体
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, [c2])
outlinePass.renderToScreen = true
outlinePass.edgeStrength = 3 // 尺寸
outlinePass.edgeGlow = 2 // 发光的强度
outlinePass.edgeThickness = 2 // 光晕 厚度
outlinePass.pulsePeriod = 1 // 闪烁的速度
outlinePass.visibleEdgeColor.set('yellow')

// 创建一个组合器对象, 添加处理通道
const bloom = new EffectComposer(renderer)
bloom.setSize(window.innerWidth, window.innerHeight)
bloom.addPass(renderScene)
bloom.addPass(outlinePass)
const animation = () => {
  // 渲染
  renderer.render(scene, camera)
  bloom.render()
  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
