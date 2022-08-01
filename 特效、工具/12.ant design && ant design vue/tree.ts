interface ITreeKeyHandle {
  key?: string
  title?: string
  childrenName?: string
  treeData: any[]
  myLevel?: number
  extraHandleFn?: (row: any) => any
}

/**
 * 转换字段
 * @param key key值
 * @param title 显示的名字
 * @param childrenName children字段
 * @param treeData 树数据
 * @param myLevel 层级
 * @param extraHandleFn 额外处理函数
 */
export function treeKeyHandle({ key, title, childrenName, treeData, myLevel = 0, extraHandleFn }: ITreeKeyHandle) {
  key = key || 'key'
  title = title || 'title'
  childrenName = childrenName || 'children'
  return treeData.map(item => {
    item['key'] = item[key]
    item['title'] = item[title]
    item['children'] = item[childrenName] || []
    item['myLevel'] = myLevel
    if (extraHandleFn) {
      item = extraHandleFn(item)
    }
    if (item['children'].length > 0) {
      item['children'] = treeKeyHandle({
        key,
        title,
        childrenName,
        treeData: item['children'],
        myLevel: myLevel + 1,
        extraHandleFn,
      })
    }
    return item
  })
}

interface ISetTreeData {
  key: any
  targetKey: string
  targetValue: any
  data: any
}

export function setTreeData({ key, targetKey, targetValue, data }: ISetTreeData) {
  data.some(item => {
    if (item.key === key) {
      item[targetKey] = targetValue
      return true
    }
    if (item.children && item.children.length > 0) {
      setTreeData({
        key,
        targetKey,
        targetValue,
        data: item.children,
      })
    }
  })
}

/**
 * 对比数组 判断增加和减少的数据
 * @param {Array} oldArr 老数组
 * @param {Array} newArr 新数组
 * @param {String} key 索引
 * @return {
 *   {Array} addArr 增加的数组
 *   {Array} deleteArr 删除的数组
 * }
 * @constructor
 */
export function ArrayCompare(oldArr: any[], newArr: any[], key = 'value') {
  const deleteArr = []
  oldArr.forEach(oldItem => {
    const flag = newArr.some((newItem, newIndex) => {
      if (newItem[key] === oldItem[key]) {
        newArr.splice(newIndex, 1)
        return true
      }
    })
    if (!flag) {
      deleteArr.push(oldItem)
    }
  })
  const addArr = newArr
  return {
    addArr,
    deleteArr,
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

function recurrenceGetLeafDeep(node, childName, length) {
  const children = node[childName]
  if (children.length > 0) {
    const item = recurrenceGetLeafDeep(children[0], childName, ++length)
    return {
      length: item.length,
      target: item.target,
    }
  } else {
    return {
      length: ++length,
      target: node,
    }
  }
}
/**
 * 获取第一个叶子
 * @param node 节点
 * @param childName children的名字
 */
export function getLeafDeep(node, childName = 'children') {
  const currentTarget = node[0]
  const children = currentTarget[childName]
  let length = 0
  let target = currentTarget
  if (children.length > 0) {
    const item = recurrenceGetLeafDeep(children[0], childName, length)
    length = item.length
    target = item.target
  }
  return {
    length,
    target,
  }
}
