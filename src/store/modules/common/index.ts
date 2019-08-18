/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
/* eslint-disable no-param-reassign */

// 由于服务端渲染的原因 暂时不可以使用 getModule + 动态模块 可由爬 issues 或者查看 nuxt 的方案
// 现在我还没有时间去做调整
import { Module, VuexModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import { MStore } from '@/store';

export interface CommonState {
  text: string;
}

@Module({ namespaced: true, stateFactory: true })
export class CommonModule extends VuexModule<CommonState, MStore> {
  private text: string = 'hello world vuex in typescript vuex-module-decorators + vuex-class';

  @Mutation
  public async setText(text): Promise<any> {
    this.text = text;
  }


  // ***** example *****

  // @Action({ rawError: true })
  // public async USER_LOGIN(data): Promise<any> {
  //   const res = await api.login(this.context.rootState.http, data);
  //   return res;
  // }

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
