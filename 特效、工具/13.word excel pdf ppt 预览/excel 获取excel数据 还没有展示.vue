<template>
  <div>
    <input type="file" @change="changeFile" accept=".xlsx">
    123
  </div>
</template>
<script>
import ExcelJS from 'exceljs'
export default {
  data() {
    return {
    }
  },
  methods: {
    changeFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload =  (e) => {
        this.getExcel(e.target.result)
      }
    },
    getExcel(buffer) {
      new ExcelJS.Workbook().xlsx.load(buffer).then(workbook=>{
        // 获取excel的第一页的数据
        const ws = workbook.getWorksheet(1);
        console.log(ws,"wssss")
        // 获取每一行的数据
        const data = ws.getRows(1, ws.actualRowCount);
        console.log(data, "dataaaaaaaaa")
      })
    }
  }
}
</script>
