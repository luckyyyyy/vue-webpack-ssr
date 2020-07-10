/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import VueComponent from '@/components/vue-component';

export interface HelloProps {
  msg?: string;
  bug?: boolean;
}

@Component
export default class Hello extends VueComponent<HelloProps> {
// export default class Hello extends Vue {
  @Prop() private readonly msg!: string;
  @Prop() private readonly bug!: boolean;

  public render(): VNode {
    return (
      <div>
        <div class="msg">{ this.msg }</div>
        <b>元类型反射测试：当前是 { this.bug.toString() }</b>
      </div>
    );
  }
}
