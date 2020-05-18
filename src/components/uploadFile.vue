<template>
  <span>
    <a href="javascript:;" class="common-upload"><Icon type="upload" /> 选择文件 &nbsp;&nbsp;
      <Spin :spinning="spinning" size="small"/>
      <input class="common-input" type="file" multiple="multiple" @change="handlerFile"/>
    </a>
  </span>
</template>

<script>
import { Icon, message, Spin  } from 'ant-design-vue';
import { imageUploadApi } from '../service/home';

export default {
  props: {

  },
  components: {
    Icon,
    Spin,
  },
  data() {
    return {
      spinning: false,
    }
  },
  methods: {
    async handlerFile(e) {
      const file = e.target.files[0];
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('请上传jpeg或者png格式的图片');
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        message.error('请将图片大小控制在3M以内!');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      this.spinning = true;
      reader.onloadend = async () => {
        const base64 = reader.result.substring(reader.result.indexOf(",") + 1);
        const params = {
          base64,
        }
        try {
          const resData = await imageUploadApi(params);
          if (!Number(resData.code)) { return message.error(resData.msg) }
          this.spinning = false;
          const linkUrl = resData.data;
          this.$emit('onUpload', linkUrl);
        } catch (err) {
          console.log(err);
        } finally {
          this.spinning = false;
        }
      }
    },
  },
}
</script>

<style lang="less">
  .common-upload {
      padding: 4px 10px;
      height: 20px;
      line-height: 20px;
      position: relative;
      border: 1px solid #999;
      text-decoration: none;
      color: #666;  
      border-radius: 4px;
      .common-input{
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 0;
        opacity: 0;
      }
    };
</style>