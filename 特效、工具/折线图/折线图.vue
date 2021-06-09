<template>
  <div>
    <div class="chart-box">
      <div id="chart">
        <canvas></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { DAY, WEEK, MONTH, DAY_TEXT } from '@/assets/js/interval.js';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter'
import { formatNumber } from 'utils/util.js';
export default {
  name: 'hdLineChart',

  props: {
    chartXAxis: {
      type: Array,
      default: function() {
        return [];
      }
    },
    chartSeries: {
      type: Array,
      default: function() {
        return [];
      }
    },
    initOption: {
      type: Object,
      default: function() {
        return {};
      }
    },
    range: {
      type: Array,
      default: function() {
        return [];
      }
    },
    interval: {
      type: String,
      default: DAY
    },
    showRange: {
      type: Boolean,
      default: true
    },
    showInterval: {
      type: Boolean,
      default: true
    },
    pickerOptions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    operationData: {
      type: Array
    }
  },

  data() {
    return {
      myChart: null,
      intervalRange: {
        day: '日',
        week: '周',
        month: '月'
      },

      weekend: false,
      friday: false
    };
  },

  computed: {
    chartRange: {
      get() {
        return this.range;
      },
      set(val) {
        this.$emit('change-range', val);
      }
    },
    chartInterval() {
      return this.interval;
    }
  },

  watch: {
    chartSeries: {
      handler() {
        this.setMyChart();
      },
      immediate: true
    }
  },

  mounted() {
    const chatEle = this.$el.querySelector('#chart');
    this.myChart = echarts.init(chatEle);
    this.setMyChart();
  },

  methods: {
    setMyChart() {
      if (!this.myChart) {
        return;
      }

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            z: 0
          },
          backgroundColor: '#FFF8F1',
          borderColor: 'rgba(228, 163, 0, 0.3)',
          borderWidth: 3,
          color: '#333333',
          formatter: (params) => {
            const firstItem = params[0];
            let result = '';
            if (firstItem) {
              let title = firstItem.name;
              if (this.chartInterval === DAY) {
                const dayIndex = new Date(
                  firstItem.name.replace(/-/g, '/') + ' 00:00:00'
                ).getDay();
                title = `${firstItem.name.slice(5).replace(/-/, '月')}（周${
                  DAY_TEXT[dayIndex]
                }）`;
              }
              if (this.chartInterval === WEEK) {
                title += '周';
              }
              if (this.chartInterval === MONTH) {
                title += '月';
              }
              result += `<span style="font-weight: bold;font-size: 13px;">${title}</span><br />`;
            }
            params.forEach(function(item) {
              result +=
                item.marker +
                ' ' +
                item.seriesName +
                '： ' +
                formatNumber(item.value) +
                '<br />';
            });
            return result;
            
          },
          textStyle: {
            color: '#333333',
            fontSize: 12
          },
          padding: 10
        },
        grid: {
          show: true,
          borderColor: '#D4CFC3',
          left: 36,
          right: 36,
          backgroundColor: '#FFFFFF',
          bottom: 36,
          top: 36,
          containLabel: false
        },
        legend: {
          icon: 'circle',
          top: '3%',
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#333333',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [...this.chartXAxis],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            axisLabel: {
              color: '#999999',
              fontSize: 11,
              margin: 12,
              rotate: this.chartXAxis.length > 40 ? 20 : 0,
              align: 'center',
              formatter: (value) => {
                let tmp = value;
                if (this.chartInterval === DAY) {
                  tmp = value.slice(5).replace(/-/, '月');
                }
                if (this.chartInterval === WEEK) {
                  tmp += '周';
                }
                if (this.chartInterval === MONTH) {
                  tmp += '月';
                }
                return tmp;
              },
              interval: (index) => {
                if(this.chartXAxis.length > 50){
                  let split=Math.floor(this.chartXAxis.length / 10)
                  return index % split == 1;
                }
                return this.chartXAxis.length < 6 ? true : index % 2 === 1;
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              formatter: (value) => {
                let tmp = formatNumber(value);
                const rate = value > 0 ? 1 : -1;
                const num = Math.abs(value);

                if (num >= 1000) {
                  tmp =
                    Number.parseFloat(
                      Number.parseFloat(num / 1000).toFixed(2)
                    ) *
                      rate +
                    'K';
                }

                if (num >= 10000) {
                  tmp =
                    Number.parseFloat(
                      Number.parseFloat(num / 10000).toFixed(2)
                    ) *
                      rate +
                    'W';
                }

                return tmp;
              },
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          }
        ],
        series: [],
        animation: false,
        animationDuration: 0,
        animationDurationUpdate: 0
      };
      this.myChart.clear();
      this.myChart.setOption(option, false, true);
      this.myChart.setOption(this.initOption, false, true);
      this.myChart.setOption({
        series: this.chartSeries
      });
      // legend被点击事件
      this.myChart.on('legendselectchanged',(params)=>{
        this.$emit('legendChange',params)
      })
    },
    changeInterval(interval) {
      this.$emit('change-interval', interval);
    },
    handleTime(week) {
      switch (week) {
        case 0:
          return '周日';
        case 1:
          return '周一';
        case 2:
          return '周二';
        case 3:
          return '周三';
        case 4:
          return '周四';
        case 5:
          return '周五';
        case 6:
          return '周六';
        default:
          break;
      }
    },
    handleTimeColor(key){
      return  new Date(key.toString()).getDay()
    }
  }
};
</script>

<style scoped lang="stylus">
.flex-row {
  width: 848px;
}

.flex-center {
  margin-bottom: 10px;
}

.chart-box {
  background-color: #FDFAF7;
  border: 1px solid #CFCFCF;
  height: 223px;
  position: relative;
  width: 848px;

  #chart {
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 3;
  }
}

>>>.el-date-editor .el-range-separator {
  width: 15%;
}

.interval-range-item {
  background-color: #F5F5F5;
  border: 1px solid #CCCCCC;
  color: #666666;
  cursor: pointer;
  font-size: 14px;
  height: 40px;
  position: relative;
  width: 40px;
}

.interval-range-item + .interval-range-item {
  border-left: 0;
}

.interval-range-item:first-child {
  border-radius: 2px 0 0 2px;
}

.interval-range-item:last-child {
  border-radius: 0 2px 2px 0;
}

.interval-range-item-active {
  background-color: #FFFFFF;
  color: #7A4C00;

  &::after {
    border: 1px solid #B47000;
    box-sizing: border-box;
    content: '';
    height: 40px;
    left: -1px;
    position: absolute;
    top: -1px;
    width: 40px;
    z-index: 1;
  }
}

.gift-table {
  width: 848px;
  border-collapse: collapse;
  border-left: 1px solid #DDDDDD;
  border-top: 1px solid #DDDDDD;
  margin-top: 20px;
  font-size: 14px;

  tr {
    display: flex;
  }

  th {
    height: 42px;
    line-height: 42px;
    color: #333333;
    font-weight: normal;
    background-color: #F5F5F5;
  }

  td {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    font-weight: normal;
  }

  th, td {
    flex: 1;
    text-align: center;
    border-right: 1px solid #DDDDDD;
    border-bottom: 1px solid #DDDDDD;
  }
}

.weekend {
  color: #D0021B;
}

.friday {
  color: #775BBB;
}
</style>
