<template>
  <section class="banner-setting">
    <h1 class="common-title">轮播图设置<span class="commo-tip">(图片最多上传五张，且每张图片大小不能超过1M，建议宽高比为375 * 140)</span></h1>
    <a href="javascript:;" class="common-upload" v-show="visibleUpload"><Icon type="upload" /> 选择文件
      <input class="common-input" type="file" multiple="multiple" @change="handlerFile"/>
    </a>
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
import { imageUploadApi, bannerGetByTypeApi, bannerDeleteApi, bannerSubmitApi } from '../../../service/home';

export default {
  components: {
    Icon
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
      const resData = await bannerGetByTypeApi(params);
      this.bannerImages = resData.data.list;
    },
    async handlerFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = async () => {
        const base64 = reader.result.substring(reader.result.indexOf(",") + 1);
        const params = {
          base64,
        }
        const resData = await imageUploadApi(params);
        if (!Number(resData.code)) { return message.error(resData.msg) }
        const linkUrl = resData.data;
        this.bannerSubmit(linkUrl);
      }
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
    .common-upload {
      padding: 4px 10px;
      height: 20px;
      line-height: 20px;
      position: relative;
      border: 1px solid #999;
      text-decoration: none;
      color: #666;  
      border-radius: 4px;
    };
    .common-input{
      position: absolute;
      overflow: hidden;
      right: 0;
      top: 0;
      opacity: 0;
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