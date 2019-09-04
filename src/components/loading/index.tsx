/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import VueComponent from '@/components/vue-component';
import style from './index.module.scss';

interface ButtonProps {
  disabled?: boolean;
}

@Component
export default class Button extends VueComponent<ButtonProps> {
  @Prop() private disabled!: boolean;


  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.loading}>
        <div class={style['lds-ripple']}><div></div><div></div></div>
      </div>
    );
  }
}
