<template>
  <div class="page-second">
    <div class="page-second-con">
      <h2 class="page-second-con-name">{{DistrictName}} {{quantity}}</h2>
      <div class="page-second-con-table">
        <div class="page-second-con-table-th">
          <div class="th-item" style="width: 450px">地址</div>
          <div class="th-item" style="width: 122px">姓名</div>
          <div class="th-item" style="width: 430px">主机型号</div>
          <div class="th-item" style="width: 120px">主机状态</div>
        </div>
        <div class="page-second-con-table-tr" v-for="(item, idx) in list" :key="idx">
          <div class="tr-item more" style="width: 450px" @click="navigatePage(item.ID)">{{item.Address}} ></div>
          <div class="tr-item" style="width: 122px">{{item.Name}}</div>
          <div class="tr-item" style="width: 430px">{{item.ChillerType}}</div>
          <div class="tr-item" style="width: 120px">
            <div v-if="item.Online !== ''" class="circle" :style="{ background: item.color }"></div>
            <span>{{item.stateStr}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { exchangeApi } from '../../service/home';

export default {
  components: {

  },
  props: {
    
  },
  data() {
    return {
      DistrictName: '',
      list: [],
      timer: null,
      quantity: null,
    }
  },
  mounted() {
    this.getExchangeInfo();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async getExchangeInfo() {
      const { index, quantity } = this.$route.params;
      const params = {
        request: 2,
        setDistrictIndex: index,
      };
      const resData = await exchangeApi({ params });
      if (resData.ErrorNo) { return }
      this.DistrictName = resData.DistrictName;
      const temp = resData.Customer;
      temp.forEach(element => {
        switch(element.Online) {
          case '':
            element.stateStr = '正在检测...';
            break;
          case 'On':
            element.stateStr = '在线';
            element.color = '#6bd23e';
            break;
          case 'Off':
            element.stateStr = '不在线';
            element.color = '#f51f47';
            break;
          default:  
            element.stateStr = '无此设备';
            element.color = '#999999';
        }
      });
      this.list = temp;
      this.quantity = quantity;
      this.intervalFun();
    },
    intervalFun() {
      if (this.timer) { clearInterval(this.timer) }
      const flag = this.list.some(item => item.Online === '');
      if (flag) {
        this.timer = setInterval(() => {
        this.getExchangeInfo();
      }, 3000)
      }
    },
    navigatePage(id) {
      const { total } = this.$route.params;
      this.$router.push({ name: 'detail', params: { id, total } });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-second {
    height: 100%;
    min-width: 1200px;
    background: url('https://image.ibuycoinamc.com/uploads/shop/20200320/867917ab538384af4a91f024c4fc6bd376473.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-con {
      width: 1200px;
      &-name {
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        padding: 0 0 42px 60px;
      }
      &-table {
        padding: 0 18px 0 58px;
        background: rgba(29,38,105,0.5);
        border: 1px solid rgba(67, 154, 255, 0.15);
        box-shadow: 0px 0px 40px 0px rgba(12,21,48,0.3);
        border-radius: 8px;
        font-size: 18px;
        font-weight: 400;
        color: #ffffff;
        max-height: 580px;
        overflow: auto;
        &-th {
          height: 71px;
          border-bottom: 1px solid #3B4172;
          .th-item {
            text-align: center;
            line-height: 71px;
            float: left;
          }
        }
        &-tr {
          height: 63px;
          border-bottom: 1px solid #3B4172;
          .tr-item {
            line-height: 63px;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            .circle {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
          .more {
            cursor: pointer;
          }
          .more:hover {
            color: #FFC038
          }
        }
      }
    }
  }
</style>
