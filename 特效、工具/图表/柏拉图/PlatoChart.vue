<template>
  <div class="chart-wrapper">
    <div ref="chart" class="chart"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import Color from 'color'
export default {
  props: {
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
    }
  },
  data () {
    return {
      myChart: {},
      chartDataList: [],
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
      const option = {
        color: ['#0F9096', '#73C0DE'],
        title: {
          text: '柏拉图缺陷分析'
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
            dataView: { show: true, readOnly: false },
            saveAsImage: {
              show: true,
              pixelRatio: 2,
            }
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
            }
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

              // 定制显示（按顺序）
              // color: function (params) {
              //   var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
              //   return colorList[params.dataIndex]
              // }
              // color: function (params) {
              //   return Color(`hsl(182.67deg ${81.82 + params.dataIndex * 5}% 32.35%)`).hex()
              // }
              // color: function (params) {
              //   return Color('#0f9096').saturate(0.99 * params.dataIndex).hex()
              // }
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
            data: [0].concat(initOptions.series[1].data),
          },
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', this.resizeEChart)
      // myChart.on('finished', () => {
      //   this.record.echartUrl = this.myChart.getDataURL({
      //     excludeComponents: ['toolbox']
      //   })
      // })
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
</style>
