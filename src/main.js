import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import { Layout, message } from "ant-design-vue";
// import 'ant-design-vue/lib/tooltip/style/css'
import './registerServiceWork';

// Vue.component(Layout.name, Layout);
// Vue.component(message.name, message);

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
