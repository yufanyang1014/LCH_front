<template>
  <section class="banner-setting">
    <h1 class="common-title">轮播图设置<span class="commo-tip">(图片最多上传五张，且每张图片大小不能超过3M，建议宽高比为375 * 140)</span></h1>
    <uploadFile v-on:onUpload="bannerSubmit"/>
    <div class="show-banner">
      <div class="show-banner-con" v-for="(item, idx) in bannerImages" :key="idx">
        <img class="show-banner-size" :src="item.linkUrl"/>
        <Icon class="show-banner-con-icon" theme="twoTone" type="close-circle" @click="handlerDelete(item.id)" />
      </div>
    </div>
  </section>
</template>

<script>
import { Icon, message } from 'ant-design-vue';
import uploadFile from '../../../components/uploadFile';
import { bannerAdminGetByTypeApi, bannerSubmitApi } from '../../../service/home';

export default {
  components: {
    Icon,
    uploadFile,
  },
  data() {
    return {
      bannerImages: [],
    }
  },
  props: {
    
  },
  computed: {
    visibleUpload() {
      const { bannerImages } = this;
      if (bannerImages.length >= 5) {
        return false;
      }
      return true;
    },
  }, 
  mounted() {
    this.getBannerList();
  }, 
  methods: {
    async getBannerList() {
      const params = {
        pageNum: 0,
        pageSize: 100,
        "type": 3
      }
      const resData = await bannerAdminGetByTypeApi(params);
      this.bannerImages = resData.data.list;
    },
    async bannerSubmit(linkUrl) {
      const postData = {
        linkUrl,
        "type": 3
      }
      const resData = await bannerSubmitApi(postData);
      if (!Number(resData.code)) { return message.error(resData.msg) }
      this.getBannerList();
    },
    async handlerDelete(id) {
      const token = localStorage.getItem('token');
      fetch(`/api/banner/delete?id=${id}`, {
        method: 'POST',
        headers: {
          'adminToken': token
        }
      })
      .then(response => response.json())
      .then((resData) => {
        if (!Number(resData.code)) { return message.error(resData.msg) }
        message.success(resData.msg);
        this.getBannerList();
      })
    },
  } 
}
</script>

<style lang="less" scoped>
  .banner-setting {
      padding: 20px 0;
      .show-banner {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        &-con {
          width: 750px;
          position: relative;
          &-icon {
            position: absolute;
            font-size: 30px;
            right: 10px;
            top: 10px;
            cursor: pointer;
          }
        }
        &-size {
          width: 750px;
          height: 280px;
          margin-bottom: 15px;
          &:hover {
            border: 2px solid;
          }
        }
      }
    }
    .common-title {
      font-size: 16px;
      padding-bottom: 10px;
    }
    .commo-tip {
      font-size: 10px;
      color: tomato;
      padding-left: 6px;
    }
</style>