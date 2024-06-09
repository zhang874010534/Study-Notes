<script setup>
import * as THREE from 'three';
// 创建一个场景
const scene = new THREE.Scene()

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(0, 0, 20)

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 添加一个立方体
// 定义了一个立方体的对象
const geometry = new THREE.PlaneGeometry(10, 10, 2, 2)

// 纹理加载器
const textureLoader = new THREE.TextureLoader()
textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', (texture) => {
  // mesh.material.map = texture
  // mesh.material.needsUpdate = true
  // 创建材质
  const material  = new THREE.MeshLambertMaterial({
    wireframe: true,
    map: texture
  })

  const mesh = new THREE.Mesh(geometry, material )

  // 添加到场景里
  scene.add(mesh)

})



// 添加灯光
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-10, 10, 10)
scene.add(spotLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
scene.add(ambientLight);

const animation = () => {
  // 渲染
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}
animation()
</script>

<template>
</template>

<style scoped>
</style>
