<template>
  <div class="page-index">
    <Layout id="components-layout-demo-top" class="layout">
      <layoutHeader>
        <div class="logo" />
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
import { Layout, Menu, Breadcrumb } from 'ant-design-vue';

const layoutContent = Layout.Content;
const layoutHeader = Layout.Header;
const breadcrumbItem = Breadcrumb.Item;
const menuItem = Menu.Item;

export default {
  components: {
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

    }
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {

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
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
      }
    }
  }
</style>
