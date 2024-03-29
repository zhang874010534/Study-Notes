import axios from 'axios'

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

export function formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
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

// 下载文件
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

// 获取日期范围
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

// 复制文字
export function copyText(text){
    let dom = document.createElement('input')
    document.body.appendChild(dom)
    dom.value = text
    dom.select()
    document.execCommand('Copy')
    document.body.removeChild(dom)
}

// 十六进制转RGBA或者RGB
export function colorRgb(sColor,opacity){
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
        }
		if(opacity){
			return "RGBA(" + sColorChange.join(",") + "," + opacity + ")";
		}else{
			return "RGB(" + sColorChange.join(",") + ")";
		}
    }
    return sColor;
};

export function handleFileChange(e: Event){
    const currentTarget = e.target as HTMLInputElement
    if (currentTarget.files) {
        const formData = new FormData()
        formData.append('file',currentTarget.files[0])
        axios.post('/url',formData,{
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then((res) => {
            console.log(res)
        })
    }
}
// 版本号判断
export const compareVersionEle = (currVersion, targetVerison) => {
  if (!currVersion || !targetVerison) return false;
  const curr = currVersion.split('.');
  const target = targetVerison.split('.');
  for (let i = 0; i < curr.length; i++) {
      if (parseInt(curr[i]) > parseInt(target[i])) {
          return true
      }
      if (parseInt(curr[i]) < parseInt(target[i])) {
          return false
      }
      //相等继续
      //parseInt(curr[i]) == parseInt(target[i])  continue
  }
  return true
}

function padStart(data) {
  return String(data).padStart(2, '0')
}
// 获取时间00:00这种格式
export const getRemainTime = (time: number) => {
  // const second = '00'
  // const minute = padStart(String(time % 60))
  // const hour = padStart(Math.floor(time / 60) % 24)
  // const day = Math.floor(Math.floor(time / 60) / 24)
  time = Math.abs(time)
  let temp = 0
  const second = padStart(time % 60)
  temp = Math.floor(time / 60)
  const minute = padStart(temp % 60)
  temp = Math.floor(temp / 60)
  const hour = padStart(temp % 24)
  const day = Math.floor(temp / 24)
  return {
    day,
    hour,
    minute,
    second,
  }
}

// 取文件
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

    success && success(blob)
    complete && complete(blob)
  }).catch(error => {
    fail && fail(error)
    complete && complete(error)
  })
}

// 分配参数
export const assignParams = (target, source) => {
  for (const targetKey in target) {
    const element = source[targetKey]
    const type = Object.prototype.toString.call(element)
    if (!(type === '[object Null]' || type === '[object Undefined]')) {
      target[targetKey] = element
    }
  }
}

// base64 转为Blob
export const base64ToBlob = (base64Data) => {
    const dataArr = base64Data.split(',') // 根据,来分隔

    const imageType = dataArr[0].match(/:(.*?);/)[1] // 获取文件类型。使用正则捕获 image/jpeg

    const textData = window.atob(dataArr[1]) // 使用atob() 将base64 转为文本文件
    const arrayBuffer = new ArrayBuffer(textData.length) // 创建一个二进制数据缓冲区，可以理解为一个数组
    const uint8Array = new Uint8Array(arrayBuffer) // 创建一个类型化数组对象，可以理解为上面的数组的成员，给这个对象赋值就会放到上面的数组中。
    for (let i = 0; i < textData.length; i++) {
        uint8Array[i] = textData.charCodeAt(i) // 将文本文件转为UTF-16的ASCII, 放到类型化数组对象中
    }

    return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)]; // 返回两个值，一个Blob对象，一个图片格式（如jpeg）
}
// 转为formData
export const toFormData = (base64Data) => {
    const [imageBlob, imageType] = base64ToBlob(base64Data)// 获取处理好的Blob 和文件类型
    const formData = new FormData()
    formData.append('file', imageBlob, `${Date.now()}.${imageType}`) // 添加到表单，传入文件名
    return formData
}

axios({
    method: 'post',
    url: '', // 你的文件服务器地址
    data: toFormData(val),
    timeout: 60000,
    headers: {
        'Content-Type': 'multipart/form-data', // 请求头要设置为 form-data
        'Cache-Control': 'no-cache',
    },
})
