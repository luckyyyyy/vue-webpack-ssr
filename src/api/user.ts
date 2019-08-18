/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

// 这是一个实例 告诉你如何设置api返回的结果类型定义增强
// 配合阿里巴巴的 API 插件，可以实现更新 swagger 后自动检查错误的使用


import { AxiosInstance } from 'axios';

interface Test {
  hello: number;
}

interface LoginForm {
  account: string;
  captcha?: string;
  passwd: string;
}


export const login = (http: AxiosInstance, data: LoginForm) => http.post<Test>('login', data);
