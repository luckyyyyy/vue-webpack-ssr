/**
 * This file is part of the haiman.
 * @copyright Copyright (c) 2018 Hangzhou Haila Information Technology Co., Ltd
 * @author William Chan <root@williamchan.me>
 * @notice Server 入口文件，注意性能，API和utils是单例，需要注入请求参数。
 */
/* eslint no-param-reassign: ["error", { "props": false }] */

import createApp from '@/entry/main';
// import { setApiParams } from '$api'; // eslint-disable-line
// import { AUTH_URL, ROUTER_BASE } from '@/config';
// import { setUtilParams } from '@/utils';

const createError = (msg, obj) => {
  const err = new Error(msg);
  Object.assign(err, obj);
  return err;
};

// eslint-disable-next-line no-async-promise-executor
export default context => new Promise(async (resolve, reject) => {
  const { request } = context;
  // setUtilParams(request);
  const { app, router, store } = createApp();
  let { url } = context;
  if (url.indexOf('') === 0) {
    url = url.substr(0);
  }
  const { fullPath } = router.resolve(url).route;
  if (fullPath !== url) {
    return reject(createError({ url: fullPath }));
  }
  // setApiParams(request);
  const { route } = router.resolve(url);
  const requiresAuth = route.matched.some(record => record.meta.requiresAuth);
  const ignoreAuth = route.matched.some(record => record.meta.ignoreAuth);
  // if (!ignoreAuth) {
  //   try {
  //     await store.dispatch('user/GET_USER');
  //   } catch (err) {
  //     if (requiresAuth) {
  //       return reject(createError({ url: `${AUTH_URL}?redirect_uri=${encodeURIComponent(context.url)}` }));
  //     }
  //   }
  // }
  router.push(url);
  return router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(createError({ code: 404 }));
    }
    // setApiParams(request);
    // setUtilParams(request);
    return Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
      store,
      route: router.currentRoute,
    }))).then(() => {
      context.state = store.state;
      // setApiParams(request);
      // setUtilParams(request);
      resolve(app);
    }).catch((err) => {
      if (err.url) {
        return reject(err);
      }
      if (err.response) {
        if (err.response.status === 401) {
          return reject(createError({ url: `${AUTH_URL}?redirect_uri=${encodeURIComponent(context.url)}` }));
        }
        if (err.response.status === 403) {
          return reject(createError({ url: '/403' }));
        }
        if (err.response.status === 404) {
          return reject(createError({ url: '/404' }));
        }
        if (err.response.status >= 500) {
          return reject(createError({ url: '/404' }));
        }
      }
      return reject(createError({ code: 500 }));
    });
  });
});
