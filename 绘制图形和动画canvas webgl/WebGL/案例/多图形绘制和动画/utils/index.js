function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
  // 创建着色器
  const vertex_Shader =  gl.createShader(gl.VERTEX_SHADER)
  const fragment_Shader =  gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vertex_Shader, VERTEX_SHADER_SOURCE)// 指定顶点着色器的源码
  gl.shaderSource(fragment_Shader, FRAGMENT_SHADER_SOURCE)// 指定片元着色器的源码

  // 编译着色器
  gl.compileShader(vertex_Shader)
  gl.compileShader(fragment_Shader)

  // 创建一个程序对象
  const program = gl.createProgram()

  gl.attachShader(program, vertex_Shader)
  gl.attachShader(program, fragment_Shader)

  gl.linkProgram(program)

  gl.useProgram(program)

  return program
}

// 平移矩阵
function getTranslateMatrix(x = 0, y = 0, z = 0) {
  return new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, z, 1,
  ])
}

// 缩放矩阵
function getRotateMatrix(deg) {
  return new Float32Array([
    Math.cos(deg), Math.sin(deg), 0.0, 0.0,
    -Math.sin(deg), Math.cos(deg), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ])
}

// 旋转矩阵
function getScaleMatrix(x = 1, y = 1, z = 1) {
  return new Float32Array([
    x, 0.0, 0.0, 0.0,
    0.0, y, 0.0, 0.0,
    0.0, 0.0, z, 0.0,
    0.0, 0.0, 0.0, 1,
  ])
}

// 矩阵复合函数
function mixMatrix(A, B) {
  const result = new Float32Array(16)
  for (let i = 0; i < 4; i++) {
    result[i] = A[i] * B[0] + A[i+4] * B[1] + A[i + 8] * B[2] + A[i + 12] * B[3]
    result[i + 4] = A[i] * B[4] + A[i+4] * B[5] + A[i + 8] * B[6] + A[i + 12] * B[7]
    result[i + 8] = A[i] * B[8] + A[i+4] * B[9] + A[i + 8] * B[10] + A[i + 12] * B[11]
    result[i + 12] = A[i] * B[12] + A[i+4] * B[13] + A[i + 8] * B[14] + A[i + 12] * B[15]
  }

  return result
}
