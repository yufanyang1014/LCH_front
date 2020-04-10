<template>
  <div class="page-york-title">
    <img :src="imgLeft"/>
    <span>{{title}}</span>
    <img :src="imgRight"/>
  </div>
</template>

<script>
import imgLeft from '../../../assets/images/left.png';
import imgRight from '../../../assets/images/right.png';

export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgLeft,
      imgRight,
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-york-title {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 41px;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #4FD9FC;
      padding: 0 5px;
    }
  }
</style>
