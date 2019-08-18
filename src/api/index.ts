/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

// 需要考虑下 cookie 的问题 怎么做 先这样
// 考虑把 axios 和 vuex 做绑定 每次 create 也可以顺便放到 asyncDataHooks 里面
// 客户端和服务端要分开处理
// 方案只是暂定

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
// import { Modal } from 'ant-design-vue';
import { isServer } from '@/utils';

import {
  UnknownHttpException,
  UnauthorizedHttpException,
  NotFoundHttpException,
  ForbiddenHttpException,
  ServerErrorHttpException,
  HttpException,
} from '@/utils/http/error';

export interface APIRespons<T = any> {
  data: T;
  code: number;
  message?: string;
  extra: any;
}


/**
 * 请求参数配置
 * @param config
 */
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => config;

/**
 * 请求发出错误
 * @param config
 */
const onRequestError = (err: AxiosError): Promise<AxiosError> => Promise.reject(err);

/**
 * response 结果处理
 * @param config
 * @return {Promise<AxiosResponse<any>>}
 */
const onResponse = (res: AxiosResponse<APIRespons>): Promise<APIRespons<any>> => {
  if (res.data && res.data.code === 0) {
    return Promise.resolve(res.data);
  }
  // if (!isServer) {
  //   Modal.error({
  //     maskClosable: true,
  //     title: '操作失败',
  //     content: res.data.message,
  //   });
  // }
  return Promise.reject(res.data);
};

/**
 * 返回错误
 * @param config
 */
const onResponseError = (err: AxiosError): Promise<HttpException> => {
  if (!err.response) {
    return Promise.reject(new UnknownHttpException(err));
  } if (err.response.status >= 500) {
    return Promise.reject(new ServerErrorHttpException(err));
  } if (err.response.status === 401) {
    return Promise.reject(new UnauthorizedHttpException(err));
  } if (err.response.status === 403) {
    return Promise.reject(new ForbiddenHttpException(err));
  } if (err.response.status === 404) {
    return Promise.reject(new NotFoundHttpException(err));
  }
  return Promise.reject(err);
};

/**
 * 需要注入到 node 请求中的字段（转发用户的字段）
 */
const INJECT_USER_HEADERS = [
  'host',
  'origin',
  'referer',
  'cookie',
  'user-agent',
  'accept-language',
  'x-forwarded-for',
];

/**
 * 创建 http 实例
 * @param request
 * @return {AxiosInstance}
 */
export const createAxios = (request: any): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: `${isServer ? process.env.API_GATEWAY : ''}/api`,
    // timeout: 5000,
    withCredentials: true,
  };
  if (isServer) {
    config.headers = {};
    INJECT_USER_HEADERS.forEach((header) => {
      if (request.headers[header]) {
        config.headers[header] = request.headers[header];
      }
    });
  }

  const http = axios.create(config);
  http.interceptors.request.use(onRequest, onRequestError);
  http.interceptors.response.use(onResponse as any, onResponseError);
  return http;
};
