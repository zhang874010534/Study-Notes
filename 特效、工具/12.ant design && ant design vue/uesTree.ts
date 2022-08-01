import type { TreeProps } from 'ant-design-vue'
import { ref, watch } from 'vue'

export default function (treeData, fieldNames) {
  const searchValue = ref<string>('')
  const expandedKeys = ref<(string | number)[]>([])
  const selectedKeys = ref<(string | number)[]>([])
  const autoExpandParent = ref<boolean>(false)

  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys
    autoExpandParent.value = false
  }

  const dataList: TreeProps['treeData'] = []
  const generateList = (data: TreeProps['treeData']) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const key = node[fieldNames.key]
      dataList.push({ key, title: node[fieldNames.title] })
      if (node[fieldNames.children]) {
        generateList(node[fieldNames.children])
      }
    }
  }
  generateList(treeData)

  const initTree = data => {
    // 数据接口返回 重新设置
    treeData = data
    generateList(data)
  }
  const getParentKey = (key: string | number, tree: TreeProps['treeData']): string | number | undefined => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node[fieldNames.children]) {
        if (node[fieldNames.children].some(item => item[fieldNames.key] === key)) {
          parentKey = node[fieldNames.key]
        } else if (getParentKey(key, node[fieldNames.children])) {
          parentKey = getParentKey(key, node[fieldNames.children])
        }
      }
    }
    return parentKey
  }
  // watch(expandedKeys, () => {
  //   console.log('expandedKeys', expandedKeys);
  // });
  watch(searchValue, value => {
    expandedKeys.value = dataList
      .map((item: TreeProps['treeData'][number]) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData)
        }
        return null
      })
      .filter((item, index, self) => {
        return item && self.indexOf(item) === index
      })
    searchValue.value = value
    autoExpandParent.value = true
  })

  return {
    autoExpandParent,
    expandedKeys,
    selectedKeys,
    searchValue,
    onExpand,
    initTree,
  }
}
