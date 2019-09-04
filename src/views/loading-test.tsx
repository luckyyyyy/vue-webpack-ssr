/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { isServer } from '@/utils';

@Component
export default class Index extends Vue {
  private msg: string = '404 page, http status 404';

  public static asyncData({ store, route }): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }


  public render(): VNode {
    return (
      <div class="view">
        loading test render done
        <center><router-link to={{ name: 'index' }}>back home</router-link></center>
      </div>
    );
  }
}
