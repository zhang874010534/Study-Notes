// 不是shift键按住的选择才会修改锚点索引 什么都没选中的时候下面也会修改锚点索引if (this.keydownKey !== 'Shift') {
this.anchorIndex = index
this.oldChoosedList = this.choosedList

// 按下键盘
if (this.isKeydown) {
  if (this.keydownKey === 'Control') {
    let index = this.choosedList.findIndex(item => item === id)
    if (index !== -1) {
      this.choosedList.splice(index, 1)
    } else {
      this.choosedList.push(id)
    }
  }
  if (this.keydownKey === 'Shift') {
    if (this.choosedList.length === 0) {
      this.choosedList.push(id)
      this.anchorIndex = index
    } else {
      const shiftList = this.allDataList.slice(Math.min(index, this.anchorIndex), Math.max(index, this.anchorIndex) + 1).map(item => item.id)
      const choosedList = new Set()
      this.oldChoosedList.concat(shiftList).forEach(item => choosedList.add(item))
      this.choosedList = [...choosedList]
    }
  }
} else {
  this.choosedList = []
  this.oldChoosedList = []
  this.choosedList.push(id)
}
