export const rangePickerOptions = [{
  value: 1,
  label: '按月',
  type: 'month'
},{
  value: 2,
  label: '按季',
  type: 'quarter'
},{
  value: 3,
  label: '按年',
  type: 'year'
},{
  value: 4,
  label: '自定义时间',
  type: 'custom'
}]

export const dateTypeMap = {}
rangePickerOptions.forEach(item => {
  dateTypeMap[item.type] = item.value
})
