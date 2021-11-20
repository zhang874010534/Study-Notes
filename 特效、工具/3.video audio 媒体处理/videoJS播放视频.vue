<template>
  <div class="test-videojs">
    <video id="videoPlayer" class="video-js" muted width="1000" height="1000"></video>
  </div>
</template>
<script>
// https://segmentfault.com/a/1190000038413078
import Videojs from "video.js";
import "video.js/dist/video-js.css"; // 引入video.js的css
export default {
  data() {
    return {
      nowPlayVideoUrl: "/hls-moma/openUrl/PilqitO/live.m3u8",
      options: {
        autoplay: true, // 设置自动播放
        muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        preload: "auto", // 预加载
        controls: true, // 显示播放的控件
        playbackRates: [0.5, 1, 1.25, 1.5, 2, 3], // 加上这个属性，可实现倍速播放
      },
      player:null
    }
  },

  mounted() {
    this.getVideo(this.nowPlayVideoUrl);
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose(); // Removing Players,该方法会重置videojs的内部状态并移除dom
    }
  },

  methods: {
    getVideo(nowPlayVideoUrl) {
      let that = this
      this.player = Videojs("videoPlayer", this.options, function() {
        console.log('加载完成')
        setTimeout(() => {
          // that.changeSource()
        }, 5000);
      });
      //关键代码， 动态设置src，才可实现换台操作
      this.player.src([
        {
          src: nowPlayVideoUrl,
          // type: "application/x-mpegURL" // 告诉videojs,这是一个hls流
        }
      ]);
    },
    changeSource() {
      this.getVideo('http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8')
      console.log(this.nowPlayVideoUrl, "改变了");
    }
  },
}
</script>
<style lang="scss" scoped>
.videoPlayer {
  width: 500px;
  height: 500px;
  display: inline-block;
}
</style>