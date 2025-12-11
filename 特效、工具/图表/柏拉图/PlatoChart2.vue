<template>
  <div class="chart-wrapper" :style="{'height':chartHeight}">
    <div ref="chart" class="chart"></div>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="90%" top="5vh">
      <div ref="chartDio" class="chartDio"></div>
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import Color from 'color'
import _ from 'lodash'
export default {
  props: {
    chartHeight: {
      type: String,
      default: '400px',
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    record: {
      type: Object,
      default: () => {
        return {}
      },
    },
    title: {
      type: String,
      default: '柏拉图缺陷分析',
    },
    showdashed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      myChart: {},
      chartDataList: [],
      option: {},
      dialogVisible: false,
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeEChart)
  },
  watch: {
    list (newVal) {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      const myChart = echarts.init(this.$refs.chart)
      this.myChart = myChart
      const initOptions = {
        xAxis: {
          data: []
        },
        series: [
          {
            data: []
          },
          {
            data: []
          }
        ]
      }
      this.list.slice(0, this.list.length - 1).forEach(item => {
        if (item.contentName) {
          initOptions.xAxis.data.push(item.contentName)
        } else {
          initOptions.xAxis.data.push(item.checkSheetName)
        }
        initOptions.series[0].data.push(item.defectNo)
        initOptions.series[1].data.push(item.addPercentageInt)
      })
      const option = {
        color: ['#0F9096', '#73C0DE'],
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            let htmlStr = ''
            for (let i = 0; i < params.length; i++) {
              const param = params[i]
              if (i === 0) {
                htmlStr += param.name + '<br/>' // x轴的名称
              }
              if (param.seriesName === '累计百分比') {
                htmlStr += param.marker + param.seriesName + '：' + param.value + '%' + '<br/>'
              } else {
                htmlStr += param.marker + param.seriesName + '：' + param.value + '<br/>'
              }
            }
            return htmlStr
          }
        },
        toolbox: {
          feature: {
            myFull: {
              show: 'true',
              title: '放大',
              icon: 'path://M896 128v288c0 19.2-12.8 32-32 32s-32-12.8-32-32V236.8L633.6 441.6c-6.4 6.4-19.2 6.4-25.6 6.4s-19.2 0-25.6-6.4c-6.4-12.8-6.4-38.4 0-51.2L787.2 192H608c-19.2 0-32-12.8-32-32s12.8-32 32-32H896zM441.6 582.4c-12.8-6.4-38.4-12.8-51.2 0L192 787.2V608c0-19.2-12.8-32-32-32s-32 12.8-32 32V896h288c19.2 0 32-12.8 32-32s-12.8-32-32-32H236.8l204.8-198.4c6.4-12.8 6.4-38.4 0-51.2zM448 160c0-19.2-12.8-32-32-32H128v288c0 19.2 12.8 32 32 32s32-12.8 32-32V236.8l198.4 198.4c6.4 12.8 19.2 12.8 25.6 12.8s19.2 0 25.6-6.4c6.4-12.8 6.4-38.4 0-51.2L236.8 192h179.2c19.2 0 32-12.8 32-32zM864 576c-19.2 0-32 12.8-32 32v179.2L633.6 588.8c-12.8-12.8-38.4-12.8-51.2 0-6.4 12.8-6.4 32 0 44.8l198.4 198.4H608c-19.2 0-32 12.8-32 32s12.8 32 32 32H896V608c0-19.2-12.8-32-32-32z',
              onclick: (e) => {
                this.dialogVisible = true
                this.$nextTick(() => {
                  const chart = echarts.init(this.$refs.chartDio)
                  let option = _.cloneDeep(this.option)
                  option.toolbox = { }
                  chart.setOption(option)
                })
              }
            },
            dataView: { show: true, readOnly: false },
            saveAsImage: {
              show: true,
              pixelRatio: 2,
            },
          }
        },
        legend: {
          data: ['缺陷数目', '累计百分比']
        },
        grid: {
          // bottom: 100,
        },
        xAxis: [
          {
            type: 'category',
            data: initOptions.xAxis.data,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
              formatter: function (value, index) {
                if (value.length > 7) {
                  return value.slice(0, 7) + '···'
                } else {
                  return value
                }
              }
            },
          },
          {
            type: 'category',
            show: false,
            boundaryGap: false,
            data: [''].concat(initOptions.xAxis.data)
          },
          {
            type: 'value',
            // name: "新增的x轴",
            min: 0,
            max: 100,
            show: false, // 不显示这个轴，只是用于定位垂直线
            axisPointer: {
              show: false, // 隐藏轴指针
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '缺陷数目',
            minInterval: 1,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false,
            },
            max: this.list[this.list.length - 1] ? this.list[this.list.length - 1].defectNo : 0,
          },
          {
            type: 'value',
            name: '累计百分比',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}%'
            },
            splitLine: { // 分隔线（网格线）
              show: !this.showdashed // 设置为 false 隐藏网格线
            }
          }
        ],
        series: [
          {
            name: '缺陷数目',
            type: 'bar',
            data: initOptions.series[0].data,
            barCategoryGap: 2,
            itemStyle: {
              // 随机显示
              // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
              color: function (params) {
                var colorList = ['#B4E7C2', '#FCAC5D', '#72A8BF', '#4B6994', '#94D1B5', '#F27B7F', '#F5E375', '#97C5B5', '#6896D9', '#FFCA3D', '#62AB92', '#9FC0F0', '#EC82C1', '#78DF88', '#AA95E3']
                if (colorList[params.dataIndex]) {
                  return colorList[params.dataIndex]
                } else {
                  return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
                }
              }
            },
          },
          {
            name: '累计百分比',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            tooltip: {
              // valueFormatter: function (value) {
              //   return value + '%'
              // }
            },
            label: {
              show: true,
              position: 'bottom',
              formatter: '{c}%'
            },
            data: [0].concat(initOptions.series[1].data)
          },
        ]
      }
      if (initOptions.xAxis.data.length > 20) {
        option.dataZoom = [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            brushSelect: false,
          },
        ]
      }
      // 计算交点并添加垂直虚线
      const intersectionX = this.findIntersection([0].concat(initOptions.series[1].data), 80)
      if (intersectionX !== -1 && this.showdashed) {
        option.series.push({
          name: '',
          type: 'line', // 折线
          xAxisIndex: 2, // 指定使用第二个x轴（数值轴）
          yAxisIndex: 1,
          markLine: {
            symbol: 'none', // 不显示数据点的标记
            lineStyle: {
              type: 'dashed',
              color: 'red',
              width: 2
            },
            precision: 0.1,
            label: {
              formatter: '',
              position: 'insideEndTop'
            },
            data: [
              [
                {coord: [intersectionX, 0]},
                {coord: [intersectionX, 80]}
              ],
              [
                {coord: [intersectionX, 80]},
                {coord: [100, 80]}
              ],
            ],
          }
        })
      }
      this.option = option
      myChart.setOption(option)
      window.addEventListener('resize', this.resizeEChart)
      // myChart.on('finished', () => {
      //   this.record.echartUrl = this.myChart.getDataURL({
      //     excludeComponents: ['toolbox']
      //   })
      // })
    },
    findIntersection (data, threshold) {
      for (let i = 1; i < data.length; i++) {
        if (data[i - 1] < threshold && data[i] >= threshold) {
          // 线性插值计算精确交点位置
          const ratio = (threshold - data[i - 1]) / (data[i] - data[i - 1])
          return (i - 1 + ratio) / (data.length - 1) * 100
        }
      }
      return -1 // 未找到交点
    },
    resizeEChart () {
      this.myChart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 400px;
}
.chart {
  width: 100%;
  height: 100%;
}
.chartDio {
  width: 100%;
  height: 100%;
}
/deep/ .el-dialog__body {
  padding: 0px;
  height: 80vh;
}

/deep/ .el-dialog__header {
  background: #fff;
  padding: 15px;
}
</style>
