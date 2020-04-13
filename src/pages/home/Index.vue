<template>
  <div class="page-index">
      <input type="file" @change="handlerFile"/>
      <input :value="imageUrl"/>
  </div>
</template>

<script>
import { bannerGetByTypeApi, imageUploadApi } from '../../service/home';

export default {
  components: {

  },
  props: {
    
  },
  computed: {


      
  },
  data() {
    return {
      imageUrl: '',
    }
  },
  mounted() {
    // this.asyncAll();
  },
  destroyed() {

  },
  methods: {
    async asyncAll() {
      const params = {
        "type": 3
      };
      const resData = await bannerGetByTypeApi(params);
      console.log(resData);
    },
    handlerFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = async () => {
        const base64 = reader.result.substring(reader.result.indexOf(",") + 1);
        const params = {
          base64,
        }
        const resData = await imageUploadApi(params);
        this.imageUrl = resData.data;
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  
</style>
