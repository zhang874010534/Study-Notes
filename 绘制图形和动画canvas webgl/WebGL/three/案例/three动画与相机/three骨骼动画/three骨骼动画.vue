<script setup>
import * as THREE from 'three'
// 轨道控件
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const clock = new THREE.Clock()
// 创建一个场景
const scene = new THREE.Scene()
scene.background = new THREE.Color('#FFFFFF')

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
// const controls = new OrbitControls(camera, renderer.domElement)

// 环境光
const ambientLight = new THREE.AmbientLight(0x000000, 3) // 创建环境光
scene.add(ambientLight) // 将环境光添加到场景

const spotLight = new THREE.SpotLight(0xffffff, 5) // 创建聚光灯
spotLight.position.set(200, 200, 200)
spotLight.castShadow = true
scene.add(spotLight)

// 圆柱体
const geometry = new THREE.CylinderGeometry(2, 2, 40, 8, 12)
//
const material = new THREE.MeshPhongMaterial()
// 创建骨骼
const bone = new THREE.Bone()
bone.position.set(0, -20, 0)
const bone2 = new THREE.Bone()
bone2.position.set(0, 10, 0)
bone.add(bone2)
const bone3 = new THREE.Bone()
bone3.position.set(0, 10, 0)
bone2.add(bone3)
const bone4 = new THREE.Bone()
bone4.position.set(0, 10, 0)
bone3.add(bone4)
const bone5 = new THREE.Bone()
bone5.position.set(0, 10, 0)
bone4.add(bone5)

// 创建 SkinnedMesh
const skinnedMesh = new THREE.SkinnedMesh(geometry, material)
// 创建骨架
const skeleton = new THREE.Skeleton([bone, bone2, bone3, bone4, bone5])
skinnedMesh.add(bone)
// 绑定骨架
skinnedMesh.bind(skeleton)
scene.add(skinnedMesh)

// 为几何体添加蒙皮索引和蒙皮权重
const position = geometry.attributes.position
const skinIndices = []
const skinWeights = []
for (let i = 0; i < position.count; i++) {
  const vertex = new THREE.Vector3().fromBufferAttribute(position, i)

  // 根据顶点的位置计算蒙皮权重
  // 1 - -20 / 20   1 - -1  = 2
  // 1 - -10 / 20 = 1 - -0.5 = 1.5
  const y = vertex.y
  const boneIndex = y > 20 ? 1 : 0
  const weight = boneIndex === 0 ? 1 - y / 20 : (y - 20) / 20

  skinIndices.push(boneIndex, boneIndex === 0 ? 1 : 0, 0, 0)
  skinWeights.push(weight, 1 - weight, 0, 0)
}

geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4))
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4))

let step = 0.1
const animation = () => {
  // 渲染
  renderer.render(scene, camera)

  // 添加边界
  if (bone.rotation.x > 0.3 || bone.rotation.x < -0.3) {
    step = -step
  }
  for (let i = 0; i < skinnedMesh.skeleton.bones.length; i++) {
    skinnedMesh.skeleton.bones[i].rotation.x += step * Math.PI / 180
  }
  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
