/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import topRoute from '@/router/top';
// Module Route
Vue.use(VueRouter);
const routes = Array.prototype.concat(
  // xxxRoute
  topRoute, // this one must be the last one
);


// router.beforeResolve((to, from, next) => {
//   next();
// });

// router.beforeEach((to, from, next) => {
//   next();
// });

// // router.afterEach((route) => {
// // });

// router.onError((errMsg) => {
//   if (/Loading chunk \d+ failed\./.test(errMsg.toString())) {
//     window.location.reload();
//   } else {
//     console.error(errMsg);
//   }
// });

export const createRouter = (): VueRouter => new VueRouter({
  base: __dirname,
  routes,
  mode: 'history',
});
