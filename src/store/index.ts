/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosInstance } from 'axios';
import { isDevelop } from '@/utils';
// import UserModule, { UserState } from './modules/user/index2';
import { CommonModule, CommonState } from './modules/common';

Vue.use(Vuex);

export interface MStore {
  http: AxiosInstance;
  user: CommonState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = () => new Vuex.Store<MStore>({
  strict: isDevelop,
  // 这里不知道怎么解决 modules 和 root state 共存
  // @ts-ignore
  state: {
    http: null,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    HTTP_INSTANCE(state, instance: AxiosInstance) {
      state.http = instance;
    },
  },
  modules: {
    common: CommonModule,
  },
});
