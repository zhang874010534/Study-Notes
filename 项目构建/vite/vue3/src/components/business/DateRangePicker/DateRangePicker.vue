<template>
  <div class="date-range-picker-wrapper">
    <el-select-v2
        v-model="selectType"
        :options="rangePickerOptions"
        placeholder="请选择"
        style="width: 130px;margin-right: 8px"
        @change="changePickerOptions"
    />
    <!--月-->
    <template v-if="selectType === 1">
      <el-date-picker
          v-model="condition.startTime"
          type="month"
          placeholder="请选择"
          @change="changeDatePicker"
          :clearable="false"
          value-format="YYYY-MM-DD HH:mm:ss"
          class="picker-class"
      />
      <!--<div class="separator"> - </div>-->
      <!--<el-date-picker-->
      <!--    v-model="condition.endTime"-->
      <!--    type="month"-->
      <!--    placeholder="请选择"-->
      <!--    @change="changeDatePicker"-->
      <!--    :clearable="false"-->
      <!--    value-format="YYYY-MM-DD HH:mm:ss"-->
      <!--    class="picker-class"-->
      <!--    :disabled-date="disabledEndDate"-->
      <!--/>-->
    </template>
    <!--季-->
    <template v-if="selectType === 2">
      <QuarterPicker
          ref="quarterPickerRef"
          v-model="condition.startTime"
          @change="changeDatePicker"
          format="YYYY年第q季度"
          value-format="YYYY-MM-DD HH:mm:ss"
      />
      <!--<div class="separator"> - </div>-->
      <!--<QuarterPicker-->
      <!--    ref="quarterPickerRef"-->
      <!--    v-model="condition.endTime"-->
      <!--    @change="changeDatePicker"-->
      <!--    format="YYYY年第q季度"-->
      <!--    class="picker-class"-->
      <!--    value-format="YYYY-MM-DD HH:mm:ss"-->
      <!--    :disabled-date="disabledEndDate"-->
      <!--/>-->
    </template>
    <!--年-->
    <template v-if="selectType === 3">
      <el-date-picker
          v-model="condition.startTime"
          type="year"
          placeholder="请选择"
          @change="changeDatePicker"
          :clearable="false"
          value-format="YYYY-MM-DD HH:mm:ss"
          class="picker-class"
      />
      <!--<div class="separator"> - </div>-->
      <!--<el-date-picker-->
      <!--    v-model="condition.endTime"-->
      <!--    type="year"-->
      <!--    placeholder="请选择"-->
      <!--    @change="changeDatePicker"-->
      <!--    :clearable="false"-->
      <!--    value-format="YYYY-MM-DD HH:mm:ss"-->
      <!--    class="picker-class"-->
      <!--    :disabled-date="disabledEndDate"-->
      <!--/>-->
    </template>
    <!--自定义时间-->
    <template v-if="selectType === 4">
      <el-date-picker
          v-model="condition.startTime"
          type="date"
          placeholder="请选择"
          @change="changeDatePicker"
          :clearable="false"
          value-format="YYYY-MM-DD HH:mm:ss"
          class="picker-class"
          :disabled-date="disabledStartDate"
      />
      <div class="separator"> - </div>
      <el-date-picker
          v-model="condition.endTime"
          type="date"
          placeholder="请选择"
          @change="changeDatePicker"
          :clearable="false"
          class="picker-class"
          value-format="YYYY-MM-DD HH:mm:ss"
          :disabled-date="disabledEndDate"
      />
    </template>
  </div>
</template>
<script setup>
import {reactive, ref, watch} from 'vue'
import {rangePickerOptions} from './map.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import dayjs from 'dayjs'
dayjs.extend(quarterOfYear)

import QuarterPicker from '@/components/business/QuarterPicker/QuarterPicker.vue'
const props = defineProps({
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'month'
  }
})
const emits = defineEmits(['change', 'changeType','update:startTime', 'update:endTime'])
const selectType = ref(null)


const condition = reactive({
  startTime: '',
  endTime: ''
})
// 默认值
const getDefaultCondition = () => {
  const findTypeItem = rangePickerOptions.find(item => item.value === selectType.value)
  if (findTypeItem) {
    const type = findTypeItem.value
    selectType.value = type
    if (type === 1) {
      // 月
      condition.startTime = dayjs().add(-30, 'day').startOf('month').hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss')
      condition.endTime = dayjs(condition.startTime).endOf('month').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
    } else if (type === 2) {
      // 季度
      condition.startTime = dayjs().subtract(1, 'quarter').startOf('quarter').hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss')
      condition.endTime = dayjs(condition.startTime).endOf('quarter').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
    } else if (type === 3) {
      // 年
      condition.startTime = dayjs().subtract(1, 'year').startOf('year').hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss')
      condition.endTime = dayjs(condition.startTime).endOf('year').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
    } else {
      // 自定义时间
      condition.startTime = dayjs().subtract(7, 'day').hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss')
      condition.endTime = dayjs().hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
    }
    emits('update:startTime', condition.startTime)
    emits('update:endTime', condition.endTime)
  }
}

watch(props, (newProps) => {
  condition.startTime = newProps.startTime
  condition.endTime = newProps.endTime
  if (newProps.type) {
    const findItem = rangePickerOptions.find(item => item.type === newProps.type)
    if (findItem && !selectType.value) {
      selectType.value = findItem.value
    }
  }
  if (!condition.startTime && !condition.endTime) {
    getDefaultCondition()
  }
}, {
  immediate: true
})
const changePickerOptions = (val) => {
  const findItem = rangePickerOptions.find(item => item.value === val)
  emits('changeType', findItem)
  condition.startTime = ''
  condition.endTime = ''
  getDefaultCondition()
  changeDatePicker()
}
const changeDatePicker = () => {
  let endTime = ''
  if (selectType.value === 1) {
    // 月 月底
    endTime = dayjs(condition.startTime).endOf('month').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
  } else if (selectType.value === 2) {
    // 季度 季度底
    endTime = dayjs(condition.startTime).endOf('quarter').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
  } else if (selectType.value === 3) {
    // 年 年底
    endTime = dayjs(condition.startTime).endOf('year').hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
  } else {
    endTime = dayjs(condition.endTime).hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
  }
  emits('update:startTime', condition.startTime)
  emits('update:endTime', endTime)
  if (condition.startTime && condition.endTime) {
    emits('change', condition)
  } else {
    console.warn('请选择开始和结束时间')
  }
}

const disabledStartDate = (time) => {
  if (condition.endTime) {
    if (dayjs(time).isAfter(condition.endTime)) {
      return true
    } else {
      return false
    }
  }
  return false
}
const disabledEndDate = (time) => {
  if (condition.startTime) {
    if (dayjs(time).isBefore(condition.startTime)) {
      return true
    } else {
      return false
    }
  }
  return false
}
</script>
<style lang="scss" scoped>
.date-range-picker-wrapper {
  display: inline-flex;
  .separator {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
:deep(.picker-class) {
  width: 150px;
}
</style>
