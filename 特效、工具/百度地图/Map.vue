<template>
  <div>
    <div id="allmap">1234</div>
  </div>
</template>
<script>
export default {
  mounted() {
    navigator.geolocation.getCurrentPosition(function(cs){
        console.log(cs)
    });
    function loadJScript() {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src =
        'http://api.map.baidu.com/getscript?v=3.0&ak=HY7eDVLinE7dQvMMVIS2xGwZptkMQF1b'
      script.onload = () => {
        init()
      }
      document.body.appendChild(script)
    }
    function init() {
      var map = new BMap.Map('allmap') // 创建Map实例
      map.centerAndZoom(new BMap.Point(120.21201, 30.2084), 11) // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      )
      map.setCurrentCity('杭州市') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    }
    window.onload = loadJScript // 异步加载地图
  },
}
</script>
<style lang="scss" scoped>
#allmap {
  width: 100vw;
  height: 100vh;
  margin: 0;
  font-family: '微软雅黑';
}
</style>
