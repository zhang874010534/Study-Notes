<template>
  <ElPopover
      ref="quarterPopover"
      :visible="pickerVisible"
      trigger="click"
      popper-class="quarter-popover el-date-picker"
      transition="el-zoom-in-top"
      :width="width"
  >
    <template #reference>
      <ElInput
          class="el-date-editor"
          :prefix-icon="Calendar"
          :clearable="clearable"
          v-model="displayValue"
          :placeholder="placeholder"
          @click="pickerVisible = true"
          @clear="clearModelValue"
          style="width: 170px;"
      >
      </ElInput>
    </template>
    <div v-click-outside="closePopover" class="el-date-picker">
      <div class="el-date-picker__header el-date-picker__header--bordered">
        <span role="button" class="el-date-picker__prev-btn">
          <button
              type="button"
              aria-label="前一年"
              class="el-picker-panel__icon-btn"
              @click="getPrevYear"
          >
            <ElIcon><DArrowLeft/></ElIcon>
          </button>
        </span>
        <span role="button" class="el-date-picker__header-label"
        >{{ year }}年</span
        >
        <span role="button" class="el-date-picker__next-btn">
          <button
              type="button"
              aria-label="后一年"
              class="el-picker-panel__icon-btn"
              @click="getNextYear"
          >
            <ElIcon><DArrowRight/></ElIcon>
          </button>
        </span>
      </div>
      <div class="el-picker-panel__content" style="margin: 10px 15px">
        <table class="quarter-table" @click="handleTableClick">
          <tbody>
          <tr>
            <td class="available" :class="getCellStyle(0)">
              <a class="cell">第一季度</a>
            </td>
            <td class="available" :class="getCellStyle(1)">
              <a class="cell">第二季度</a>
            </td>
          </tr>
          <tr>
            <td class="available" :class="getCellStyle(2)">
              <a class="cell">第三季度</a>
            </td>
            <td class="available" :class="getCellStyle(3)">
              <a class="cell">第四季度</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ElPopover>
</template>

<script lang="ts" setup>
import {
  dayjs,
  ClickOutside as vClickOutside,
} from "element-plus";
import {Calendar, DArrowLeft, DArrowRight} from "@element-plus/icons-vue";
import {computed, ref, watch} from "vue";
import {hasClass} from "element-plus/es/utils/dom/style";

const getDayCountOfMonth = function (year, month) {
  if (isNaN(+month)) return 31;
  return new Date(year, +month + 1, 0).getDate();
};
const modifyDate = function (date, y, m, d) {
  return new Date(
      y,
      m,
      d,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
  );
};
const changeYearMonthAndClampDate = function (
    date,
    year,
    month
) {
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

const formatDate = function (date, format) {
  if (!date) return "";
  return dayjs(date).format(format);
};

const range = function (n) {
  return Array.from({length: n}).map((_, n) => n);
};

const nextDate = function (date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};
const prevYear = function (date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};
const nextYear = function (date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

const props = defineProps({
  width: {
    type: String,
    default: '324px'
  },
  /**
   * 显示在输入框中的格式，引入季度：Q（阿拉伯数字）、q（中文数字）
   */
  format: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * 输出值的格式 这里采用dayjs来格式化
   */
  valueFormat: {
    type: String,
    default: ''
  },
  /**
   * 是否可清除
   */
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '请选择季度'
  },
  /**
   * 禁用日期
   */
  disabledDate: {
    type: Function,
  },
})

const pickerVisible = ref(false);
const date = ref();
const year = computed(() => date.value.getFullYear());
const quarter = ref();
const quarterText = ["一", "二", "三", "四"];
// 局部指令
const closePopover = () => {
  pickerVisible.value = false;
};
const parsedValue = computed(() => {
  if (!props.modelValue) {
    return new Date();
  }

  // 非时间格式且未设置valueFormat，再尝试转换时间
  return new Date(props.modelValue);
});

const displayValue = computed({
  get: () => {
    if (!props.modelValue) return null;
    // 季度，从0开始
    const quarter = ~~(parsedValue.value.getMonth() / 3);
    let fDate = formatDate(parsedValue.value, props.format);
    fDate = fDate
        .replace(/Q/, quarter + 1 + "")
        .replace(/q/, quarterText[quarter]);
    return fDate;
  },
  set: () => {
  },
})

watch(
    () => props.modelValue,
    (val) => {
      date.value = val ? parsedValue.value : new Date();
    },
    {
      immediate: true,
    }
);

const clearModelValue = () => {
  emit("update:modelValue", "");
};

const emit = defineEmits(["update:modelValue", 'change']);
const handleTableClick = (event) => {
  let target = event.target;
  if (target.tagName === "A") {
    target = target.parentNode;
  }
  if (target.tagName !== "TD") return;
  if (hasClass(target, "disabled")) return;
  const column = (target).cellIndex;
  const row = (target.parentNode).rowIndex;
  // 季度，从0开始
  const currentQuarter = row * 2 + column;
  // 季度开始月份，从0开始
  const month = currentQuarter * 3;
  let newDate = new Date(year.value, month, 1);
  if (props.valueFormat) {
    newDate = formatDate(newDate, props.valueFormat);
  }
  quarter.value = currentQuarter + 1;
  emit("update:modelValue", newDate.toString());
  emit('change')
  pickerVisible.value = false;
};

const getPrevYear = () => {
  date.value = prevYear(date.value);
};
const getNextYear = () => {
  date.value = nextYear(date.value);
};

/**
 * 获取指定年份和季度总天数
 * @param year
 * @param quarter
 */
const getDayCountOfQuarter = (year, quarter) => {
  switch (quarter) {
    case 0: // 第一季度包含二月，需要对是否闰年进行判断处理
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 91;
      } else {
        return 90;
      }
    case 1:
      return 91;
    default:
      return 92;
  }
};
/**
 * 获取指定年份和季度的所有日期
 * @param year
 * @param quarter
 */
const datesInYearAndQuarter = (year, quarter) => {
  const numOfDays = getDayCountOfQuarter(year, quarter);
  const firstDay = new Date(year, quarter * 3, 1);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};

const getCellStyle = (quarter) => {
  const today = new Date();
  const date = parsedValue.value;

  return {
    disabled:
        typeof props.disabledDate === "function"
            ? datesInYearAndQuarter(year.value, quarter).every(props.disabledDate)
            : false,
    // 当前选中的季度样式
    current:
        date.getFullYear() === year.value && ~~(date.getMonth() / 3) === quarter,
    // 今日所在季度样式
    quarter:
        today.getFullYear() === year.value &&
        ~~(today.getMonth() / 3) === quarter,
  };
};

defineExpose({
  year,
  quarter,
});
</script>

<style>
.quarter-popover {
  padding: 0 !important;
}

.quarter-table {
  border-collapse: collapse;
  width: 100%;
  margin: -1px;
  font-size: 12px;
}

.quarter-table td {
  padding: 20px 3px;
  text-align: center;
  cursor: pointer;
}

.quarter-table td .cell {
  display: block;
  height: 32px;
  margin: 0 auto;
  color: #606266;
  line-height: 32px;
}

.quarter-table td .cell:hover {
  color: #1890ff;
}

.quarter-table td.current:not(.disabled) .cell {
  color: #409eff;
}

.quarter-table td.quarter .cell {
  color: #409eff;
  font-weight: 700;
}

.quarter-table td.disabled .cell {
  color: #c0c4cc;
  background-color: #f5f7fa;
  cursor: not-allowed;
}
</style>
