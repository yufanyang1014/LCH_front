<template>
  <div class="page-index">
    <Layout id="components-layout-demo-top" class="layout">
      <layoutHeader>
        <div class="logo">Hi,Admin <Icon type="smile" theme="twoTone" :spin="spin" @click="hanlderSpin" /></div>
        <div class="login-out" @click="handlerOut">退出 <Icon type="logout" /></div>
        <Menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['setting']"
          :style="{ lineHeight: '64px' }"
        >
        <menuItem key="setting">首页配置</menuItem>
      </Menu>
      </layoutHeader>
      <layoutContent style="padding: 0 50px; overflow: scroll">
        <Breadcrumb style="margin: 16px 0">
          <breadcrumbItem>Home</breadcrumbItem>
          <breadcrumbItem>Settings</breadcrumbItem>
        </Breadcrumb>
        <div class="section-content"><router-view /></div>
      </layoutContent>
    </Layout>
  </div>
</template>

<script>
import { Layout, Menu, Breadcrumb, Icon } from 'ant-design-vue';

const layoutContent = Layout.Content;
const layoutHeader = Layout.Header;
const breadcrumbItem = Breadcrumb.Item;
const menuItem = Menu.Item;

export default {
  components: {
    Icon,
    Menu,
    menuItem,
    Layout,
    Breadcrumb,
    breadcrumbItem,
    layoutContent,
    layoutHeader,
  },
  props: {
    
  },
  computed: {


      
  },
  data() {
    return {
      spin: false,
    }
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    hanlderSpin() {
      const { spin } = this;
      this.spin = !spin;
    },
    handlerOut() {
      localStorage.removeItem('token');
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 100);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-index {
    height: 100%;
    #components-layout-demo-top {
      height: 100%;
      .section-content {
        background: #ffffff;
        padding: 20px;
      }
      .logo {
        width: 120px;
        height: 31px;
        color: #ffffff;
        font-size: 14px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
        line-height: 31px;
        text-align: center;
      }
      .login-out {
        text-align: right;
        color: #ffffff;
        font-size: 14px;
        float: right;
        cursor: pointer;
      }
    }
  }
</style>
