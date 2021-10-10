<template>
  <div class="audio-wrapper">
    <img src="../images/record-audio.png" alt="" class="audio-img"
      @click="start"
    >
    <van-popup
        v-model="showAudioPopup"
        position="bottom"
        @click-overlay="cancelRecord"
        class="popup"
    >
        <div class="popup-header">
            <div class="popup-header-cancel" @click="cancelRecord">取消</div>
            <div class="popup-header-title">正在录音</div>
            <div class="popup-header-confirm" @click="stopAndUpload">确认</div>
        </div>
        <div class="audioPopup-wrapper">
            <div class="image-wrapper">
                <div class="image-wrapper-bg"
                    :style="`transform: scale(${6 / 1000 * vol + 1})`"
                ></div>
                <img src="../images/audio-mike.png" alt="" class="image-wrapper-mike">
            </div>
            <div class="audioPopup-text">
                倒计时
                <div class="count-down">{{ countdown }}</div>  
                S
            </div>
        </div>
    </van-popup>
  </div>

</template>
<script>
import Recorder from 'js-audio-recorder'
import { Popup } from "vant";
// 转成mp3
// import { convertToMp3 } from '@/util/utils.js' 
import { uploadAudioApi, sentenceRecognitionApi } from '../api.js'
export default {

  components: {
    'van-popup': Popup
  },

  props: {
      limit: {
          type: Boolean,
          default: false
      },
      limitReason: {
          type: String,
          default: '禁止点击'
      }
  },
  data() {
    return {
      showAudioPopup: false,
      recorder: {},
      vol: 0,
      countdown: 60,
      time: null // 定时器
    }
  },

  methods: {
    // 录音部分
    start() {
        if(this.limit) {
            this.$Toast(this.limitReason)
            return;
        }
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 
        if(isAndroid) {
            this.starAndroidAudio()
        }else {
            this.starNormalAudio()
        }
    },
    starAndroidAudio(){
        let that = this
        if (window.WebViewJavascriptBridge) {
            window.WebViewJavascriptBridge.callHandler('_android_record_permission', '', function (data, responseCallback) {
                console.log('进入录音的回调了')
                console.log(data, '返回的数据')
                console.log(responseCallback)
                that.starNormalAudio()
            });
        } else {
            that.starNormalAudio()
            // setTimeout(() => {
            //     this.starAndroidAudio()
            // }, 100)
        }    
    },
    starNormalAudio(){
        console.log('生成实例前')
        this.recorder = new Recorder({
            sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
            sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
            numChannels: 1, // 声道，支持 1 或 2， 默认是1
            // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
        })
        this.onprogress()
        Recorder.getPermission().then(() => {
            console.log('给权限了');
        }, (error) => {
            console.log(`${error.name} : ${error.message}`);
        });
        console.log(navigator.mediaDevices.getUserMedia, 'navigator.mediaDevices.getUserMedia')
        this.recorder.start().then(() => {
            // 开始录音
            console.log('开始录音了')
            this.countdown = 60
            this.startCountDown()
            this.showAudioPopup = true;
        }).catch((e) => {
            console.log(e,'录音开始失败')
            this.$Toast('系统不支持')
        })
    },
    // 原生录音机
    // starAndroidAudioNative(){
    //     if (window.WebViewJavascriptBridge) {
    //         window.WebViewJavascriptBridge.callHandler('_android_record', '' ,function (data, responseCallback) {
    //             console.log(data)
    //             console.log(responseCallback)
    //         });
    //     } 
    // },
    play() {
        this.recorder.play()
    },
    stopAndUpload() {
        // clearInterval(this.time)
        // this.showAudioPopup = false
        // this.recorder.stop()
        // this.recorder.downloadWAV('录音')
        let blob = this.recorder.getWAVBlob()
        let formData = new FormData()
        formData.append('file', blob, 'record.wav')
        formData.append('type', '')
        this.$axios.post(`${uploadAudioApi}?module=focus`,formData).then((res) => {
            if(res.status === 100){
                let url = res.data[0]
                this.speechRecognition(url)
                this.$emit('confirm', url)
            }else {
                this.$Toast(res.msg)
            }
        })
        // 转mp3
        // let fileReader = new FileReader()
        // fileReader.readAsArrayBuffer(blob)
        // fileReader.onload = (e) => {
        //     let mp3 = convertToMp3(new DataView(e.target.result), this.recorder)
        //     console.log(mp3)
        //     let formData = new FormData()
        //     formData.append('file', mp3);
        //     formData.append('type', '');
        //     this.$axios.post(`${uploadAudioApi}?module=focus`,formData).then((res) => {
        //         if(res.status === 100){
        //             this.uploadAudioUrl = res.data[0]
        //         }else {
        //             this.$Toast(res.msg)
        //         }
        //     })
        // }
        this.cancelRecord()
    },
    onprogress() {
        this.recorder.onprogress = (params) => {
          this.duration = params.duration
          this.vol = params.vol
          // console.log('录音时长(秒)', params.duration);
          // console.log('录音大小(字节)', params.fileSize);
          // console.log('录音音量百分比(%)', params.vol);
          // console.log('当前录音的总数据([DataView, DataView...])', params.data);
        }
    },
    cancelRecord() {
        this.showAudioPopup = false
        this.recorder.destroy().then(function() {
        });
        clearInterval(this.time)
    },
    startCountDown() {
        this.time = setInterval(() => {
            if(this.countdown == 1){
                clearInterval(this.time);
                this.stopAndUpload()
            }
            this.countdown --
        }, 1000);
    },
    speechRecognition(url) {
        this.$axios.post(`${sentenceRecognitionApi}`, {
            sourceType: 0,
            url
        }).then((res) => {
            if(res.status === 100){
                this.$emit('speechRecognition', res.data)
            }else {
                this.$Toast(res.msg)
            }
        })
    }
  }
}
</script>
<style lang="less" scoped>
div {
    box-sizing: border-box;
}
.audio-img {
  width: 72px;
  object-fit: contain;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup {
    height: 562px;
    .popup-header {
        height: 94px;
        padding: 0 32px;
        display: flex;
        align-items: center;
        &-cancel {
            font-size: 30px;
            color: #FF6C00;
            line-height: 30px;
        }
        &-title {
            flex: 1;
            text-align: center;
            font-size: 30px;
            color: #1B1C35;
            line-height: 30px;
        }
        &-confirm {
            font-size: 30px;
            color: #FF6C00;
            line-height: 30px;
        }
    }

}

.audioPopup-wrapper {
    width: 100%;
    height: 468px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .image-wrapper {
        width: 184px;
        height: 184px;
        &:extend(.flex-center);
        position: relative;
        &-bg {
            width: 100%;
            height: 100%;
            background-color: #FFF2E9;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 50%;
            transition: all 0.1s ;
        }
        &-mike {
            width: 152px;
            object-fit: contain;
            position: relative;
        }
    }
    .audioPopup-text {
        margin-top: 50px;
        display: flex;
        align-items: center;
        .count-down {
            background-color: #FFF2E9;
            color: #FF8B36;
            margin: 0 4px;
            width: 44px;
            height: 38px;
            line-height: 38px;
            text-align: center;
        }
    }
}
</style>