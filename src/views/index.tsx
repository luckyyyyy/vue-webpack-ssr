/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/components/Hello';
import { namespace } from 'vuex-class';

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
  //   return new Promise((resolve) => {
  //     console.log(`hoho serverPrefetch, \tserver: ${this.$isServer}`);
  //     setTimeout(() => resolve(), 200);
  //   });
  // }

  // public static asyncData({ store, route }): Promise<any> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(), 1000);
  //   });
  // }

  public render(): VNode {
    return (
      <div class="view">
        <h1>{ this.text }</h1>
        <Hello msg={this.msg} bug />
        <button onClick={this.onClick}>switch text</button>
      </div>
    );
  }

  private onClick(): void {
    this.msg = 'switch text done !!!';
    this.setText('hello world!!!');
  }
}
