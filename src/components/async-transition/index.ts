/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
// import Vue from 'vue';
import ProgressBar from './progress-bar';

interface AsyncTransition {
  start: Function;
  finish: Function;
  fail: Function;
  clear: Function;
}

/**
 * 创建同步组件的过度效果，服务端渲染放到createApp里面。
 * @param store
 */
export const createAsyncTransition = (store): AsyncTransition => {
  const Bar = new ProgressBar({ store }).$mount();
  if (document && document.body) {
    document.body.appendChild(Bar.$el);
  }
  return Bar;
};
