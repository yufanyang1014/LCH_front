<template>
  <div class="page-index">
    <div class="page-index-con">
      <div class="page-index-con-one">
        <div class="page-index-con-location" 
            @click="navigatePage(item)" 
            v-for="(item, index) in listOne.total" 
            :style="{top: `${listOne.xArr[index]}px`,left: `${listOne.yArr[index]}px`}"
            :key=index>
          <img :src="imgLocation"/>
          <Tooltip placement="bottom" >
            <template slot="title">
              <span>小区名: {{item.Name}}<br/>用户数: {{item.Quantity}}</span>
            </template>
            <h4>{{item.Name}} {{item.Quantity}}</h4>
          </Tooltip>
        </div>
      </div>

      <div class="page-index-con-two">
        <div class="page-index-con-location" 
            @click="navigatePage(item)" 
            v-for="(item, index) in listTwo.total" 
            :style="{top: `${listTwo.xArr[index]}px`,left: `${listTwo.yArr[index]}px`}"
            :key=index>
          <img :src="imgLocation"/>
          <Tooltip placement="bottom" >
            <template slot="title">
              <span>小区名: {{item.Name}}<br/>用户数: {{item.Quantity}}</span>
            </template>
            <h4>{{item.Name}}{{item.Quantity}}</h4>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'ant-design-vue';
import { exchangeApi } from '../../service/home';
import imgLocation from '../../assets/images/icon_location.png';

export default {
  components: {
    Tooltip,
  },
  props: {
    
  },
  data() {
    return {
      imgLocation,
      listOne: {},
      listTwo: {},
    }
  },
  mounted() {
    this.getExchangeInfo();
  },
  methods: {
    async getExchangeInfo() {
      const params = {
        request: 1,
      };
      const resData = await exchangeApi({ params });
      if (resData.ErrorNo) { return }
      const total = resData.District;
      this.TotalUnits = resData.TotalUnits;
      const totalOne = total.slice(0,26);
      const totalTwo = total.slice(26,42);
      this.listOne = this.createBubble(totalOne.length, totalOne, '.page-index-con-one', { width: 100, height: 60 });
      this.listTwo = this.createBubble(totalTwo.length, totalTwo, '.page-index-con-two', { width: 100, height: 60 });
    },
    navigatePage(item) {
      const { TotalUnits } = this;
      this.$router.push({ name: 'location', params: { index: item.Index, total: TotalUnits, quantity: item.Quantity } });
    },
    createBubble(num, total, ele, size){
      const iconWidth = size.width;   //值越大，元素左右间隔越大
      const iconHeight = size.height;  //值越大，元素上下间隔越大
      const targetHeight = document.querySelector(ele).offsetHeight;
      const targetWidth = document.querySelector(ele).offsetWidth;
      let _tmpArray = [];
      //当放置的元素的宽高大于浏览器窗口的宽高时，直接返回
      if(targetWidth < iconWidth || targetHeight < iconHeight){
          return false;
      }
      let xNum = parseInt(targetWidth / iconWidth, 10);    //用浏览器的宽度除以一个元素的宽度可算出浏览器窗口内一行可以放置元素的个数
      let yNum = parseInt(targetHeight / iconHeight, 10);  //用浏览器的高度除以一个元素的高度可算出浏览器窗口内一列可以放置元素的个数
      let allNum = xNum * yNum;   //浏览器窗口内总共可以放置元素的个数
      //当需要放置的元素的个数超过浏览器窗口内总共可以放置的元素的个数时，则返回
      if(num >= allNum){
          return false;
      }        
      for(var i = 0; i < allNum; i++){
          _tmpArray.push(i);
      }
      let xStart = 0, yStart = 0;
      let xArr = [], yArr = [];
      while(num){
          let pointer = Math.floor(Math.random() * allNum);    //向下取整取出0到allnum之间的任意一个整数
          //如果数组_tmpArray中不存在第pointer值，则继续
          if(!_tmpArray[pointer]){
              continue;
          }
          delete _tmpArray[pointer];   //删除数组_tmpArray中第pointer个值
          yStart = parseInt(pointer / xNum, 10) * iconWidth;
          xStart = (pointer % xNum) * iconHeight;
          xArr.push(xStart);
          yArr.push(yStart);
          num--;
      }
      return {xArr, yArr, total};
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-index {
    height: 100%;
    min-width: 1200px;
    background: url('https://image.ibuycoinamc.com/uploads/shop/20200320/7362325a53ae520592af9d9a499587bc72226.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes scaleDraw {  
      0%{
        transform: scale(1);  
      }
      25%{
        transform: scale(1.25); 
      }
      50%{
        transform: scale(1);
      }
      75%{
        transform: scale(1.25);
      }
    }
    &-con {
      position: relative;
      width: 1228px;
      height: 714px;
      background: url('../../assets/images/map.png') no-repeat center;
      background-size: 100% 100%;
      &-one {
        position: relative;
        width: 620px;
        height: 380px;
        float: left;
        margin-top: 216px;
        margin-left: 80px;
      }
      &-two {
        position: relative;
        width: 510px;
        height: 300px;
        float: right;
        margin-top: -500px;
        margin-right: 50px;
      }
      &-location {
        position: absolute;
        cursor: pointer;
        text-align: center;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        img {
          width: 16px;
          height: 16px;
          -webkit-animation-name: scaleDraw; 
          -webkit-animation-timing-function: ease-in-out; 
          -webkit-animation-iteration-count: infinite;  
          -webkit-animation-duration: 5s;
        }
        h4 {
          width: 60px;
          font-size: 12px;
          color: rgb(88, 173, 182);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        h4:hover {
          color: #FFC038;
        }
      }
    }
  }
</style>
