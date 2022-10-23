<template>
  <a-tabs
      v-if="$slots.pane"
      :class="props.customTabsClass"
      v-model:activeKey="activeKey"
      @tabClick="tabClick"
      v-bind="$attrs"
  >
    <slot name="pane"></slot>
  </a-tabs>
  <div class="tabs-wrapper" id="tabs_wrapper" :style="wrapperStyle" ref="wrapperDom">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { debounce } from 'lodash'
import { CSSProperties, PropType } from 'vue'
const props = defineProps({
  // 自定义tabs class, 用于做样式修改
  customTabsClass: {
    type: String,
  },
  wrapperStyle: {
    type: Object as PropType<CSSProperties>,
  },
  // 是否显示tabs-block的下边框
  border: {
    type: Boolean,
    default: true,
  },
  // 需要滚动的dom
  scrollDom: {
    type: String,
    default: 'tabs_wrapper',
  },
  // 滚动列表距离 dom top的位移
  scrollOffsetTop: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['tabClick'])
provide('border', props.border)
const activeKey = ref('0')
let domList = null
let wrapperDom = ref()
let observer = null

// 开始监听滚动
let scrollInterval = null
let realScrollDom = null
const startWatchScroll = () => {
  realScrollDom = document.getElementById(props.scrollDom) as HTMLElement
  realScrollDom.addEventListener('scroll', watchScroll)
}
const afterResize = debounce(() => {
  let clientHeight = 0
  if (props.scrollDom === 'tabs_wrapper') {
    clientHeight = realScrollDom.clientHeight
  } else {
    /* - 44 - 30 居民详情 -- **高度 */
    clientHeight = realScrollDom.clientHeight - 44 - 30
  }

  if (
      domList.length > 0 &&
      Array.from(domList).reduce((a: number, b: HTMLElement) => a + b.clientHeight, 0) > clientHeight
  ) {
    const lastChildrenDom = domList[domList.length - 1]
    lastChildrenDom.style.height = 'unset'
    const lastChildrenClientHeight = lastChildrenDom.clientHeight

    lastChildrenClientHeight > clientHeight
        ? (lastChildrenDom.style.height = 'unset')
        : (lastChildrenDom.style.height = clientHeight + 'px')
  }
}, 100)
onMounted(() => {
  startWatchScroll()
  calculate()
  observer = new MutationObserver(() => {
    afterResize()
  })
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false,
  }
  observer.observe(wrapperDom.value, config)
})
onUnmounted(() => {
  observer.disconnect()
})
// 获取 children  DOM HTMLCollection
const calculate = () => {
  domList = wrapperDom.value.children
}

let disableWatch = false
let disableWatchTimeout = null
const watchScroll = e => {
  if (disableWatch) return
  if (!scrollInterval) {
    scrollInterval = setTimeout(() => {
      clearTimeout(scrollInterval)
      scrollInterval = null
      const scrollTop = e.target.scrollTop + 10
      for (let i = 0; i < domList.length; i++) {
        if (i < domList.length - 1) {
          if (domList[i].offsetTop < scrollTop && scrollTop < domList[i + 1].offsetTop) {
            activeKey.value = String(i)
          }
        } else {
          // 最后一个
          if (domList[i].offsetTop < scrollTop && domList[i].offsetTop < scrollTop) {
            activeKey.value = String(i)
          }
        }
      }
    }, 500)
  }
}
const tabClick = e => {
  emits('tabClick', e)
  if (!domList[e]) {
    console.error('请按顺序填写key值，从0开始')
    return
  }
  clearTimeout(disableWatchTimeout)
  disableWatch = true
  // 1s后允许监听
  disableWatchTimeout = setTimeout(() => {
    disableWatch = false
  }, 1000)
  // domList[e].scrollIntoView({
  //   behavior: 'smooth',
  // })
  const dom = document.getElementById(props.scrollDom)
  dom.scrollTo({
    top: domList[e].offsetTop + props.scrollOffsetTop,
    behavior: 'smooth',
  })
}
defineExpose({
  wrapperDom,
})
</script>
<style lang="scss" scoped>
.ant-tabs {
  background-color: #fff;

  :deep(.ant-tabs-nav) {
    margin-bottom: 8px;

    .ant-tabs-tab {
      padding: 0;
      margin: 13px 16px;
    }
  }
}

.tabs-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-y: overlay;
  position: relative;
}
</style>
