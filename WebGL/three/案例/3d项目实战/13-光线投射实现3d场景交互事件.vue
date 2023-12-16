<script setup>
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
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


// 创建三个球
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
)
sphere1.position.x = -4
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00
    })
)
sphere2.position.x = 4
scene.add(sphere2)

const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshBasicMaterial({
      color: 0x0000ff
    })
)
sphere3.position.x = 0
scene.add(sphere3)

// 创建射线
const raycaster = new THREE.Raycaster()
// 创建鼠标向量
const mouse = new THREE.Vector2()
window.addEventListener('click', (event) => {
  // 获取鼠标点击位置
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
  raycaster.setFromCamera(mouse, camera)

  // 获取raycaster直线和所有模型相交的数组集合
  const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
  console.log(intersects)
  if (intersects.length > 0) {
    const intersectSphere = intersects[0]
    if (intersectSphere.object.isSelect) {
      intersectSphere.object.material.color.set(intersectSphere.object.oldColor)
      intersectSphere.object.isSelect = false
    } else {
      intersectSphere.object.isSelect = true
      intersectSphere.object.oldColor = intersectSphere.object.material.color.clone()
      intersectSphere.object.material.color.set(0xff0000)
    }
  }
})

function animate() {
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
