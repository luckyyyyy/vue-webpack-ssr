/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { isDevelop } from '@/utils';
import commonModule, { CommonState } from './modules/common';

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = (): Store<{
  common: CommonState;
}> => new Vuex.Store({
  strict: isDevelop,
  modules: {
    common: commonModule,
  },
});
