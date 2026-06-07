<template>
  <div>
    <el-table class="table-class"></el-table>
  </div>
</template>
<script>
export default {
  mounted () {
    this.initSortable()
    setTimeout(() => {
      this.formState.tableData.push({
        demo2: '44'
      })
      this.tableDataCopy.push({
        demo2: '44'
      })
    }, 5000)
  },
  methods: {
    initSortable () {
      const dragDom = document.querySelector('.table-class tbody')
      const tableDataCopy = JSON.parse(JSON.stringify(this.formState.tableData))
      // eslint-disable-next-line no-new
      new Sortable(dragDom, {
        multiDrag: true, // Enable multi-drag
        selectedClass: 'selected', // The class applied to the selected items
        fallbackTolerance: 3, // So that we can select items on mobile
        animation: 150,
        onEnd: evt => {
          const currRow = tableDataCopy.splice(evt.oldIndex, 1)[0]
          tableDataCopy.splice(evt.newIndex, 0, currRow)
          this.tableDataCopy = tableDataCopy
        }
      })
    },
    save () {
      // 保存
      const dragDom = document.querySelector('.file-wrapper')
      const fileList = []
      for (let i = 0; i < dragDom.children.length; i++) {
        const item = dragDom.children[i]
        fileList.push(this.formState.fileList[item.dataset.index])
      }
    }
  }
}
</script>
