

// path与name前缀
const prefiexRoute = '/';
const prefiexName = '';

/** **** home 首页 ***** */

export default [
  {
    path: '/',
    redirect: {
      name: `${prefiexName}login`,
    },
  },
  // 首页
  {
    name: `${prefiexName}home`,
    path: `${prefiexRoute}home`,
    component: () => import('../../pages/home/Index.vue'),
    children: [
      {
        name: 'home/setting',
        path: 'setting',
        component: () => import('../../pages/home/setting.vue'),
      },
    ],
  },
  // 登录
  {
    name: `${prefiexName}login`,
    path: `${prefiexRoute}login`,
    component: () => import('../../pages/login/login.vue'),
  },
];
