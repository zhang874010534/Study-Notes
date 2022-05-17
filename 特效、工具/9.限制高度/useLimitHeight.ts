import { onMounted, onUnmounted, ref } from 'vue'
// 限制高度
export default function () {
  const resizeInterval = ref(null)
  function resizeChangeHeight() {
    if (!resizeInterval.value) {
      resizeInterval.value = setInterval(() => {
        useLimitHeight()
        clearInterval(resizeInterval.value)
        resizeInterval.value = null
      }, 1000)
    }
  }

  // 动态设置高度
  let mainContentDom = null
  const useLimitHeight = () => {
    const dom = document.querySelector('#main') as HTMLElement | null
    if (dom) {
      const computedStyle = window.getComputedStyle(dom)
      const paddingBottom = Number(computedStyle.paddingBottom.replace('px', ''))
      mainContentDom = document.querySelector('#main_content') as HTMLElement | null
      if (mainContentDom) {
        const top = mainContentDom.getBoundingClientRect().top
        mainContentDom.style.height = document.body.clientHeight - top - paddingBottom + 'px'
        return true
      }
    }
  }
  onMounted(() => {
    const hasDom = useLimitHeight()
    if (hasDom) {
      window.addEventListener('resize', resizeChangeHeight)
    }
  })
  onUnmounted(() => {
    if (mainContentDom) {
      mainContentDom.style.height = 'auto'
    }
    window.removeEventListener('resize', resizeChangeHeight)
  })
  return {}
}
