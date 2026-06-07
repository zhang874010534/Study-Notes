<template>
  <PageWrapper>
    <PageBody v-loading="tableLoading" style="position: relative;">
      <el-input v-show="showCellInput" ref="cellInputRef" v-model="cellInputValue" :style="inputStyle" type="number"  placeholder="请输入" @blur="cellInputSave" @keydown.enter="cellInputSave"/>
      <SheetComponent
          :dataCfg="dataCfg"
          :options="options"
          :adaptive="{ width: true, height: true }"
          :onDataCellClick="onDataCellClick"
          ref="sheetComponentRef"
          v-show="dataCfg.data.length > 0"
      />
      <el-empty v-show="dataCfg.data.length === 0" description="暂无数据" style="height:100%;" />
    </PageBody>
  </PageWrapper>
</template>
<script setup lang="jsx">
import {ref, onMounted, reactive, shallowRef, computed} from 'vue'
import {cloneDeep, debounce, pick} from 'lodash'
import {SheetComponent} from '@antv/s2-vue'
import {ColCell, CornerCell, EXTRA_FIELD} from '@antv/s2'
import {scoreTypeOptions} from '@/views/businessFun/workQuantity/map.js'
import {dateTypeMap} from '@/components/business/NisDateRangePicker/map.js'
import {ElMessage} from 'element-plus'
import fingerIcon from './images/finger.png'
const tableData = ref([])
const headData = ref([])
const tableLoading = ref(false)

class CustomCornerCell extends CornerCell {
}

// 行头
class CustomColCell extends ColCell {
  initCell() {
    super.initCell();
    this.renderGroupSeparator();
  }

  // 加颜色
  getTextStyle () {
    const defaultTextStyle = super.getTextStyle()
    const getHead = headObj[this.meta.field]
    return {
      ...defaultTextStyle,
      fill: getHead ? getHead.colorValue : '#0D5273',
      fontSize: 14,
      fontWeight: 'bold',
    }
  }
  renderGroupSeparator() {
    const {colIndex} = this.meta
    const { x, y, width, height} = this.textShape.getBBox();
    if (colIndex > 0) {
      const head = headListLeaf.value[colIndex - 1]
      if (head && head.manual === 1) {
        this.textShape = this.addShape('image', {
          attrs: {
            x: x - 10,
            y: y,
            width: 10,
            height: 10,
            img: fingerIcon,
          }
        })
      }
    }
    let sortFieldId = ''
    if (condition.countType === 2) {
      sortFieldId = 'nurseCode'
    } else {
      if (condition.scoreType === 2) {
        sortFieldId = 'dateStr'
      } else {
        sortFieldId = 'wardCode'
      }
    }
    if (!this.meta.isTotals && this.meta.isLeaf) {
      let sortUpIconName = 'SortUp'
      let sortDownIconName = 'SortDown'
      if (this.meta.value === currentFilterCol.value.value) {
        if (currentFilterCol.value.sortMethod === 'ASC') {
          sortUpIconName = 'SortUpSelected'
        } else {
          sortDownIconName = 'SortDownSelected'
        }
      }
      this.addActionIcon({
        iconName:  sortUpIconName,
        x: x + width + 2,
        y: y - 3,
        onClick: (e) => {
          console.log(e)
          currentFilterCol.value = {
            value: e.meta.label,
            sortMethod: 'ASC',
          }
          dataCfg.value = cloneDeep({
            ...s2DataConfig,
            sortParams: [
              {
                sortFieldId: sortFieldId,
                sortMethod: 'ASC',
                sortByMeasure: 'countNumStr',
                // 当使用 sortByMeasure 时，可以传入 query 定位数值列表
                // 如下方限定 params.data 为 type=纸张，数值=price 的数据
                query: {
                  [e.meta.key]: e.meta.label,
                  [EXTRA_FIELD]: 'countNumStr'
                },
              },
            ],
          })
          console.log('SortUp')
        },
      })
      this.addActionIcon({
        iconName: sortDownIconName,
        x: x + width + 2,
        y: y + 3,
        onClick: (e) => {
          currentFilterCol.value = {
            value: e.meta.label,
            sortMethod: 'DESC',
          }
          dataCfg.value = cloneDeep({
            ...s2DataConfig,
            sortParams: [
              {
                sortFieldId: sortFieldId,
                sortMethod: 'DESC',
                sortByMeasure: 'countNumStr',
                // 当使用 sortByMeasure 时，可以传入 query 定位数值列表
                // 如下方限定 params.data 为 type=纸张，数值=price 的数据
                query: {
                  [e.meta.key]: e.meta.label,
                  [EXTRA_FIELD]: 'countNumStr'
                },
              },
            ],
          })
          console.log('SortDown')
        },
      })
    }
  }
}
const headListLeaf = ref([])

const s2Options = {
  frozenRowHeader: true,
  frozenFirstRow: true,
  // customSVGIcons: [
  //   {
  //     name: 'Filter',
  //     svg: 'https://gw.alipayobjects.com/zos/antfincdn/gu1Fsz3fw0/filter%26sort_filter.svg',
  //   },
  // ],
  showDefaultHeaderActionIcon: false,
  // headerActionIcons: [
  //   {
  //     iconNames: ['SortUp', 'SortDown'],
  //     belongsCell: 'colCell',
  //   },
  // ],
  interaction: {
    selectedCellsSpotlight: true,
    selectedCellHighlight: true, // 选中格子后的高亮行为
    enableCopy: true,
    // hiddenColumnFields: ['countNumStr']
    resize: {
      colCellVertical: false, // 是否开启列头垂直方向 resize 热区
    }
  },
  colCell(viewMeta, spreadsheet, headerConfig) {
    return new CustomColCell(viewMeta, spreadsheet, headerConfig);
  },
  layoutCoordinate: (facetCfg, rowNode, colNode) => {
    // layoutCoordinate 用于改变行列叶子结点的尺寸（长、宽）和坐标（x、y）
    if (colNode?.query) {
      const query = colNode.query
      if (query.headerName1 === query.headerName2 && query.headerName2 === query.headerName3) {
        colNode.y = 0
        colNode.height = 90
      } else if (query.headerName2 === query.headerName3) {
        colNode.y = 30
        colNode.height = 60
      }
    }
  },
  // cornerCell: (node, s2, headConfig) => {
  //   if (node.key === 'headerName1') {
  //     node.height = 60
  //   }
  //   if (node.key === 'headerName2') {
  //     node.height = 0
  //   }
  //   return new CustomCornerCell(node, s2, headConfig);
  // },
  style: {
    colCfg: {
      hideMeasureColumn: true, // 默认数值挂列头
      // width: (col) => {
      //   const headItem = headListLeaf.value[col.colIndex]
      //   if (headItem) {
      //     return headItem.cellWidth ? headItem.cellWidth : 140
      //   } else {
      //     return 140
      //   }
      // },
    }
  },
  totals: {
    row: {
      showGrandTotals: true,
      showSubTotals: true,
      reverseLayout: true,
      reverseSubLayout: true,
      subTotalsDimensions: ['wardCode'],
      calcTotals: {
        aggregation: 'SUM',
      },
      calcSubTotals: {
        // 设置小计汇总计算方式为求和
        aggregation: 'SUM',
      },
    },
    col: {
      showGrandTotals: true,
      showSubTotals: true,
      reverseLayout: true,
      reverseSubLayout: true,
      subTotalsDimensions: ['countNumStr'],
      calcTotals: {
        aggregation: 'SUM',
      },
      calcSubTotals: {
        aggregation: 'SUM',
      },
    },
  },
}

const wardCodeMap = {}
const nurseCodeMap = {}

const formatWardCode = (val) => {
  return wardCodeMap[val]
}
const formatNurseCode = (val) => {
  return nurseCodeMap[val]
}

const s2DataConfig = {
  fields: {
    rows: ['wardCode'],
    columns: ['headerName1', 'headerName2', 'headerName3'],
    values: ['countNumStr'],
    // valueInCols: true,
  },
  meta: [
    {
      field: 'wardCode',
      name: '11',
      formatter: formatWardCode,
    },
    {
      field: 'nurseCode',
      name: '22',
      formatter: formatNurseCode,
    },
    {
      field: 'dateStr',
      name: '33',
    },
    {
      field: 'headerName1',
      name: '44'
    },
    {
      field: 'headerName2',
      name: ' '
    },
    // {
    //   field: 'headerName3',
    //   name: '11\\22'
    // },
    {
      field: 'countNumStr',
      name: '数量'
    }
  ],
  data: []
}


const dataCfg = shallowRef(s2DataConfig)
const options = reactive(s2Options)

// 最多几层
const maxLevel = ref(2)
let isFirst = true
const treeSelectData = ref([])
const getDataSourceWorkloadMenu = () => {
  tableLoading.value = true
  headData.value = []
  return getDataSourceWorkloadMenuApi({
    countType: condition.countType,
    headIdList: condition.headIdList.join(','),
  }).then(res => {
    // res = data1.data
    if (isFirst) {
      isFirst = false
      treeSelectData.value = res
    }
    // 处理别名
    handleHeadName(res)
    console.log(res, 'head')
    const flag = res.some(firstItem => {
      if (firstItem.submenu.length > 0) {
        return firstItem.submenu.some(secondItem => {
          if (secondItem.submenu.length > 0) {
            return true
          }
        })
      }
    })
    if (flag) {
      maxLevel.value = 3
      // 合并角头
      s2Options.cornerCell = (node, s2, headConfig) => {
        if (node.key === 'headerName1') {
          node.height = 60
        }
        if (node.key === 'headerName2') {
          node.height = 0
        }
        if (node.key === 'wardCode' || node.key === 'nurseCode') {
          node.y = 60
          node.height = 30
        }
        return new CustomCornerCell(node, s2, headConfig);
      }
    } else {
      s2DataConfig.fields.columns = ['headerName1', 'headerName2']
      s2Options.cornerCell = (node, s2, headConfig) => {
        if (node.key === 'headerName1') {
          node.height = 30
        }
        if (node.key === 'headerName2') {
          node.height = 0
        }
        if (node.key === 'wardCode' || node.key === 'nurseCode') {
          node.y = 30
          node.height = 30
        }
        return new CustomCornerCell(node, s2, headConfig);
      }
      s2Options.layoutCoordinate = (facetCfg, rowNode, colNode) => {
        // layoutCoordinate 用于改变行列叶子结点的尺寸（长、宽）和坐标（x、y）
        if (colNode?.query) {
          const query = colNode.query
          if (query.headerName1 === query.headerName2 ) {
            colNode.y = 0
            colNode.height = 60
          }
        }
      }
      maxLevel.value = 2
    }
    headData.value = res
  })
}
const handleHeadName = (list) => {
  list.forEach(item => {
    if (!item.headerName) {
      item.headerName = item.dataSourceName
    }
    if (item.submenu.length > 0) {
      handleHeadName(item.submenu)
    }
  })
}

let clickTimeout = ''
// const cell = ref({})

const onDataCellClick = (data) => {
  console.log(data, 'data')
  // 有输入框 阻止点击
  if (showCellInput.value) {
    cellInputRef.value.blur()
    return
  }
  currentCell.value = data.viewMeta.data
  const head = headListLeaf.value.find(item => item.dataSourceId === currentCell.value.dataSourceId)
  if (clickTimeout) {
    clearTimeout(clickTimeout)
    clickTimeout = ''
    if (!data.viewMeta.isTotals && head.manual === 1 && condition.scoreType === 2 && ['month', 'custom'].includes(dateRangePickerType.value) && condition.countType === 1) {
      setCellPosition(data)
      cellInputValue.value = currentCell.value.countNum
    }
    console.log('doubleClick')
  } else {
    clearTimeout(clickTimeout)
    clickTimeout = setTimeout(() => {
      clickTimeout = ''
      if (!data.viewMeta.isTotals && head.manual !== 1) {
        showDetailS2(data.viewMeta.data)
      }
      // currentCell.value =
      console.log('click')
    }, 300)
  }
}


// 输入框位置
const inputStyle = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  position: 'absolute',
  textAlign: 'right',
  zIndex: 1000,
})

const hideInput = () => {
  inputStyle.left = 0
  inputStyle.top = 0
  inputStyle.width = 0
  inputStyle.height = 0
}
const cellInputSave = () => {
  console.log(cellInputValue.value, 'cellInputValue')
  const currentCellCopy = cloneDeep(currentCell.value)
  Reflect.deleteProperty(currentCellCopy, '$$extra$$')
  Reflect.deleteProperty(currentCellCopy, '$$value$$')
  showCellInput.value = false
  saveStatisticsManualApi(({
    ...currentCellCopy,
    statisticsDate: currentCellCopy.dateStr,
    organCode: common.getOrganCode(),
    countNum: cellInputValue.value
  })).then(() => {
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getStatisticsWorkLoad()
    hideInput()
  })
}
const cellInputValue = ref()
const cellInputRef = ref()
// onClickOutside(cellInputRef, () => {
//   console.log('clickInputOutside')
//   // if (showCellInput.value) {
//   //   cellInputSave()
//   // }
// })
// 展示input
const showCellInput = ref(false)
const setCellPosition = (data) => {
  // console.log(data.target.cfg.parent)
  showCellInput.value = true
  cellInputRef.value.focus()
  const newScroll = sheetComponentRef.value.instance.facet.getScrollOffset()
  const cell = data.target
  const cellMeta = pick(cell.getMeta(), ['x', 'y', 'width', 'height'])
  const spreadsheet = sheetComponentRef.value.instance
  // 列头 总计
  let colCellHeight = (spreadsheet.getColumnNodes()[0] || { height: 0 }).height;
  // 行头总计
  const totalItem = spreadsheet.getRowNodes().find(item => item.isTotals && item.level === 0)
  let colCellWidth = 0
  if (totalItem) {
    colCellWidth = totalItem.width
  }
  if (maxLevel.value === 3) {
    colCellHeight = 90
  }
  inputStyle.left = colCellWidth + cellMeta.x - newScroll.scrollX + 'px'
  inputStyle.top = colCellHeight + cellMeta.y - newScroll.scrollY + 'px'
  inputStyle.width = cellMeta.width + 'px'
  inputStyle.height = cellMeta.height + 'px'
}
const saveCellInput = (val) => {
  console.log(val)
  console.log(currentCell.value, 'cc')
}
// const onDataCellDoubleClick = (data) => {
//   console.log(data, 'doubleClick')
// }
let leafList = []

const sheetComponentRef = ref(null)
const getStatisticsWorkLoad = () => {
  const params = {
    beginTime: condition.startTime,
    endTime: condition.endTime,
    countType: condition.countType,
    organCode: common.getOrganCode(),
    wardCodeList: condition.wardCodeList,
    dataSourceId: condition.dataSourceId,
    direction: condition.direction,
    scoreType: condition.scoreType,
    dateType: condition.dateType,
    headIdList: condition.headIdList,
  }
  tableLoading.value = true
  getStatisticsWorkLoadApi(params).then(res => {
    // res = data2.data
    console.log(res, '数据')
    res.forEach(item => {
      if (item.length > 0) {
        const element = item[0]
        wardCodeMap[element.wardCode] = element.wardName
        if (element.nurseCode) {
          nurseCodeMap[element.nurseCode] = element.nurseName
        }
      }
    })
    let dataIndex = 0
    const s2Data = []
    headListLeaf.value = []
    headData.value.forEach(headItem => {
      // 没有子集
      if (headItem.submenu.length === 0) {
        res.forEach(resItem => {
          const element = resItem[dataIndex]
          let headerName1 = '',headerName2 = '',headerName3 = ''
          const headName = headItem.headerName ? headItem.headerName : headItem.dataSourceName
          if (maxLevel.value === 2) {
            headerName1 = headName
            headerName2 = headName
          } else {
            headerName1 = headName
            headerName2 = headName
            headerName3 = headName
          }
          s2Data.push({
            ...element,
            headerName1,
            headerName2,
            headerName3,
          })
        })
        headListLeaf.value.push(headItem)
        dataIndex++
      } else {
        headItem.submenu.forEach(secondItem => {
          // 没有子集
          if (secondItem.submenu.length === 0) {
            res.forEach(resItem => {
              const element = resItem[dataIndex]
              let headerName1 = '',headerName2 = '',headerName3 = ''
              if (maxLevel.value === 2) {
                headerName1 = headItem.headerName ? headItem.headerName : headItem.dataSourceName
                headerName2 = secondItem.headerName ? secondItem.headerName : secondItem.dataSourceName
              } else {
                headerName1 = headItem.headerName ? headItem.headerName : headItem.dataSourceName
                // 2和3一样
                headerName2 = secondItem.headerName ? secondItem.headerName : secondItem.dataSourceName
                headerName3 = secondItem.headerName ? secondItem.headerName : secondItem.dataSourceName
              }
              s2Data.push({
                ...element,
                headerName1,
                headerName2,
                headerName3
              })
            })
            headListLeaf.value.push(secondItem)
            dataIndex++
          } else {
            secondItem.submenu.forEach(thirdItem => {
              res.forEach(resItem => {
                const element = resItem[dataIndex]
                s2Data.push({
                  ...element,
                  headerName1: headItem.headerName ? headItem.headerName : headItem.dataSourceName,
                  headerName2: secondItem.headerName ? secondItem.headerName : secondItem.dataSourceName,
                  headerName3: thirdItem.headerName ? thirdItem.headerName : thirdItem.dataSourceName,
                })
              })
              headListLeaf.value.push(thirdItem)
              dataIndex++
            })
          }
        })
      }
    })
    s2Options.style.colCfg.width = (col) => {
      // 有合计 需要减去一列
      const headItem = headListLeaf.value[col.colIndex - 1]
      if (headItem && headItem.cellWidth && !col.isTotals) {
        return Number(headItem.cellWidth)
      }
    }
    // 重新设置options
    sheetComponentRef.value.instance.setOptions(s2Options)
    s2DataConfig.data = s2Data
    console.log(s2Data, 's2Data')
    const rows = ['wardCode']
    if (condition.scoreType === 2 && condition.countType === 1) {
      rows.push('dateStr')
    }
    if ([1, 3].includes(condition.countType)) {
      const findItem = s2DataConfig.meta.find(item => item.field === 'headerName1')
      if (findItem) {
        findItem.name = '11\\22'
      }
    } else {
      rows.push('nurseCode')
      const findItem = s2DataConfig.meta.find(item => item.field === 'headerName1')
      if (findItem) {
        findItem.name = '11\\33'
      }
    }

    s2DataConfig.fields.rows = rows
    dataCfg.value = cloneDeep(s2DataConfig)
  }).finally(() => {
    tableLoading.value = false
  })
}

const dateRangePickerType = ref('month')
const changeType = (pickerType) => {
  dateRangePickerType.value = pickerType.type
}
const dialogVisible = ref(false)
const dialogTableLoading = ref(false)
const columnNames = ref([])
const dialogTableData = ref([])
const detailDialogName = ref('')
const dialogCondition = reactive({
  wardCodeList: [],
  startTime: '',
  endTime: '',
  keyword: ''
})

const currentCell = ref({})
const showDetailS2 = (params) => {
  dialogTableData.value = []
  dialogCondition.startTime = condition.startTime
  dialogCondition.endTime = condition.endTime
  dialogCondition.wardCodeList = condition.wardCodeList

  // currentScope.value = scope
  dialogVisible.value = true
  let name = ''
  if (params.headerName3) {
    name = params.headerName3
  } else if (params.headerName2) {
    name = params.headerName2
  } else {
    name = params.headerName1
  }
  detailDialogName.value = name
  getDetail()
}

const keywordInput = debounce((val) => {
  getDetail()
}, 300)
const tableHeight = ref('')
const getTableHeight = () => {
  tableHeight.value = document.body.clientHeight - 200 + 'px'
}
getTableHeight()

</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 8px 0 0;
  .header-left {
    display: flex;
    flex-wrap: wrap;
  }
  .header-right {
    flex-shrink: 0;
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  .label {
    height: 32px;
    line-height: 32px;
  }
}

.table-cell {
  white-space: pre-wrap;
}

.condition-item {
  display: flex;
  margin-right: 8px;
  margin-bottom: 8px;
  .label {
    height: 32px;
    line-height: 32px;
    margin-right: 8px;
  }
}
</style>

