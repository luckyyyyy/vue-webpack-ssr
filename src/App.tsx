/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import style from '@/styles/app.module.scss'; // css module
import { BrowserHead } from '@/mixins/head';

@Component
export default class App extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public browserHead(): BrowserHead {
    return {
      title: '123',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div id="app" class={style.app}>
        <router-view></router-view>
      </div>
    );
  }
}
