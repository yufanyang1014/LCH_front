<template>
  <div class="page-login">
    <section class="login-form">
      <label class="login-form-title">楼促会管理系统</label>
      <input class="login-form-input" v-model="name"/>
      <input type="password" class="login-form-input" v-model="password"/>
      <button class="login-form-btn" :disabled="disabledSubmit" @click="handlerLogin">登&nbsp;录</button>
    </section>
  </div>
</template>

<script>
import { userLoginApi } from '../../service/login';
import imgUser from '../../assets/images/userpass.png';
import imgName from '../../assets/images/username.png';

export default {
  components: {

  },
  props: {
    
  },
  computed: {
    disabledSubmit() {
      const { name, password } = this;
      return !name || !password;
    },
  },
  data() {
    return {
      imgUser,
      imgName,
      name: '',
      password: '',
    }
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    async handlerLogin() {
      const { name, password } = this;
      const params = { name, password };
      const resData = await userLoginApi(params);
      if (!Number(resData.code)) { return alert(resData.msg) }
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-login {
    height: 100%;
    background: url('https://taogangan.oss-cn-shanghai.aliyuncs.com/images/92eb6a58-4305-4648-b165-6f40c1c7325f.jpg') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 500px;
      height: 380px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      &-title {
        font-size: 26px;
        color: #ffffff;
        font-weight: bold;
        padding-top: 30px;
        padding-bottom: 20px;
      }
      &-input {
        width: 440px;
        height: 50px;
        position: relative;
        background: rgba(255,255,255,1);
        border-radius: 5px;
        border: 1px solid rgba(151,151,151,1);
        margin: 15px 0;
        padding-left: 20px;
        font-size: 18px;
        color: #333333;
      }
      &-btn {
        width: 440px;
        height: 60px;
        background: rgba(2,108,220,1);
        border-radius: 5px;
        font-size: 18px;
        color: #ffffff;
        margin-top: 30px;
        border: none;
        cursor: pointer;
      }
    }
  }
</style>
