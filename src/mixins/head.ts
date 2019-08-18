/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import { isServer } from '@/utils';

export interface BrowserHead {
  title?: string;
  keywords?: string;
  description?: string;
}

function getBrowserHead(vm): BrowserHead | void {
  const { browserHead } = vm.$options;
  if (browserHead) {
    // console.log(browserHead.call(vm).title);
    return typeof browserHead === 'function'
      ? browserHead.call(vm)
      : browserHead;
  }
  return void 0;
}

const serverHeadMixin = Vue.extend({
  created() {
    const browserHead = getBrowserHead(this);
    if (browserHead) {
      if (browserHead.title) this.$ssrContext.title = browserHead.title;
      if (browserHead.keywords) this.$ssrContext.keywords = browserHead.keywords;
      if (browserHead.description) this.$ssrContext.description = browserHead.description;
    }
  },
});

const clientHeadMixin = Vue.extend({
  created() {
    const browserHead = getBrowserHead(this);
    if (browserHead) {
      if (browserHead.title) document.title = browserHead.title;
      if (browserHead.keywords) {
        const $dom = document.querySelector('meta[name="keywords"]');
        if ($dom) $dom.setAttribute('content', browserHead.keywords);
      }
      if (browserHead.description) {
        const $dom = document.querySelector('meta[name="description"]');
        if ($dom) $dom.setAttribute('content', browserHead.description);
      }
    }
  },
});

export default isServer ? serverHeadMixin : clientHeadMixin;
