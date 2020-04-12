import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Tooltip, Layout } from "ant-design-vue";
import 'ant-design-vue/lib/tooltip/style/css'
import './registerServiceWork';

Vue.component(Tooltip.name, Tooltip);
Vue.component(Layout.name, Layout);

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
