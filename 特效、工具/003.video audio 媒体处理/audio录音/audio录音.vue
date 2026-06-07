<template>
  <div class="record-wrapper">
    <slot :showPopupMethod="showPopupMethod">
      <img src="./image/record.png" alt="" class="record-icon" @click="showPopupMethod" />
    </slot>
    <van-popup v-model:show="showPopup" position="bottom" safe-area-inset-bottom>
      <div class="popup-wrapper">
        <div class="wave-wrapper">
          <div id="wave_canvas" class="wave-canvas">
            <div class="wave-default" v-for="(item, index) in set.lineCount" :key="index"></div>
          </div>
        </div>
        <div class="audio-time"> {{ duration }}/01:00</div>
        <div class="operate-wrapper">
          <div class="operate-button" @click="clean"> 清空</div>
          <img
              src="./image/record.png"
              alt=""
              class="record-icon"
              :class="{
              'gray-icon--active': recordStatus === 'active',
              'gray-icon--end': recordFile,
            }"
              draggable="false"
              @touchstart="touchstart"
              @touchend="touchend"
          />
          <div class="operate-button" @click="finish"> 完成</div>
        </div>
        <div class="tip"> 按住说话</div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import Recorder from 'recorder-core'
import 'recorder-core/src/extensions/frequency.histogram.view'
import 'recorder-core/src/extensions/lib.fft'
import 'recorder-core/src/engine/wav'
import set from './set.js'
import { ref } from 'vue'
import { compareVersionEle, getRemainTime } from '@/utils/util'
import Axios from '@/axios/base'
import { Toast } from 'vant'
import jsBridge from '@/utils/jsBridge'

const emit = defineEmits(['success'])
let rec

const showPopup = ref(false)
const showPopupMethod = () => {
  // 授权
  const str = navigator.userAgent.toLowerCase()
  const match = str.match(/cpu iphone os (.*) like mac os/)
  const isMiniApp = sessionStorage.getItem('isMiniApp')
  // ios
  if (match) {
    const iosVersion = match[1].replace(/_/g, '.')
    // 大于目标版本
    if (compareVersionEle(iosVersion, '14.3')) {
      h5Permission()
    } else {
      if (isMiniApp) {
        console.log('小程序的录音还没做')
      } else {
        console.log('原生录音方法')
        jsBridge.call.record()
        jsBridge.registry.record(res => {
          console.log(res)
          recognize(res)
        })
      }
    }
  } else {
    // 安卓
    h5Permission()
  }
}

// h5 授权
const h5Permission = () => {
  rec = Recorder({
    type: 'wav',
    sampleRate: 16000,
    bitRate: 16,
    onProcess(buffers, powerLevel, bufferDuration, bufferSampleRate) {
      wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate) //输入音频数据，更新显示波形
      const timeObj = getRemainTime(Math.ceil(bufferDuration / 1000))
      duration.value = timeObj.minute + ':' + timeObj.second
      if (Number(timeObj.minute) >= 1) {
        touchend()
      }
    },
  })
  rec.open(
      function () {
        console.log('已打开录音，可以点击开始了')
        showPopup.value = true
      },
      function (msg, isUserNotAllow) {
        console.log(msg, isUserNotAllow, '无法录音')
        Toast('请在手机设置-应用-权限管理中开启录音权限')
      }
  )
}
// 录音状态
const recordStatus = ref<'default' | 'active'>('default')

const recordFile = ref(null)
const touchstart = e => {
  e.preventDefault()
  if (!recordFile.value) {
    startRecord()
  }
}
const touchend = () => {
  console.log('touchend')
  rec &&
  rec.stop(blob => {
    recordFile.value = blob
    console.log(recordFile.value)
    // rec.close() //释放录音资源
    // rec = null
  })
}

let wave
// 时间
const duration = ref('00:00')

const startRecord = () => {
  const str = navigator.userAgent.toLowerCase()
  const match = str.match(/cpu iphone os (.*) like mac os/)
  const isMiniApp = sessionStorage.getItem('isMiniApp')
  // ios
  if (match) {
    const iosVersion = match[1].replace(/_/g, '.')
    // 大于目标版本
    if (compareVersionEle(iosVersion, '14.3')) {
      h5Record()
    } else {
      if (isMiniApp) {
        console.log('小程序的录音还没做')
      } else {
        console.log('原生录音方法')
        jsBridge.call.record()
        jsBridge.registry.record(res => {
          console.log(res)
          recognize(res)
        })
      }
    }
  } else {
    // 安卓
    h5Record()
    //
    // if (isMiniApp) {
    // } else {
    //   console.log('请求权限')
    //   // jsBridge.call.getAndroidRecordPermission(() => {
    //   //   h5Record()
    //   // })
    // }
  }
}
const h5Record = () => {
  recordFile.value = null
  wave = Recorder.FrequencyHistogramView(set)
  rec.start()
  recordStatus.value = 'active'
}
// const audioCtx = new window.AudioContext();
// const analyser = audioCtx.createAnalyser();
// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);
// analyser.fftSize = 4096;

// 清空
const clean = () => {
  recordFile.value = null
  recordStatus.value = 'default'
  duration.value = '00:00'
}
// 完成
const finish = () => {
  console.log(recordFile.value)
  const file = recordFile.value
  if (file) {
    const formData = new FormData()
    formData.append('file', file, '.wav')
    let origin = import.meta.env.DEV ? API_CONFIG.origin : window.origin
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '0%',
    })
    Axios({
      method: 'post',
      url: '/api/workorder/upload',
      data: formData,
      onUploadProgress(progressEvent) {
        if (progressEvent.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          toast.message = '上传中' + Math.ceil((progressEvent.loaded / progressEvent.total) * 100) + '%'
        }
      },
    }).then(res => {
      toast.clear()
      const url = origin + '/files/' + res.fileKey
      recognize(url)
    })
  } else {
    Toast('长按开始录音')
  }
}

// 语音识别
const recognize = url => {
  const toast = Toast.loading({
    duration: 0,
    message: '识别中...',
  })
  Axios({
    method: 'post',
    url: 'api/workorder/sentenceRecognition',
    data: {
      sourceType: 0,
      url,
    },
  }).then(res => {
    toast.clear()
    showPopup.value = false
    clean()
    rec.close()
    emit('success', {
      result: res.result,
      url: url,
    })
  })
}
</script>
