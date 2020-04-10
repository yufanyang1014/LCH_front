

// path与name前缀
const prefiexRoute = '/';
const prefiexName = '';

/** **** home 首页 ***** */

export default [
  {
    path: '/',
    redirect: {
      name: `${prefiexName}home`,
    },
  },
  // 首页
  {
    name: `${prefiexName}home`,
    path: `${prefiexRoute}home`,
    component: () => import('../../pages/home/Index.vue'),
  },
  // 第二页
  {
    name: `${prefiexName}location`,
    path: `${prefiexRoute}location/:index/:total/:quantity`,
    component: () => import('../../pages/home/LocationPage.vue'),
  },
    // 第三页
  {
    name: `${prefiexName}detail`,
    path: `${prefiexRoute}detail/:id/:total`,
    component: () => import('../../pages/home/DetailPage.vue'),
  },
];
