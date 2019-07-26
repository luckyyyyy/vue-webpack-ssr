/**
 * This file is part of the haiman.
 * @copyright Copyright (c) 2018 Hangzhou Haila Information Technology Co., Ltd
 * @author William Chan <root@williamchan.me>
 * @notice Vue 客户端入口 如果是非SSR编译 这个文件需要做调整 否则初始化的 asyncData 无法使用
 */
/* eslint no-underscore-dangle: "off" */

import Vue from 'vue';
// import Fastclick from 'fastclick/lib/fastclick';
import createApp from '@/entry/main';
// import { AUTH_URL } from '@/config';
// import { isMobileDevice } from '@/utils';
// import { DIST_PATH } from '$env';

// if (isMobileDevice()) {
//   Fastclick.attach(document.body);
// }


const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const ignoreAuth = to.matched.some(record => record.meta.ignoreAuth);
    if (requiresAuth && Object.keys(store.state.user.user).length === 0) {
      // if (!ignoreAuth) {
      //   try {
      //     await store.dispatch('user/GET_USER');
      //   } catch (err) {
      //     // window.location.href = AUTH_URL;
      //   }
      // }
    }
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;

    const activated = matched.filter((c, i) => {
      if (diffed) {
        return true;
      }
      if (prevMatched[i] !== c) {
        diffed = true;
      }
      return diffed;
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    // bar.start();
    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
      // bar.finish();
      next();
    }).catch((err) => {
      // bar.fail();
      if (err.url) {
        next({ name: err.url });
      } else if (err.response.status === 404) {
        next(false);
      } else if (err.response.status === 401) {
        next(false);
      } else if (err.response.status >= 500) {
        next(false);
      } else {
        next();
      }
    });
  });
  // 先挂上 第二次才轮到客户端
  app.$mount('#app');

  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to,
        }).then(next).catch(next);
      } else {
        next();
      }
    },
    beforeMount() {
      if (this.$options.serverPrefetch) {
        this.$options.serverPrefetch.forEach((serverPrefetch) => {
          serverPrefetch.call(this);
        });
      }
      //   const { asyncData } = this.$options;
      //   if (asyncData) {
      //     this.dataPromise = asyncData({
      //       store: this.$store,
      //       route: this.$route,
      //     });
      //   }
    },
  });
});

// if (window.location.protocol === 'https:' && navigator.serviceWorker) {
//   navigator.serviceWorker.register(`/${DIST_PATH}/service-worker.js`);
// }
