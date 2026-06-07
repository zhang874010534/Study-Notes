<template>
    <div class="video-component" v-show="videoUrl">
        <video
            :src="videoUrl"
            class="video"
            ref="video"
            :style="`width:${width * radio}px;height:${height * radio}px`"
        ></video>
        <div class="play-wrapper">
            <van-icon name="play" class="play-icon" color="#fff" />
        </div>
        <div class="time-cover" v-if="time">
            {{ time }}
        </div>
        <div class="video-cover" @click="fullScreen('video')"></div>
		<van-overlay :show="showOverLay" @click="clickShowOverLay">showOverLay = false
            <div class="popup__centent">
               <video
                    :src="videoUrl"
                    class="videoBig"
                    controls
                    loop
                    ref="overLayVideo"
                ></video>
				<van-icon name="cross" class="van-cross" />
            </div>
		</van-overlay>
    </div>
</template>
<script>
import { Icon, Overlay } from "vant";
import { vPopup } from 'components/control'
export default {

    components: {
        'van-icon': Icon,
        vPopup,
		'van-overlay': Overlay
    },

    props: {
        videoUrl: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 158
        },
        height: {
            type: Number,
            default: 158
        },
    },

    data() {
        return {
            time: null,
            isShowPopup: false,
			showOverLay: false
        }
    },

    computed: {
        radio() {
            const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
            let radio = htmlWidth / 750
            return radio
        }
    },

    mounted() {
        this.listenVideo()
    },
    methods: {
        fullScreen(name) {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
            if(isAndroid) {
                this.showOverLay = true
            }else {
                let video = this.$refs[name]
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.webkitSupportsFullscreen) {
                    video.webkitEnterFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
                video.play()
            }
        },
        listenVideo() {
            let video = this.$refs.video
            video.addEventListener('canplay', () => {
                let duration = Math.ceil(video.duration)
                let minute = parseInt(duration / 60)
                let second = String(duration % 60).padStart(2, '0')
                this.time = minute + ':' + second
            })
        },
        clickShowOverLay() {
            this.showOverLay = false
            this.$refs.overLayVideo.pause()
        }
    }
}
</script>
<style lang="less" scoped>
.video-component {
    position: relative;
    display: inline-block;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    .video {
        width: 158px;
        height: 158px;
        border-radius: 8px;
    }
    .play-wrapper {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #ffffff;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .time-cover {
        position: absolute;
        color: #fff;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%);
    }
    .video-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .videoBig {
        width: 100%;
    }
    .popup__centent {
        width: 100%;
        height: 100%;
		.van-cross {
			position: fixed;
			right: 20px;
			top: 20px;
			color: #fff;
			font-size: 60px;
		}
    }
}
.van-popup {
	width: 100%;
	overflow: hidden;
	height: 100% !important;
	background: #000;
}
</style>