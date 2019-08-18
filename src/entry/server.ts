/**
 * This file is part of the haiman.
 * @copyright Copyright (c) 2018 Hangzhou Haila Information Technology Co., Ltd
 * @author William Chan <root@williamchan.me>
 * @notice Server 入口文件，注意性能，API和utils是单例，需要注入请求参数。
 */
/* eslint no-param-reassign: ["error", { "props": false }] */

import createApp from '@/entry/main';
import { HttpRedirectException } from '@/utils/http/redirect';
import { UnauthorizedHttpException, NotFoundHttpException } from '@/utils/http/error';
import { AUTH_STATE, AUTH_URL } from '@/config/auth';
import { resolveRedirectUri, getRedirectUri } from '@/utils';

// eslint-disable-next-line no-async-promise-executor
export default context => new Promise(async (resolve, reject) => {
  const { request } = context;
  const { app, router, store, http } = createApp(request);
  store.commit('HTTP_INSTANCE', http);

  let { url } = context;
  if (url.indexOf('') === 0) {
    url = url.substr(0);
  }
  const { fullPath } = router.resolve(url).route;
  if (fullPath !== url) {
    return reject(new HttpRedirectException(fullPath));
  }
  const { route } = router.resolve(url);
  const requiresAuth = route.matched.some(record => record.meta.auth === AUTH_STATE.LOGGED_IN);
  const requiresGuest = route.matched.some(record => record.meta.auth === AUTH_STATE.GUEST);

  // 首次检查用户
  // try {
  //   await store.dispatch('user/USER_GET');
  //   if (requiresGuest) {
  //     return reject(new HttpRedirectException(resolveRedirectUri(route.query.redirect_uri)));
  //   }
  // } catch (err) {
  //   if (requiresAuth) {
  //     return reject(new HttpRedirectException(getRedirectUri(context.url)));
  //   }
  // }

  router.push(url);
  return router.onReady(async () => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new NotFoundHttpException());
    }
    try {
      await Promise.all(matchedComponents.map((c: any) => c.asyncData && c.asyncData({
        http,
        store,
        route: router.currentRoute,
      })));
      // TODO api 做成多例后 在这里应该 unset
      // 好像不需要 会自动过滤掉 function
      context.state = store.state;
      return resolve(app);
    } catch (err) {
      if (err instanceof UnauthorizedHttpException) {
        return reject(new HttpRedirectException(getRedirectUri(context.url)));
      }
      return reject(err);
    }
  });
});
