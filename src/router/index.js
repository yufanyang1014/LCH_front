import Vue from 'vue';
import Router from 'vue-router';

import home from './routers/home';

import beforeEach from './beforeEach';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  routes: [
    ...home,
  ],
});

beforeEach.forEach((item) => {
  router.beforeEach(item);
});

export default router;
