import { APP_ID } from '@/apiConstant.js'
import axios from 'axios'
export function getPlatformInfo() {
    var u = navigator.userAgent;
    var ua = navigator.userAgent.toLowerCase();
    var platformInfo = {
        origionPlatform: 'pc',
        platform: 'pc',
        system: 'others',
        browser: 'chrome',
    }
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        platformInfo.system = 'android'
    }
    if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        platformInfo.system = 'ios'
    }

    if (isMobile()) {
        platformInfo.origionPlatform = 'mobile'
    }

    if (ua.match(/WeiBo/i) == 'weibo') {
        platformInfo.browser = 'weibo'
    }

    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        platformInfo.browser = 'wx'
    }

    if (ua.match(/chaos/i) == 'chaos') {
        platformInfo.browser = 'chaos'
    }
    
    platformInfo.clientWidth = document && document.documentElement ? document.documentElement.clientWidth : window.innerWidth
    platformInfo.clientHeight = document && document.documentElement ? document.documentElement.clientHeight : window.innerHeight
    //vh在qq等浏览器因为自定义的底部条导致高度不符合预期
    platformInfo.docOffsetHeight = document.documentElement.offsetHeight

    platformInfo.platform = platformInfo.origionPlatform
    if (platformInfo.origionPlatform == 'pc') {
        platformInfo.platform = platformInfo.clientWidth < 600 ? 'mobile' : 'pc'
    }
    
    return platformInfo

    function isMobile() {
        var u = navigator.userAgent.toLowerCase();
        if (u.match(/ipad/i) == 'ipad'
            || u.match(/iphone/i) == 'iphone'
            || u.match(/iphone os/i) == 'iphone os'
            || u.match(/midp/i) == 'midp'
            || u.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
            || u.match(/ucweb/i) == 'ucweb'
            || u.match(/mzbrowser/i) == 'mzbrowser'
            || u.match(/android/i) == 'android'
            || u.match(/windows ce/i) == 'windows ce'
            || u.match(/windows mobile/i) == 'windows mobile'
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export const cookieFunction = {
    set(key, value, expire, path = '/') {
        //默认cookie为七天之后过期 3s 4m 5h 7d 秒 分 时 天
        if (!expire) expire = '7d';

        expire = expire.toLowerCase();
        var expireDate = new Date();
        var num = parseInt(expire);

        if (expire.indexOf('d') !== -1) {
            expireDate.setDate(expireDate.getDate() + num);
        } else if (expire.indexOf('h') !== -1) {
            expireDate.setHours(expireDate.getHours() + num);
        } else if (expire.indexOf('m') !== -1) {
            expireDate.setMinutes(expireDate.getMinutes() + num);
        } else if (expire.indexOf('s') !== -1) {
            expireDate.setSeconds(expireDate.getSeconds() + num);
        } else {
            expireDate.setDate(expireDate.getDate() + num);
        }

        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }

        value = escape(value);
        document.cookie = key + '=' + value + ';expires=' + expireDate.toString() + ';path=' + path;
    },
    get(name) {
        var reg = new RegExp('(^| )'+name+'=([^;]*)(;|$)');
        var arr = document.cookie.match(reg)
        return arr ? arr[2] : null
    },
    delete(name) {
        var val = this.get(name);
        if (val != null) this.set(name, '', '0s')
    },
}

export function wxLogin() {
    const hrefArr = window.location.href.split('?')
    let redirect_uri = hrefArr[0]
    let query = hrefArr[1]
    let newQuery = []
    query && query.split('&').forEach(ele => {
        if (ele.indexOf('code=') == -1) {
            newQuery.push(ele)
        }
    })
    
    if (newQuery.length > 0) {
        redirect_uri += '?' + newQuery.join('&')
    }
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=6026572c46a72b15bc2270c0d9d1733e&connect_redirect=1#wechat_redirect`
}

export async function getImg(url) {
    const res = await fetch(url, {
        method: 'get',
        responseType: 'blob'
    })
    const blobObj = await res.blob()
    return window.URL.createObjectURL(blobObj)
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

export function scrollEaseout(fromValue, toValue = 0, rate = 2, callback = null) {
    if (fromValue == toValue || typeof fromValue != 'number') return

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = fn => {
            setTimeout(fn, 17)
        }
    }

    let step = () => {
        const distance = toValue - fromValue
        fromValue = fromValue + distance / rate

        if (Math.abs(distance) < 1) {
            callback && callback(toValue, true)
        } else {
            callback && callback(fromValue, false)
            requestAnimationFrame(step)
        }
    }

    step()
}

export function setTitle(doc, title) {
    doc.title = title;
    //app内通过iframe触发pageload来通知app
    var tmp = doc.createElement('iframe');
    tmp.src = '';
    tmp.style.display = 'none';
    tmp.onload = function() {
        setTimeout(function() {
            tmp.remove();
        }, 17)
    }
    doc.body.appendChild(tmp);
}

//部分ios机型使用padStart补0会出现null
export function hdPadStart(str, len, padStr) {
    if (Object.prototype.toString.call(str) !== "[object String]" || Object.prototype.toString.call(padStr) !== "[object String]") throw new TypeError('str or padStr must be String')
    if (str.length >= len) {
        return str
    }
    let tmp = str.padStart(len, padStr)
    if (tmp.indexOf('null') != -1) {
        tmp = str
        for(let i = len - str.length;i > 0;i--) {
            tmp = padStr + tmp
        }
    }
    return tmp
}

export function debounce(method, duration) {
    var begin = new Date().getTime();
    return function() {
        var context = this,
            args = arguments,
            current = new Date().getTime();
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        }
    }
}

export function throttle(method, delay, duration) {
    var timer = null,
        begin = new Date().getTime();
    return function() {
        var context = this,
            args = arguments,
            current = new Date().getTime();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function() {
                method.apply(context, args);
            }, delay);
        }
    }
}

export function getDocumentScrollTop(doc) {
    return doc.documentElement.scrollTop || doc.body.scrollTop || 0
}

export function getDocumentScrollLeft(doc) {
    return doc.documentElement.scrollLeft || doc.body.scrollLeft || 0
}

export function setDocumentScrollTop(doc, val) {
    doc.documentElement.scrollTop = val
    doc.body.scrollTop = val
}

export function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export function download({url, name = '', success, next, fail, complete}) {
    axios({
        url: url,
        responseType: 'blob',
        onDownloadProgress (progress) {
            next && next(progress)
        }
    }).then(response => {
        
        const blob = response.data
        let downloadUrl = null
        const URL = window.URL || window.webkitURL
        downloadUrl = URL.createObjectURL(blob)
        downloadFile({
            file: downloadUrl,
            name: name,
        })
        downloadUrl && URL.revokeObjectURL(downloadUrl)

        success && success(response.data)
        complete && complete(response.data)
    }).catch(error => {
        fail && fail(error)
        complete && complete(error)
    })
    
}

export function downloadFile({file, name = ''}) {
    const eleLink = document.createElement('a')
    eleLink.setAttribute('href', file)
    eleLink.setAttribute('download', name)
    eleLink.setAttribute('target', '_blank')
    eleLink.style.display = 'none'
    
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

export function toElement(selector, rate = 3) {
    const ele = document.querySelector(selector)
    if (ele) {
        const start = parseInt(getDocumentScrollTop(document))
        const end = start + ele.getBoundingClientRect().top
        scrollEaseout(start, end, rate, val => {
            setDocumentScrollTop(document, val)
        })
    }
}

export function setShareInfo(shareTitle, shareImg, shareLink, shareDesc) {
    window.wx.ready(function() {
        window.wx.updateAppMessageShareData({ 
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            success: function () {
            // 设置成功
            }
        })
        window.wx.updateTimelineShareData({ 
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            success: function () {
            // 设置成功
            }
        })
        window.wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareLink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
        });
    });
}

export function formatNumber(num) {
    if (!num || num < 1000) {
        return num
    }
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
export function getDayRange(date, dayInterval) {
    let tmp = [];
  
    if (date instanceof window.Date && typeof dayInterval == 'number') {
      const day = formatTime(date).slice(0, 10);
      const anotherDay = formatTime(
        new Date(date.getTime() + 3600 * 24 * dayInterval * 1000)
      ).slice(0, 10);
      tmp = dayInterval > 0 ? [day, anotherDay] : [anotherDay, day];
    }
  
    return tmp;
}
  
export function getElementPath(el) {
    var path = '',
        parent = el.parentNode,
        element = el;

    while(parent) {
        var total = 1,
            index = 1,
            currentStr = '',
            siblings = parent.childNodes;

        for(var i = 0, len = siblings.length; i < len; i++) {
            var sibling = siblings[i];
            if (sibling == element) {
                currentStr = '/' + sibling.nodeName.toLowerCase()
                index = total
            } else if (sibling.nodeType == 1 && sibling.nodeName == element.nodeName) {
                total++
            }
        }

        var indexStr = total > 1 ? '[' + index + ']' : ''
        path = currentStr + indexStr + path;
        element = parent
        parent = parent.parentNode;
    }
    return path;
}

export function copyText(text){
    let dom = document.createElement('input')
    document.body.appendChild(dom)
    dom.value = text
    dom.select()
    document.execCommand('Copy')
    document.body.removeChild(dom)
}
export { hotLaunch } from './launchApp.js'