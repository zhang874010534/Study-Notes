interface ITreeKeyHandle {
  key?: string
  title?: string
  childrenName?: string
  treeData: any[],
  myLevel?: number
}

/**
 * 转换字段
 * @param key key值
 * @param title 显示的名字
 * @param childrenName children字段
 * @param treeData 树数据
 * @param myLevel 层级
 */
export function treeKeyHandle({ key, title, childrenName, treeData, myLevel = 0 }: ITreeKeyHandle) {
  key = key || 'key'
  title = title || 'title'
  childrenName = childrenName || 'children'
  return treeData.map(item => {
    item['key'] = item[key]
    item['title'] = item[title]
    item['children'] = item[childrenName] || []
    item['myLevel'] = myLevel
    if (item['children'].length > 0) {
      item['children'] = treeKeyHandle({
        key,
        title,
        childrenName,
        treeData: item['children'],
        myLevel: myLevel + 1
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


// 获取节点
export function getNode(id, data: any[]) {
  let node
  data.some(item => {
    if(item.id === id){
      node = item
      return true
    }
    if(item.children.length > 0) {
      node = getNode(id, item.children)
    }
  })
  return node
}

/**
 * 获取所有子节点
 * @param nodeList 节点列表
 * @param childName children的名字
 */
export function getAllChildrenNode(nodeList, childName = 'children') {
  let nodeArr = []
  nodeList.forEach(item => {
    if(item[childName].length > 0) {
      nodeArr = nodeArr.concat(getAllChildrenNode(item[childName], childName))
    }
    nodeArr.push(item)
  })
  return nodeArr
}
