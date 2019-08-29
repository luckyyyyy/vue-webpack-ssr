/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Hello from '@/components/Hello';
import { BrowserHead } from '@/mixins/head';

const commonModule = namespace('common');

@Component
export default class Index extends Vue {
  private msg: string = 'hello world vue in typescript';

  @commonModule.State
  private text;

  @commonModule.Mutation
  private setText;


  // eslint-disable-next-line class-methods-use-this
  // public serverPrefetch(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`hoho serverPrefetch, \tserver: ${this.$isServer}`);
  //     setTimeout(() => reject({ url: '/405' }), 200);
  //   });
  // }

  // public static asyncData({ store, route }): Promise<any> {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, 100);
  //   });
  // }

  public browserHead(): BrowserHead {
    return {
      title: this.msg,
    };
  }

  public render(): VNode {
    return (
      <div class="view">
        <h1>{ this.text }</h1>
        <Hello msg={this.msg} bug />
        <button onClick={this.onClick}>switch text</button>
        <center><router-link to={{ path: '/404' }}>go to 404</router-link></center>
        <div class="less"> less style test </div>
      </div>
    );
  }

  private onClick(): void {
    this.msg = 'switch text done !!!';
    this.setText('hello world!!!');
  }
}
