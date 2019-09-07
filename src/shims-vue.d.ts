/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */


import Vue from 'vue'
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { MStore } from '@/store';


declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/options' {
  interface VueContext {
    route: Route;
    store: Store<MStore>;
  }
  interface ComponentOptions<V extends Vue> {
    asyncData?(context: VueContext): Promise<object>;
  }
}
