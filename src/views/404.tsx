/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue, { VNode } from 'vue';
import './404.scss';

// 原理是先过一遍 ts-loader 然后在过 babel-loader
// 比较坑就是了
// .tsx 后缀直接走 babel-loader

export default Vue.extend({
  mounted() {
    console.log('hello 404');
  },
  methods: {
    test() {
      const name: string = 'hello';
      console.log(name);
    },
  },
  render(): VNode {
    const b = [1, 2, 3];
    return (
      <div onClick={this.test} class="a404">
        { b.map(item => <br />) }
        <center>页面不存在</center>
        <br />
        <br />
        <center><router-link tag="button" to={{ name: 'index' }}>返回主页</router-link></center>
        <center style="color: #ddd">This project started building with typescrip</center>
      </div>
    );
  },
});
