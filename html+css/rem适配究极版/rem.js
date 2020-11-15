(function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
            setRemUnit()
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();
     // set 1rem = viewWidth / 7.5 方便计算
    function setRemUnit () {
        var scaleFactor = 1
        var ua = navigator.userAgent.toLowerCase();
        //部分浏览器字体会跟随字体设置，需重新调整
        if (document.body && (
            ua.match(/MicroMessenger/i) == 'micromessenger'
            || ua.match(/ucbrowser/i) == 'ucbrowser'
        )) {
            var $dom = document.createElement('div');
            $dom.style = 'font-size: 12px';
            document.body.appendChild($dom);
    
            var scaledFontSize = parseFloat(window.getComputedStyle($dom, null).getPropertyValue('font-size'));
            document.body.removeChild($dom);
            scaleFactor = 12 / scaledFontSize;
        }
        var rem = docEl.clientWidth * scaleFactor / 7.5
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
            //ios缓存刷新
            window.location.reload()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))