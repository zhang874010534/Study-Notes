<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
import {TableSheet, BaseTooltip, BaseEvent, ColCell} from '@antv/s2'
import '@antv/s2/dist/style.min.css'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  async mounted () {
    this.getTableData()
    window.addEventListener('resize', this.resizeChange)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeChange)
  },
  methods: {
    initS2 () {
      // 销毁
      if (this.s2) {
        console.log('销毁s2')
        this.s2.destroy()
      }
      // 初始化s2
      const container = document.getElementById('container')
      const s2Data = []
      const columns = []
      const meta = []
      // const conditionTextList = []
      const headObj = {}
      this.fillHeadResList.forEach((item, index) => {
        columns.push('a' + index)
        meta.push({
          field: 'a' + index,
          name: item.headName,
        })
        headObj['a' + index] = item
      })
      // if (this.currIndex === 1) {
      //   columns.push('average')
      //   meta.push({
      //     field: 'average',
      //     name: '平均值',
      //   })
      // }
      // columns.push('count')
      // meta.push({
      //   field: 'count',
      //   name: '合计',
      // })
      this.fillBodyResList.forEach(bodyItem => {
        const obj = {}
        // obj.leaveName = bodyItem.leaveName
        // obj.count = hasValue(bodyItem.count) ? bodyItem.count : ' '
        // obj.average = hasValue(bodyItem.average) ? bodyItem.average : ' '
        this.fillHeadResList.forEach((headItem, headIndex) => {
          // if (this.currIndex === 0) {
          //   obj[headItem.wardCode] = findItem ? findItem.content : ' '
          // }
          // if (this.currIndex === 1) {
          //   obj[headItem.wardCode] = findItem ? findItem.num : ' '
          // }
          obj.contentColorValue = bodyItem.contentColorValue
          obj['a' + headIndex] = bodyItem[headIndex].content || ' '
        })
        // obj.sum = sum
        s2Data.push(obj)
      })
      console.log(columns, 'columns')
      console.log(s2Data, 's2Data')
      const dataCfg = {
        fields: {
          columns: columns,
        },
        meta: meta,
        data: s2Data
      }

      // 行头
      class CustomColCell extends ColCell {
        getTextStyle () {
          const defaultTextStyle = super.getTextStyle()
          const getHead = headObj[this.meta.field]
          return {
            ...defaultTextStyle,
            fill: getHead ? getHead.headColorValue : '#0D5273',
            fontSize: 14,
            fontWeight: 'bold',
            // textAlign: 'left',
          }
        }
      }
      const options = {
        width: this.getS2Style().width,
        height: this.getS2Style().height,
        frozenColCount: 1,
        frozenTrailingColCount: this.form.type === 3 ? 1: 2,
        style: {
          colCfg: {
            hideMeasureColumn: true, // 默认数值挂列头
            width: (col) => {
              if (col.colIndex === 0) {
                return 200
              }
            },
            height: 40,
          },
        },
        colCell: (node, spreadsheet, headerConfig) => {
          return new CustomColCell(node, spreadsheet, headerConfig);
        },
        conditions: {
          text: [
            {
              // 使用正则, 匹配所有数据
              field: /.*/,
              mapping (value, record) {
                return {
                  fill: record.contentColorValue,
                }
              },
            },
          ],
        },
        tooltip: {
          showTooltip: true,
          content: (cell, defaultTooltipShowOptions) => {
            // console.log('当前单元格：', cell)
            // console.log('默认 tooltip 详细信息：', defaultTooltipShowOptions)
            const dom = document.createElement('div')
            if (cell) {
              const text = cell.meta.label || cell.meta.fieldValue
              dom.innerHTML = text
              dom.style = 'padding: 8px 16px;'
              return dom
            }
          },
        },
      }
      const s2 = new TableSheet(container, dataCfg, options)
      this.s2 = s2
      const s2Palette = {
        'brandColor': '#3471F9',
        'semanticColors': {'red': '#FF4D4F', 'green': '#29A294', 'yellow': '#FAAD14'},
        'others': {'highlight': '#87B5FF', 'results': '#F0F7FF'},
        'basicColorRelations': [{'basicColorIndex': 1, 'standardColorIndex': 0}, {
          'basicColorIndex': 2,
          'standardColorIndex': 1
        }, {'basicColorIndex': 3, 'standardColorIndex': 5}, {
          'basicColorIndex': 4,
          'standardColorIndex': 6
        }, {'basicColorIndex': 5, 'standardColorIndex': 6}, {
          'basicColorIndex': 6,
          'standardColorIndex': 6
        }, {'basicColorIndex': 7, 'standardColorIndex': 5}, {
          'basicColorIndex': 9,
          'standardColorIndex': 1
        }, {'basicColorIndex': 10, 'standardColorIndex': 4}, {
          'basicColorIndex': 11,
          'standardColorIndex': 4
        }, {'basicColorIndex': 12, 'standardColorIndex': 5}],
        'basicColors': ['#0d5273', '#ffffff', '#e5f9f5', '#eef5f9', '#e5f9f5', '#0d5273', '#0d5273', '#0d5273', '#FFFFFF', '#E1EAFE', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#000000', '#000000']
      }
      s2.setThemeCfg({palette: s2Palette})
      s2.render()
    },
    getS2Style () {
      return {
        width: window.document.body.clientWidth - 20,
        height: window.document.body.clientHeight - 80,
      }
    },
    resizeChange () {
      this.s2 && this.s2.changeSize(this.getS2Style().width, this.getS2Style().height)
      this.s2.render()
    },
    getTableData () {
      this.initS2()
    }
  }
}
</script>
<style lang="scss" scoped>
#container {
  height: calc(100vh - 80px);
}
</style>
