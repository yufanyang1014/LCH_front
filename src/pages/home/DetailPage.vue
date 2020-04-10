<template>
  <div class="page-third">
    <div>
      <div class="page-third-title">
          <span class="page-third-title-name">约克空调智慧数据中心</span>
          <span class="page-third-title-time">当前日期：{{timeNow}}</span>
      </div>
      <div class="page-third-con">
        <div class="page-body">
          <div class="page-body-desc">
            <div class="page-body-desc-con">
              <img class="page-body-desc-con-qian" :src="imgQian"/>
              <div class="page-body-desc-con-zq">
                <span>中乾暖通</span>
                <label>ZhongQian H.V.A.C</label>
              </div>
            </div>
            <div class="page-body-desc-info">“临安中乾暖通是一家致力于暖通技术为核心，专业为中高端客户提供舒适生活整体解决方案的产品服务商，是临安唯一约克指定专卖店！”</div>
            <div class="page-body-desc-params">成立时间：2012年</div>
            <div class="page-body-desc-params">主        营：约克空调地暖二合一</div>
            <div class="page-body-desc-params">公司地址：浙江省临安区锦城街道钱王街1057-1059号</div>
          </div>
          <div class="page-body-show">
            <div class="online-total-con">
              <div class="data-container">
                <span>在线总量</span>
                <label>{{addCommas(total)}}</label>
                <em>运行在线</em>
              </div>
            </div>
            <div class="hour-consume-con">
              <label>客户小时耗电量</label>
              <span>{{addCommas(customerDay)}}</span>
            </div>
            <div class="day-consume-con">
              <label>客户天耗电量</label>
              <span>{{addCommas(customerHours)}}</span>
            </div>
          </div>
          <div class="page-body-york">
            <york-title title="主机参数"/>
            <div class="page-body-york-con">
              <img class="page-third-logo" :src="imgLogo"/>
              <div class="page-body-york-con-key marTop">主机型号：{{list.ChillerType}}</div>
              <div class="page-body-york-con-key">开机时间：{{list.PilotRunDate}}</div>
              <div class="page-body-york-con-key">运行状态：{{list.stateStr}}</div>
              <div class="page-body-york-con-key flexable">
                <span>回水温度：{{list.ChillerData.SysECLT ? `${list.ChillerData.SysECLT}℃` : '通信断'}}</span>
                <span>出水温度：{{list.ChillerData.SysLCLT ? `${list.ChillerData.SysLCLT}℃` : '通信断'}}</span>
                <span>环境温度：{{list.ChillerData.AmbT ? `${list.ChillerData.AmbT}℃` : '通信断'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="page-footer">
          <div class="page-footer-desc">
            <york-title title="客户信息"/>
            <div class="page-footer-desc-con">
              <img class="page-third-logo" :src="imgLogo"/>
              <div class="page-footer-desc-con-item">
                <img class="icon-style" src="../../assets/images/icon/1@2x.png"/>
                <span>用户姓名：{{list.Name}}</span>
              </div>
              <div class="page-footer-desc-con-item">
                <img class="icon-style" src="../../assets/images/icon/2@2x.png"/>
                <span>设备型号：{{list.ChillerType}}</span>
              </div>
              <div class="page-footer-desc-con-item">
                <img class="icon-style" src="../../assets/images/icon/3@2x.png"/>
                <span>开机时间：{{list.PilotRunDate}}</span>
              </div>
              <div class="page-footer-desc-con-item">
                <img class="icon-style" src="../../assets/images/icon/4@2x.png"/>
                <span>供暖面积：{{list.HeatingSize}}</span>
              </div>
              <div class="page-footer-desc-con-item">
                <img class="icon-style" src="../../assets/images/icon/5@2x.png"/>
                <span>用户地址：{{list.Address}}</span>
              </div>
            </div>
          </div>
          <div class="page-footer-show">
            <york-title title="主机设备性能"/>
            <div class="page-footer-show-con">
              <div class="top-chart">
                <div class="top-chart-item">
                  <Gauge v-if="list.ChillerData.SysECLT !== null"
                          :value="list.ChillerData.SysECLT"
                          min="-40"
                          max="150"
                          ref="myGaugeOne"/>
                  <center class="no-data" v-else>通信断</center>
                  <center class="guage-title">主机回水温度</center>
                </div>
                <div class="top-chart-item">
                  <Gauge v-if="list.ChillerData.SysLCLT !== null"
                          :value="list.ChillerData.SysLCLT"
                          min="-40"
                          max="150"
                          ref="myGaugeTwo"/>
                  <center class="no-data" v-else>通信断</center>
                  <center class="guage-title">主机出水温度</center>
                </div>
                <div class="top-chart-item">
                  <Gauge v-if="list.ChillerData.SysLoad !== null"
                          :value="list.ChillerData.SysLoad * 10"
                          min="0"
                          max="100"
                          ref="myGaugeThree"/>
                  <center class="no-data" v-else>通信断</center>
                  <center class="guage-title">压缩机负载</center>
                </div>
              </div>
              <york-title title="设备运行状态"/>
              <div class="bottom-chart">
                <div class="bottom-chart-table">
                  <div class="table-th">
                    <span>运行状态</span>
                    <span>环境温度</span>
                    <span>风速</span>
                  </div>
                  <div class="table-td">
                    <span>{{SystemStatus}}</span>
                    <span>{{list.ChillerData.AmbT ? `${list.ChillerData.AmbT}℃` : '通信断'}}</span>
                    <span>小于3级</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-footer-chart">
            <york-title title="天耗电量"/>
            <div class="page-footer-chart-con">
              <div class="top-chart">
                <charts v-if="list.PowerData.DailyData.length > 0"
                        width="100%" 
                        height="100%" 
                        type="bar" 
                        :xData="list.PowerData.DailyXAxis"
                        :yData="list.PowerData.DailyData"/>
              </div>
              <york-title title="小时耗电量"/>
              <div class="bottom-chart">
                <charts v-if="list.PowerData.HourData.length > 0"
                        width="100%" 
                        height="100%"
                        type="line" 
                        :xData="list.PowerData.HourXAxis"
                        :yData="list.PowerData.HourData"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { exchangeApi, weatherApi } from '../../service/home';
import YorkTitle from './components/YorkTitle';
import imgQian from '../../assets/images/qian.png';
import imgLogo from '../../assets/images/logo.png';
import Charts from './components/Charts.vue';
import Gauge from './components/Gauge.vue'

export default {
  components: {
    Gauge,
    Charts,
    YorkTitle,
  },
  props: {
    
  },
  data() {
    return {
      imgQian,
      imgLogo,
      timeNow: '',
      timer: null,
      timerTwo: null,
      total: null,
      weatherInfo: {
        WS: '小于3级'
      },
      list: {
        ChillerData: {
          SysStatus: '',
          SysLoad: null, //压缩机载荷，单位-1%
          SysECLT: null, //主机进水温度，单位-℃
          SysLCLT: null, //主机出水温度，单位-℃
        },
        PowerData: {
          DailyData: [],
          DailyXAxis: [],
          HourData: [],
          HourXAxis: [],
        }
      },
    }
  },
  computed: {
    SystemStatus() {
      const { SysStatus } = this.list.ChillerData;
      if (SysStatus === '') {
        return '通信断';
      } else {
        if (SysStatus === 'ON') {
          return '运行';
        } else {
          return '关机';
        }
      }
    },
    customerDay() {
      let date = new Date();
      let day = date.getDate();
      const { DailyData } = this.list.PowerData;
      return DailyData[day-1] ? `${DailyData[day]}kWh` : 0;
    },
    customerHours() {
      let date = new Date();
      let hour = date.getHours();
      const { HourData } = this.list.PowerData;
      return HourData[hour-1] ? `${HourData[hour]}kWh` : 0;
    },
  },
  created() {
    this.getNowTime();
  },
  mounted() {
    this.getExchangeInfo();
    // this.getWeatherInfo();
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timerTwo);
  },
  methods: {
    async getWeatherInfo() {
      const resData = await weatherApi();
      this.weatherInfo = resData.weatherinfo;
    },
    addCommas(nStr) {
      nStr += '';
      let x = nStr.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    },
    async getExchangeInfo() {
      const { id, total } = this.$route.params;
      const params = {
        request: 3,
        setID: id,
      };
      const resData = await exchangeApi({ params });
      if (resData.ErrorNo) { return }
      const temp = resData;
      switch(temp.Online) {
          case '':
            temp.stateStr = '正在检测...';
            break;
          case 'On':
            temp.stateStr = '在线';
            break;
          case 'Off':
            temp.stateStr = '不在线';
            break;
          default:  
            temp.stateStr = '无此设备';
        }
      this.list = temp;
      this.list.PowerData.HourXAxis = this.list.PowerData.HourData.map((element, index) => {
        return index + 1;
      });
      this.list.PowerData.DailyXAxis = this.list.PowerData.DailyData.map((element, index) => {
        return index + 1;
      });
      this.total = total;
      this.$nextTick(() => {
        this.$refs['myGaugeOne'].paintGauge();
        this.$refs['myGaugeTwo'].paintGauge();
        this.$refs['myGaugeThree'].paintGauge();
      })
      this.intervalFun();
    },
    intervalFun() {
      if (this.timerTwo) { clearInterval(this.timerTwo) }
      this.timerTwo = setInterval(() => {
        this.getExchangeInfo();
      }, 5000)
    },
    getTime(){     	//获取时间
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
      if (hour<10) {
        hour='0'+hour;
      }
      if (minute < 10) {
        minute='0'+minute;
      }
      if (second < 10) {
        second='0'+second;
      }
      const times = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
      this.timeNow = times;
    },
    getNowTime() {
      this.getTime();
      this.timer = setInterval(() => { this.getTime() },1000);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url('./DetailPage.less');
</style>
