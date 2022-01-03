const dragDirective = {}

const map = new Map()

function touchstart(option, el, e) {
    el.style.willChange = 'transform'
    el.style.transition = 'all 0s'
    if (option.isFirst) {
        const computedStyle = getComputedStyle(el)
        option.boxLeft = computedStyle.top.indexOf('px') !== -1 ? parseInt(computedStyle.left) : 0
        option.boxTop = computedStyle.top.indexOf('px') !== -1 ? parseInt(computedStyle.top) : 0
        option.boxWidth = parseInt(computedStyle.width)
        option.boxHeight = parseInt(computedStyle.height)
        option.isFirst = false
    }

    option.handLeft = e.touches[0].clientX
    option.handTop = e.touches[0].clientY
}
function touchmove(option, el, e) {
    e.cancelBubble = true
    e.preventDefault()
    let {
        boxLeft,
        boxTop,
        boxWidth,
        boxHeight,
        handLeft,
        handTop,
        translateX,
        translateY,
        boxOffsetLeft,
        boxOffsetTop,
        clientWidth,
        clientHeight,
    } = option
    boxOffsetLeft = boxLeft + translateX
    const clientX = e.touches[0].clientX
    const clientY = e.touches[0].clientY
    const moveX = clientX - handLeft
    const moveY = clientY - handTop
    if (boxOffsetLeft >= 0 && moveX < 0) {
        option.translateX += moveX
        option.handLeft = clientX
    }
    if (boxOffsetLeft + boxWidth <= clientWidth && moveX > 0) {
        option.translateX += moveX
        option.handLeft = clientX
    }
    boxOffsetTop = boxTop + translateY
    if (boxOffsetTop >= 0 && moveY < 0) {
        option.translateY += moveY
        option.handTop = clientY
    }
    if (boxOffsetTop + boxHeight <= clientHeight && moveY > 0) {
        option.translateY += moveY
        option.handTop = clientY
    }

    // setPositon(translateX, translateY)
    requestAnimationFrame(setPositon.bind(this, option.translateX, option.translateY, option, el))
}
function touchend(option, el, e) {
    let { edge, boxLeft, boxWidth, translateX, translateY, clientWidth } = option
    el.style.transition = 'all 0.3s'
    e.cancelBubble = true
    // 直接比较的transform的值然后进行设置
    if (!(option.binding.arg === 'reset' && option.binding.value === false)) {
        requestAnimationFrame(
            setPositon.bind(
                this,
                compareAbs([-boxLeft + edge, clientWidth - boxWidth - boxLeft - edge], translateX),
                translateY,
                option,
                el
            )
        )
    }
}
// 判断到哪一边近
function compareAbs(arr = [], value) {
    let result = 0
    arr.reduce((previousValue, currentValue) => {
        const previousAbs = Math.abs(value - previousValue)
        const currentAbs = Math.abs(value - currentValue)
        result = previousAbs - currentAbs > 0 ? currentValue : previousValue
    })
    return result
}
function setPositon(translateXParam, translateYParam, option, el) {
    el.style.transform = ` translate(${translateXParam}px, ${translateYParam}px)`
    option.translateX = translateXParam
    option.translateY = translateYParam
}

dragDirective.install = Vue => {
    Vue.directive('drag', {
        inserted: function (el, binding) {
            // 边缘的距离
            let edge = 0
            if (binding.arg === 'edge') {
                edge = binding.value
            }
            // 盒子属性
            let boxLeft = 0
            let boxTop = 0
            let boxWidth = 0
            let boxHeight = 0

            // 触摸点距离屏幕距离
            let handLeft = 0
            let handTop = 0

            // box 移动距离
            let translateX = 0
            let translateY = 0
            let isFirst = true

            // 盒子距离左侧上方距离
            let boxOffsetLeft = 0
            let boxOffsetTop = 0

            // 屏幕宽高
            const clientWidth = document.documentElement.clientWidth
            const clientHeight = document.documentElement.clientHeight
            const option = {
                edge,
                boxLeft,
                boxTop,
                boxWidth,
                boxHeight,
                handLeft,
                handTop,
                translateX,
                translateY,
                isFirst,
                boxOffsetLeft,
                boxOffsetTop,
                clientWidth,
                clientHeight,
                binding,
            }

            const touchstartBind = touchstart.bind(this, option, el)
            const touchmoveBind = touchmove.bind(this, option, el)
            const touchendBind = touchend.bind(this, option, el)
            // 存起来unbind时 removeEventListener
            map.set(el, {
                touchstartBind,
                touchmoveBind,
                touchendBind,
            })

            el.addEventListener('touchstart', touchstartBind)
            el.addEventListener('touchmove', touchmoveBind)
            el.addEventListener('touchend', touchendBind)
        },
        unbind(el) {
            const methods = map.get(el)
            document.removeEventListener('touchstart', methods.touchstartBind)
            document.removeEventListener('touchmove', methods.touchmoveBind)
            document.removeEventListener('touchend', methods.touchendBind)
        },
    })
}
export default dragDirective
