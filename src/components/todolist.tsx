/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import VueComponent from '@/components/vue-component';

@Component
export default class TodoList extends VueComponent {
  private text: string = '';
  private data: string[] = [];

  public onSubmit(e: Event): boolean {
    e.preventDefault();
    // e.stopPropagation();
    this.data.push(this.text);
    return false;
  }

  public render(): VNode {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <div><input v-model={this.text} type="text"/></div>
          <button type="submit">add list</button>
        </form>
        <ul>
          { this.data.map(item => <li>{ item }</li>) }
        </ul>
      </div>
    );
  }
}
