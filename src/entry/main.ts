/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import 'reflect-metadata';
import '@/utils/component-hooks';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import headMixin from '@/mixins/head';
import App from '@/App';
import { createRouter } from '@/router';
import { createStore } from '@/store';
import { createAxios } from '@/api';
import 'normalize.css';
import '@/styles/index.scss';

Vue.mixin(headMixin);

export default (request?: any) => {
  const store = createStore();
  const router = createRouter();
  const http = createAxios(request);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store, http };


  // sync(store, router);
  // // eslint-disable-next-line no-new
  // new Vue({
  //   el: '#app',
  //   router,
  //   store,
  //   render: h => h(App),
  // });
};
