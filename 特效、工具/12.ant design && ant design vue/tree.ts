// 拖拽
const onDrop = (info: AntTreeNodeDropEvent) => {
  if (Reflect.has(info, 'dropPosition')) {
    // const dropPos = info.node.pos.split('-'); //拖拽落下的位置 最外层到最里层
    const drapPos = info.dragNode.pos.split('-') //拖拽落下的位置 最外层到最里层
    // 不是第一级 同级拖动
    if (info.dropToGap && info.node.parentId === info.dragNode.parentId) {
      getSiblingNodes(drapPos, info.dropPosition)
    } else if (!info.dropToGap && info.node.key === info.dragNode.parentId) {
      // 是第一级 且是父级下面
      getSiblingNodes(drapPos, 0)
    }
  }
}
const getSiblingNodes = (drapPos, targetIndex) => {
  const currentIndex = drapPos[drapPos.length - 1]
  const targetList = drapPos.slice(1, drapPos.length - 1)
  let list = orderTypeTreeData.value
  targetList.forEach(item => {
    list = list[item].children
  })
  // 移动位子
  const target = list.splice(currentIndex, 1)[0]
  list.splice(targetIndex, 0, target)
  const sortList = list.map((item, index) => {
    return {
      categoryId: item.key,
      sort: index,
    }
  })
  Axios({
    url: categorySort,
    method: 'post',
    data: {
      orgId: loginStore.userInfo.tenantId,
      sortList: sortList,
    },
  }).finally(() => {
    getTreeData()
  })
}
