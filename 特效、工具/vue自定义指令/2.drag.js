export default {
    install(Vue) {
        Vue.directive('drag', {
            inserted: function(el) {
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
                let isFirst =  true
                
                // 盒子距离左侧上方距离
                let boxOffsetLeft = 0
                let boxOffsetTop = 0

                // 屏幕宽高
                const clientWidth = document.documentElement.clientWidth
                const clientHeight = document.documentElement.clientHeight
                function touchstart(e) {
                    console.log(e,'start')
                    el.style.transition = 'all 0.1s'
                    if(isFirst) {
                        const computedStyle = getComputedStyle(el)
                        boxLeft = parseInt(computedStyle.left)
                        boxTop = parseInt(computedStyle.top)
                        boxWidth = parseInt(computedStyle.width)
                        boxHeight = parseInt(computedStyle.height)
                        isFirst = false
                    }

                    handLeft = e.touches[0].clientX
                    handTop = e.touches[0].clientY  
                }
                function touchmove(e) {
                    e.cancelBubble = true
                    boxOffsetLeft = boxLeft + translateX
                    const clientX = e.touches[0].clientX
                    const clientY = e.touches[0].clientY
                    const moveX = clientX - handLeft
                    const moveY = clientY - handTop
                    if( boxOffsetLeft >= 0 && moveX < 0) {
                        translateX += moveX
                        handLeft = clientX
                    }
                    if( boxOffsetLeft + boxWidth <= clientWidth  && moveX > 0 ) {
                        translateX += moveX
                        handLeft = clientX
                    }
                    boxOffsetTop = boxTop + translateY
                    if( boxOffsetTop >= 0 && moveY < 0) {
                        translateY += moveY
                        handTop = clientY
                    }
                    if( boxOffsetTop + boxHeight <= clientHeight && moveY > 0 ) {
                        translateY += moveY
                        handTop = clientY
                    }

                    setPositon(translateX, translateY)
                }
                function touchend(e) {
                    el.style.transition = 'all 0.3s'
                    e.cancelBubble = true
                    // 直接比较的transform的值然后进行设置
                    setPositon(compareAbs([-boxLeft, clientWidth - boxWidth - boxLeft], translateX), translateY)
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
                function setPositon(translateXParam, translateYParam) {
                    el.style.transform = ` translate(${translateXParam}px, ${translateYParam}px)`
                    translateX = translateXParam
                    translateY = translateYParam
                }
                el.addEventListener('touchstart', touchstart)
                el.addEventListener('touchmove', touchmove)
                el.addEventListener('touchend', touchend)
            },
        })
    }
}