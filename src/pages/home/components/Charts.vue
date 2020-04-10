<template>
  <div :style="{height: height, width: width}" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import '../../../../node_modules/echarts/map/js/china';

export default {
  name: 'Charts',
  props: {
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: ''
    },
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      myChart:'',
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
    const option = {
      calculable : true,
      xAxis: {
          type: 'category',
          axisLine:{
            lineStyle:{
              color:'#ffffff',
            }
          },
          data: [...this.xData],
      },
      yAxis: {
          type: 'value',
          axisLine:{
            lineStyle:{
              color:'#ffffff',
            }
          },
          splitLine :{    //网格线
            lineStyle:{
                type:'dashed',
                color: '#fafafa',
                opacity: 0.5
            },
          }

      },
      tooltip: {
        show: true,
      },
      series: [{
          data: [...this.yData],
          type: this.type,
          itemStyle: {
            color: this.type === 'bar' ? 'rgb(0, 194, 255)' : 'rgb(160, 46, 68)',
          }
      }]
    }
    this.myChart.setOption(option);
    this.chartConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
        return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chartConfigure() {
      window.onresize = this.myChart.resize;
    },
  },
}
</script>
<style scoped lang="less">

</style>
