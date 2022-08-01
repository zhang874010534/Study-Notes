<template>
  <div class="v-tree" ref="tree">
    <a-input v-model:value="searchValue" :placeholder="props.placeholder" v-if="showSearch">
      <template #suffix>
        <search-outlined style="color: #909399" />
        <!--<info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />-->
      </template>
    </a-input>
    <a-spin :spinning="loading">
      <slot></slot>
      <a-tree
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-bind="$attrs"
          v-if="showTree"
          :auto-expand-parent="autoExpandParent"
          :tree-data="treeData"
          :draggable="draggable"
          :blockNode="blockNode"
          :fieldNames="fieldNames"
          @expand="onExpand"
          @select="select"
          @dragstart="dragstart"
          @dragenter="onDragEnter"
          @drop="onDrop"
          @dragend="dragend"
      >
        <template #title="scope">
          <a-input
              v-model:value="inputValue"
              placeholder="请输入分类名称"
              @keydown.enter="inputSet($event, scope)"
              @blur="inputSet($event, scope)"
              id="typeInput"
              v-if="scope.showTitle && showItemEditInput"
          />
          <div class="tree-item" v-else>
            <div class="tree-title">
              <span v-if="scope[fieldNames.title].indexOf(searchValue) > -1">
                {{ scope[fieldNames.title].substring(0, scope[fieldNames.title].indexOf(searchValue)) }}
                <span class="search-color">{{ searchValue }}</span>
                {{
                  scope[fieldNames.title].substring(scope[fieldNames.title].indexOf(searchValue) + searchValue.length)
                }}
              </span>
              <span v-else>{{ scope[fieldNames.title] }}</span>
            </div>
            <div class="tree-right">
              <edit-outlined style="color: #909399" @click="editType($event, scope)" v-if="showItemEditInput" />
              <slot name="tree-right" v-bind="scope"></slot>
            </div>
          </div>
        </template>
        <template #icon="scope">
          <slot name="icon" v-bind="scope"></slot>
        </template>
      </a-tree>
    </a-spin>
  </div>
</template>
<script setup lang="ts">
import useTree from '@/hooks/componentsHooks/useTree'
import { SearchOutlined, EditOutlined } from '@ant-design/icons-vue'
import type { AntTreeNodeDragEnterEvent, AntTreeNodeDropEvent } from 'ant-design-vue/es/tree'
import { nextTick, PropType, ref, watch } from 'vue'
import { getLeafDeep, setTreeData } from '@/utils'
const props = defineProps({
  treeData: {
    type: Array,
    default: () => [],
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '搜索名称',
  },
  // 搜索框
  showSearch: {
    type: Boolean,
    default: false,
  },
  // 是否节点占据一行
  blockNode: {
    type: Boolean,
    default: false,
  },
  // 隐藏树
  showTree: {
    type: Boolean,
    default: true,
  },
  // loading动画
  loading: {
    type: Boolean,
    default: false,
  },
  // 是否显示修改当前项图标
  showItemEditInput: {
    type: Boolean,
    default: false,
  },
  // 替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段
  fieldNames: {
    type: Object as PropType<{
      children?: string
      title?: string
      key?: string
    }>,
    default: () => ({
      children: 'children',
      title: 'title',
      key: 'key',
    }),
  },
  // 禁用反选
  disabledReverse: {
    type: Boolean,
    default: false,
  },
  // 默认选择叶子节点
  chooseLeaf: {
    type: Boolean,
    default: false,
  },
})
const inputValue = ref('')
const emit = defineEmits(['select', 'inputSet', 'dragstart', 'onDrop', 'dragenter', 'dragend'])
const onDragEnter = (info: AntTreeNodeDragEnterEvent) => {
  emit('dragenter', info)
  // expandedKeys 需要展开时
  // expandedKeys.value = info.expandedKeys;
}

const dragstart = info => {
  emit('dragstart', info)
}
const onDrop = (info: AntTreeNodeDropEvent) => {
  emit('onDrop', info)
}
const dragend = info => {
  emit('dragend', info)
}

let firstInit = true
const { autoExpandParent, expandedKeys, selectedKeys, searchValue, onExpand, initTree } = useTree(
    props.treeData,
    props.fieldNames
)

const tree = ref(null)
watch(
    () => props.treeData,
    newVal => {
      initTree(newVal as any)
      if (firstInit && props.chooseLeaf) {
        firstInit = false
        const item = getLeafDeep(newVal)
        expandedKeys.value = [item.target[props.fieldNames.key]]
        nextTick(() => {
          const domList = tree.value.querySelectorAll('.ant-tree-node-content-wrapper')
          domList[item.length].click()
        })
      }
    }
)

const oldSelectedKeys = ref([])
const select = (selectedKeysArr, e) => {
  // 禁用取消反选
  if (props.disabledReverse) {
    if (selectedKeysArr.length === 0) {
      selectedKeys.value = oldSelectedKeys.value
    } else {
      oldSelectedKeys.value = selectedKeysArr
    }
  }
  emit('select', {
    selectedKeys: selectedKeys.value,
    target: e,
  })
}

// 编辑名字
const editType = (e, scope) => {
  e.stopPropagation()
  setTreeData({
    key: scope[props.fieldNames.key],
    targetKey: 'showTitle',
    targetValue: true,
    data: props.treeData,
  })
  inputValue.value = scope.title
  nextTick(() => {
    const dom = document.querySelector('#typeInput') as HTMLElement
    dom.focus()
  })
}
// 修改名称
const inputSet = (e, scope) => {
  // 外面发请求 重新请求树
  emit('inputSet', scope, inputValue.value)
  setTreeData({
    key: scope[props.fieldNames.key],
    targetKey: 'showTitle',
    targetValue: false,
    data: props.treeData,
  })
}
</script>
<style lang="scss" scoped>
.v-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-sizing: border-box;

  .search-color {
    color: var(--ant-primary-color);
  }

  :deep(.ant-input-affix-wrapper) {
    margin: 8px 8px 4px;
    box-sizing: border-box;
    width: calc(100% - 16px);
    border-radius: 3px;
    box-shadow: 0 2px 0 rgb(0 0 0 / 1.6%);
  }

  :deep(.ant-tree) {
    padding: 8px 16px 0 12px;
    flex: 1;

    .ant-tree-node-content-wrapper {
      display: flex;

      .ant-tree-title {
        flex: 1;
      }

      &:hover {
        background-color: #f5f7fa;
      }

      &.ant-tree-node-selected {
        color: var(--ant-primary-color);
      }
    }

    .ant-tree-indent-unit {
      width: 12px;
    }
  }

  :deep(.ant-tree-list) {
    width: 100%;

    .ant-tree-treenode {
      margin-top: 2px;

      .ant-tree-node-content-wrapper {
        width: 100%;
        padding: 4px;
      }

      .ant-tree-switcher {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  :deep(.ant-tree .ant-tree-node-content-wrapper:active) {
    background: #e4e7ed;
  }
}

.tree-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    .tree-right {
      opacity: 1;
    }
  }
  //.tree-title {
  //
  //}
  .tree-right {
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
}

.ant-spin-nested-loading {
  flex: 1;
  overflow: auto;
  overflow: overlay;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #f0f2f5;
  }
}
</style>
