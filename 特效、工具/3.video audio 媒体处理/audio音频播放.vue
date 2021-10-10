<template>
  <div class="audio-item" @click="audioPlay('audio')">
        <audio :src="audioUrl" ref="audio" v-show="false"></audio>
        <div class="volume-wrapper" :class="{ 'active': audioStatus}">
            <img src="../images/report-volume.png" alt="" class="img">
        </div>
        <div class="audio-text" >{{ duration }}s</div>
  </div>
</template>

<script>
export default {

    props: {
        audioUrl: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            duration: 0,
            audioStatus: false
        }
    },

    mounted() {
        this.initListener()
    },
    methods: {
        audioPlay(name) {
            let audio = this.$refs[name]
            if(audio.paused) {
                audio.play()
                this.audioStatus = true
            }else {
                audio.pause()
                this.audioStatus = false
            }
           
        },
        initListener() {
            let audio = this.$refs.audio
            
            // Preloading
            // If you set the preload attribute to auto, it tells Safari you want the specified media file to start buffering immediately, making it more likely that it will begin promptly and play through smoothly when the user plays it.
            // If you have multiple movies on the page, you should set the preload attribute to none, to prevent all the movies from downloading at once.
            // Safari does not currently support the metadata setting.
            // Note: The preload attribute is supported in Safari 5.0 and later. Safari on iOS never preloads.
            // 在IOS中不会自动加载音视频，所以oncanplay事件不会自动执行；在 pc 端和 android 端，系统会自动加载音视频，所以oncanplay会自动被执行
            // 所以不能用canplay 用 durationchange
            // audio.addEventListener('canplay', (e) => {
            //     console.log(e.target.duratin)
            //     this.duration = parseInt(e.target.duration)
            // })
            audio.addEventListener('durationchange', (e) => {
                this.duration = parseInt(e.target.duration)
            })
            audio.addEventListener('timeupdate', (e) => {
                this.duration = parseInt(e.target.currentTime)
            })
            audio.addEventListener('ended', (e) => {
                this.audioStatus = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.audio-item {
    width: 264px;
    height: 80px;
    background: #F1F1F1;
    border-radius: 8px;
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;
    .volume-wrapper {
        position: absolute;
        left: 12px;
        width: 44px;
        overflow: hidden;
        .img {
            width: 44px;
            object-fit: contain;
        }
        &.active {
            animation: activeVolume 1s infinite;
        }
    }
    .audio-text {
        margin-left: 67px;
        color: #5E5E66
    }
}
@keyframes activeVolume {
    0% {
        width: 0;
    }
    100% {
        width: 44px;
    }
}
</style>