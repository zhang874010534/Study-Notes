<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="tabClick">
    <slot name="pane"></slot>
  </a-tabs>
  <div class="tabs-wrapper" id="tabs_wrapper">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  const activeKey = ref('0')
  let domList = null
  let wrapperDom = null
  let observer = null
  onMounted(() => {
    wrapperDom = document.querySelector('#tabs_wrapper')
    startWatchScroll()
    calculate()
    observer = new MutationObserver(() => {
      calculate()
    })
    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true }
    observer.observe(wrapperDom, config)
  })
  onUnmounted(() => {
    observer.disconnect()
  })
  // 计算dom距离父元素顶部距离
  const calculate = () => {
    domList = wrapperDom.children
  }
  // 开始监听滚动

  let scrollInterval = null
  const startWatchScroll = () => {
    wrapperDom.addEventListener('scroll', watchScroll)
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
          }
        }
      }, 500)
    }
  }
  const tabClick = e => {
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
    domList[e].scrollIntoView({
      behavior: 'smooth',
    })
  }
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

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: rgb(0 0 0 / 40%);
  }

  .tabs-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-y: overlay;
    position: relative;
  }
</style>
