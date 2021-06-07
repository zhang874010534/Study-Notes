<template>
    <div class="chart">
        <canvas></canvas>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
export default {
    name: 'hdPieChart',

    props: {
        pieData: {
            type: Array,
            default: function () {
                return []
            }
        },
        seriesColor: {
            type: Array,
            default: function () {
                return []
            }
        },
        seriesCenter: {
            type: Array,
            default: function () {
                return ['22%', '50%']
            }
        },
        initOption: {
            type: Object,
            default: function () {
                return {}
            }
        },
        legendLeft: {
            type: Number,
            default: 170,
        },
    },

    data() {
        return {
            myChart: null,
        }
    },

    watch: {
        pieData: {
            handler() {
                this.setMyChart()
            },
            immediate: true,
        },
    },

    mounted() {
        this.myChart = echarts.init(this.$el);
        this.setMyChart()
    },

    methods: {
        setMyChart() {
            if (!this.myChart) {
                return
            }

            const pieTotal = this.pieData.reduce((a, b) => a + ~~b.value, 0)
            
            const option = {
                legend: {
                    orient: 'vertical',
                    left: this.legendLeft,
                    data: this.pieData,
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 15,
                    top: 'middle',
                    textStyle: {
                        fontSize:14,
                        rich: {
                            name: {
                                fontSize: 14,
                                color: "#333333",
                                fontWeight: 'bold',
                                padding: [10, 0, 22, 0],
                            },
                            name1: {
                                fontSize: 14,
                                color: "#333333",
                                fontWeight: 'bold',
                            },
                            tip: {
                                fontSize: 12,
                                color: "#666666",
                            }
                        }
                    },
                    formatter: params => {
                        const item = this.pieData.find(ele => ele.name === params)
                        return item.des ? '{name| ' + item.name + ' ¥' + this.getNumText(parseInt(item.value)) + '}\n{tip| ' + item.des + '}' : '{name1| ' + item.name + ' ¥' + this.getNumText(parseInt(item.value)) + '}'
                    }
                },
                series : [
                    {
                        center: this.seriesCenter,
                        color: this.seriesColor,
                        radius:[0,'75%'],
                        type: 'pie',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    position: "inner",
                                    show: true,
                                    textStyle: {
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color: "#FFFFFF",
                                        rich: {
                                            black: {
                                                color: "#333333",
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                            },
                                        }
                                    },
                                    formatter: params => {
                                        const percent = pieTotal > 0 ? parseFloat(parseFloat(params.value * 100 / pieTotal).toFixed(2)) + '%' : 0
                                        return params.dataIndex === 0 ? '{black| ' + percent + '}' : percent
                                    }
                                },
                                lableLine: {
                                    "show": false
                                }
                            },
                        },
                        data: this.pieData,
                    }
                ],
                animation: false,
                animationDuration: 0,
                animationDurationUpdate: 0,
            }

            this.myChart.setOption(option, false, true)
            this.myChart.setOption(this.initOption, false, true)
            this.myChart.setOption({
                series: this.chartSeries,
            })
        },
        getNumText(num) {
            return num >= 1000 ? parseFloat(num / 10000).toFixed(2) + '万' : num
        },
    }
}
</script>
    
<style scoped lang="stylus">
.chart{
    height: 100%;
    position: relative;
    width: 100%;
    canvas{
        height: 100%;
        width: 100%;
    }
}
</style>
