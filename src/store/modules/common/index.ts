/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

// 由于服务端渲染的原因 暂时不可以使用 getModule + 动态模块 可由爬 issues 或者查看 nuxt 的方案
// 现在我还没有时间去做调整
// import { Module, VuexModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import { Module, VuexModule, Action, Mutation, MutationAction } from '@/store/decorators';

import { MStore } from '@/store';

export interface CommonState {
  text: string;
}

const sleep = ((): Promise<void> => new Promise((res) => {
  setTimeout(() => {
    res();
  }, 500);
}));

@Module({ name: 'common', namespaced: true, stateFactory: true })
export class CommonModule extends VuexModule {
  public text: string = 'hello world vuex in typescript vuex-module-decorators + vuex-class';
  public user: any = null;

  @Mutation
  public async setText(text): Promise<any> {
    this.text = text;
  }


  // ***** example *****

  // public bar(): void {
  //   // console.log(this.text);
  //   console.log('bar');
  // }

  @MutationAction({ mutate: ['text', 'user'], rawError: true })
  public async test(): Promise<{
    text: string;
    user: object;
  }> {
    try {
      // @see https://github.com/championswimmer/vuex-module-decorators/issues/118
      await sleep();
      return {
        text: '123',
        user: {},
      };
    } catch (e) {
      throw e;
      // return e;
    }
  }

  // @MutationAction({ mutate: ['user'], rawError: true })
  // public async USER_GET(): Promise<any> {
  //   try {
  //     // @see https://github.com/championswimmer/vuex-module-decorators/issues/118
  //     // @ts-ignore
  //     const res = await api.profile(this.rootState.http);
  //     return {
  //       user: res.data,
  //     };
  //   } catch (e) {
  //     throw e;
  //     // return e;
  //   }
  // }

  // public get isLogin(): boolean {
  //   return (this.user && Object.keys(this.user).length !== 0) || false;
  // }
}
