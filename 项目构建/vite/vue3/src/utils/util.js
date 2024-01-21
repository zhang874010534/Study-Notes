export const setVarStyle = (key,value,dom = document.documentElement) => {
  dom.style.setProperty(key, value)
}

export const debounce = (fn, delay = 500) => {
  let timer = null
  return function (val, ...rest) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, val, rest)
      timer = null
    }, delay)
  }
}

// 分配参数
export const assignParams = (target, source) => {
  for (const targetKey in target) {
    const element = source[targetKey]
    const type = Object.prototype.toString.call(element)
    if (!(type === '[object Null]' || type === '[object Undefined]')) {
      target[targetKey] = element
    }
  }
}
// 判断非空
export const hasValue = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return false
  } else {
    return true
  }
}


function recurrenceGetLeaf(node, childName) {
  let leafList = []
  if (node[childName].length > 0) {
    node[childName].forEach(item => {
      leafList = leafList.concat(recurrenceGetLeaf(item, childName))
    })
  } else {
    return [node]
  }
  return leafList
}

/**
 * 获取所有叶子节点
 * @param node 节点
 * @param childName children的名字
 */
export function getAllLeaf(node, childName = 'children') {
  return recurrenceGetLeaf(node, childName)
}


export const downloadFile = (res) => {
  let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href

  // 获取文件名
  let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]) // 处理文件名乱码问题
  downloadElement.download = fileName // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}

export const origin = location.origin
