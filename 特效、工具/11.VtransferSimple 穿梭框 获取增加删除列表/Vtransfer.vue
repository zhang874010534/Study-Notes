<template>
  <div class="transfer-wrapper">
    <div class="transfer-header"> {{ props.title }}</div>
    <div class="transfer-content">
      <div class="transfer-left">
        <div class="left-header">
          <a-input v-model:value="value" :placeholder="props.placeholder">
            <template #suffix>
              <search-outlined style="color: #909399" />
            </template>
          </a-input>
        </div>
        <div class="select-all">
          <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @change="onCheckAllChange">
            全选
          </a-checkbox>
        </div>
        <div class="left-content" id="transfer_dom">
          <a-checkbox-group v-model:value="state.checkedList" name="checkboxgroup">
            <a-checkbox
                :value="item.value"
                v-for="item in options"
                :key="item.value"
                @change="changeCheckbox($event, item)"
            >
              {{ item.label }}
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </div>
      <div class="transfer-right">
        <div class="right-header">
          <div class="right-header-left"> {{ selectTitle }}({{ displayTargetList.length }}) </div>
          <div class="right-header-right" @click="clear"> 清空已选</div>
        </div>
        <div class="right-content">
          <div class="content-item" v-for="item in displayTargetList" :key="item.value">
            <div class="content-item-left">
              {{ item.label }}
            </div>
            <div class="content-item-right">
              <close-circle-filled style="color: #909399" @click="deleteItem(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, PropType, reactive, ref, watch } from 'vue'
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons-vue'
import lodash from 'lodash'
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  selectTitle: {
    type: String,
    default: '标题2',
  },
  placeholder: {
    type: String,
    default: '请输入成员',
  },
  options: {
    type: Array as PropType<
        {
          value: string
          [propName: string]: any
        }[]
        >,
    default: () => [],
  },
  targetList: {
    type: Array as PropType<
        {
          value: string
          [propName: string]: any
        }[]
        >,
    default: () => [],
  },
})
const emit = defineEmits(['update:targetList', 'loadMore'])
const value = ref('')
const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [],
})
// 监听右侧列表设置已选择列表
const displayTargetList = ref([])
watch(
    () => props.targetList,
    newVal => {
      const checkedList = []
      displayTargetList.value = newVal.filter(item => {
        if (!item.delete) {
          checkedList.push(item.value)
          return true
        }
      })
      state.checkedList = checkedList
    },
    {
      immediate: true,
    }
)
// 删除右边某一项
const deleteItem = row => {
  const list = lodash.cloneDeep(props.targetList)
  const index = props.targetList.findIndex(item => item.value === row.value)
  if (list[index].add) {
    list.splice(index, 1)
  } else {
    list[index].delete = true
  }
  emit('update:targetList', list)
}

// 选择全部
const onCheckAllChange = e => {
  const list = lodash.cloneDeep(props.targetList)

  // 设置右侧list
  if (e.target.checked) {
    props.options.forEach(item => {
      // 没选中才执行
      if (!state.checkedList.includes(item.value)) {
        handleCheck(list, item, true)
      }
    })
  } else {
    props.options.forEach(item => {
      // 选中才执行
      if (state.checkedList.includes(item.value)) {
        handleCheck(list, item, false)
      }
    })
  }
  emit('update:targetList', list)

  const checkedList = props.options.map(item => {
    return item.value
  })
  Object.assign(state, {
    indeterminate: false,
    checkedList: e.target.checked ? checkedList : [],
  })
}
watch(
    () => state.checkedList,
    val => {
      state.indeterminate = !!val.length && val.length < props.options.length
      state.checkAll = val.length === props.options.length
    }
)
const changeCheckbox = (e, row) => {
  const checked = e.target.checked

  const list = lodash.cloneDeep(props.targetList)
  handleCheck(list, row, checked)
  emit('update:targetList', list)
}

const handleCheck = (list, row, checkType) => {
  const index = list.findIndex(item => {
    return item.value === row.value
  })
  let target = null
  if (index !== -1) {
    target = list[index]
  }
  // emit('update:targetList', list)
  if (checkType) {
    // 添加
    if (!target) {
      row.add = true
      list.push(row)
    } else {
      if (target.delete) {
        Reflect.deleteProperty(target, 'delete')
      } else {
        target.add = true
      }
    }
  } else {
    // 删除
    if (target.add) {
      list.splice(index, 1)
    } else {
      target.delete = true
    }
  }
}

// 清空
const clear = () => {
  const list = lodash.cloneDeep(props.targetList)
  displayTargetList.value.forEach(item => {
    handleCheck(list, item, false)
  })
  emit('update:targetList', list)
}
const loading = ref(false)
let previousScrollTop = 0
const scroll = e => {
  if (e.target.scrollTop - previousScrollTop > 0) {
    const target = e.target
    if (target.scrollHeight - target.clientHeight - target.scrollTop - 150 < 0 && loading.value === false) {
      loading.value = true
      emit('loadMore')
    }
  }
  previousScrollTop = e.target.scrollTop
}

watch(
    () => props.options,
    () => {
      loading.value = false
    }
)
let dom = null
// 监听滚动
onMounted(() => {
  dom = document.querySelector('#transfer_dom')
  dom.addEventListener('scroll', scroll)
})
onUnmounted(() => {
  dom.removeEventListener('scroll', scroll)
})

// 获取添加和删除列表
const getAddDeleteList = () => {
  const addArr = props.targetList.filter(item => {
    return item.add
  })
  const deleteArr = props.targetList.filter(item => {
    return item.delete
  })
  return {
    addArr,
    deleteArr,
  }
}

defineExpose({
  getAddDeleteList,
})
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

:hover::-webkit-scrollbar-thumb {
  background-color: #f0f2f5;
}

.transfer-wrapper {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.transfer-header {
  background: #f5f7fa;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
}

.transfer-content {
  display: flex;
  overflow: auto;
  flex: 1;
}

.transfer-left {
  width: 45%;
  min-width: 234px;
  border-right: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .left-header {
    padding: 12px 16px 16px;
  }

  .select-all {
    padding: 0 16px 10px;
  }

  .left-content {
    overflow: auto;
    overflow: overlay;
    flex: 1;
    padding: 0 16px;

    .ant-checkbox-group {
      display: flex;
      flex-direction: column;

      :deep(.ant-checkbox-wrapper) {
        margin: 0 0 14px;
      }
    }
  }
}

.transfer-right {
  width: 55%;
  min-width: 285px;
  display: flex;
  flex-direction: column;

  .right-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    padding: 12px 12px 16px;

    &-left {
      font-weight: bold;
      color: #323233;
    }

    &-right {
      color: var(--ant-primary-color);
      cursor: pointer;
    }
  }

  .right-content {
    overflow: auto;
    overflow: overlay;
    flex: 1;
    padding: 0 12px;
  }

  .content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:first-child) {
      margin-top: 12px;
    }

    &-left {
      max-width: 229px;
    }

    &-right {
      cursor: pointer;
    }
  }
}
</style>
