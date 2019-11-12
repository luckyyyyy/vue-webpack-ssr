/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from '@/store/decorators';
import { CommonModule } from '@/store/modules/common';
import Hello from '@/components/Hello';
import TodoList from '@/components/todolist';
import { BrowserHead } from '@/mixins/head';

@Component
export default class Index extends Vue {
  private msg: string = 'hello world vue in typescript';

  private CommonModuleInstance!: CommonModule;

  public created(): void {
    this.CommonModuleInstance = getModule(CommonModule, this.$store);
    // this.CommonModuleInstance.
    console.log(this.CommonModuleInstance.text);
  }

  // eslint-disable-next-line class-methods-use-this
  // public serverPrefetch(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`hoho serverPrefetch, \tserver: ${this.$isServer}`);
  //     setTimeout(() => reject({ url: '/405' }), 200);
  //   });
  // }

  // public static async asyncData({ store, route }): Promise<any> {
  //   const CommonModuleInstance = getModule(CommonModule, store);
  //   await CommonModuleInstance.test();
  // }

  public browserHead(): BrowserHead {
    return {
      title: this.msg,
    };
  }

  private onClick(): void {
    this.msg = 'switch text done !!!';
    this.CommonModuleInstance.setText('hello world!!!');
  }

  private onClick2(): void {
    this.CommonModuleInstance.test();
  }

  public render(): VNode {
    return (
      <div class="view">
        <h1>{ this.CommonModuleInstance.text }</h1>
        <Hello msg={this.msg} />
        <button onClick={this.onClick}>switch text</button>
        <button onClick={this.onClick2}>action sleep 500ms switch text</button>

        <div class="less"> less style test </div>
        <h2>todolist</h2>
        <TodoList />
        <p>*** 下面是一些路由过度的测试 可以自定义 asyncData 加载时的组件 ***</p>
        <p>
          <router-link to={{ name: 'loading-test' }}>loading-test</router-link>
        </p>
        <p>
          <router-link to={{ name: 'loading-test-2' }}>loading-test-2(LoadingComponent)</router-link>
        </p>
        <p>
          <router-link to={{ path: '/404' }}>go to 404</router-link>
        </p>
      </div>
    );
  }
}
