/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import style from './progress-bar.module.scss';


@Component
export default class Progress extends Vue {
  private percent: number = 0;
  private show: boolean = false;
  private canSuccess: boolean = true;
  private duration: number = 3000;
  private color: string = 'rgb(255, 170, 73)';
  private failedColor: string = '#ff000';
  private _timer?: number;
  private _hide?: number;

  public render(): VNode {
    return (
      <div
        class={style.progress} style={
          {
            width: `${this.percent}%`,
            'background-color': this.canSuccess ? this.color : this.failedColor,
            opacity: this.show ? 1 : 0,
          }
        }
      ></div>
    );
  }

  public clear(): void {
    this.$store.commit('setAsyncTransition', {});
  }

  public start(LoadingComponent?: Vue): Progress {
    this.show = true;
    this.canSuccess = true;
    if (this._timer) {
      clearInterval(this._timer);
    }
    this.percent = 0;
    const _cut = 10000 / Math.floor(this.duration);
    this._timer = window.setInterval(() => {
      this.increase(_cut * Math.random());
      if (this.percent > 95) {
        this.finish();
      }
    }, 100);
    if (LoadingComponent) {
      this.$store.commit('setAsyncTransition', { LoadingComponent });
    }
    return this;
  }

  public finish(): Progress {
    this.percent = 100;
    this.hide();
    this.$store.commit('setAsyncTransition', {});
    return this;
  }

  public pause(): Progress {
    clearInterval(this._timer);
    return this;
  }

  public hide(): Progress {
    clearInterval(this._timer);
    clearTimeout(this._hide);
    delete this._timer;
    this._hide = window.setTimeout(() => {
      this.show = false;
      // this.percent = 0;
    }, 500);
    return this;
  }

  public fail(ErrorComponent): Progress {
    this.canSuccess = false;
    this.percent = 100;
    this.hide();
    if (ErrorComponent) {
      this.$store.commit('setAsyncTransition', { ErrorComponent });
    }
    return this;
  }

  // set(num) {
  //   this.show = true;
  //   this.canSuccess = true;
  //   this.percent = Math.floor(num);
  //   return this;
  // }

  // get() {
  //   return Math.floor(this.percent);
  // }

  private increase(num): Progress {
    this.percent = this.percent + Math.floor(num);
    return this;
  }

  private decrease(num): Progress {
    this.percent = this.percent - Math.floor(num);
    return this;
  }
}
