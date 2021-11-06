<!--OfflineHandle.vue-->
<template>
  <div v-show="mask" class="offline-mask">
  </div>
</template>

<script>
// https://segmentfault.com/a/1190000022203425
export default {
  name: "offline-handle",
  props: {
    offlineTitle: {
      type: String,
      default: "网络已断开，请检查网络连接。",
    },
    onlineTitle: {
      type: String,
      default: "网络已连接",
    },
    desc: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 4.5,
    },
  },
  data() {
    return {
      mask: false,
    };
  },
  mounted() {
    window.addEventListener("offline", this.eventHandle);
    window.addEventListener("online", this.eventHandle);
  },
  beforeDestroy() {
    window.removeEventListener("offline", this.eventHandle);
    window.removeEventListener("online", this.eventHandle);
  },
  methods: {
    eventHandle(event)  {
      console.log(event)
      console.log(this.$WToast)
      if(event.type === "offline") {
        this.$WToast.offline(this.offlineTitle)   
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>