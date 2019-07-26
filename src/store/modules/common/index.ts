/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
/* eslint-disable no-param-reassign */

export interface CommonState {
  text: string;
}

export default {
  namespaced: true,
  state: {
    text: 'hello world vuex in typescript vuex-class',
  },
  // getters,
  // actions,
  mutations: {
    setText(state, text) {
      state.text = text;
    },
  },
};
