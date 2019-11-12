# Vue 自用脚手架 支持服务端渲染 (TypeScript)

> This repo is a boilerplate for vue-templates-typescipt project. You could use it as a base to build your own web app.

![avatar](http://wx4.sinaimg.cn/large/7ee06dc9ly1g5db7bte8ij216z0u0qjm.jpg)


## About

由于需要了解整个Vue的生态，所以脚手架会定期更新，有好的建议欢迎PR，目前在我内部项目中广泛使用。
尽可能保证代码的干净和易读，对于希望了解生态的同学来说，还是有帮助的。

虽然 vue-cli 和 nuxt 已经做的非常出色了，但是还是希望有时候自己可定制的程度强一些，希望更多的掌控在自己手里。

## Features

 * 基于最新 Babel@7, Webpack@4。
 * 基于最新 vue-loader@15.x 和 vue@2.6.x。
 * 支持 JavaScript and TypeScript tsx 混写。
 * 支持 PostCSS 和 SCSS。
 * 支持 ESLint 和 StyleLint，默认关闭。
 * 支持 HMR tsx组件，ts组件，vue组件。
 * 基于最新 css-loader 配置支持 SSR，支持css-module。
 * 支持 vuex axios 类型推导。

## 参考文档

 * vue: https://vuejs.org
 * vue-ssr: https://ssr.vuejs.org
 * vuex: https://vuex.vuejs.org
 * vue-router: https://router.vuejs.org
 * webpack: https://webpack.js.org/concepts/

## How to use

 * yarn dev (客户端渲染 dev hot reload)
 * yarn dev:ssr (服务器渲染 dev hot reload)
 * yarn build (客户端渲染模式打包)
 * yarn build:ssr (服务端渲染模式打包)

## 代码风格

```typescript
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/components/Hello';
import { getModule } from '@/store/decorators';
import { CommonModule } from '@/store';


@Component
export default class Index extends Vue {
  private msg: string = 'hello world vue in typescript';
  private CommonModuleInstance!: CommonModule;

  public created(): void {
    this.CommonModuleInstance = getModule(CommonModule, this.$store);
  }

  /* eslint-disable-next-line class-methods-use-this */
  public serverPrefetch(): Promise<any> {
    return new Promise((resolve) => {
      console.log(`hoho serverPrefetch, \tserver: ${this.$isServer}`);
      setTimeout(() => resolve(), 200);
    });
  }

  public static asyncData({ store, route }): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  public render(): VNode {
    return (
      <div class="view">
        <h1>{ this.CommonModuleInstance.text }</h1>
        <Hello msg={this.msg} bug />
        <button onClick={this.onClick}>switch text</button>
      </div>
    );
  }

  private onClick(): void {
    this.msg = 'switch text done !!!';
    this.CommonModuleInstance.setText('hello world!!!');
  }
}
```
