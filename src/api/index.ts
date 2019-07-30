/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

// 考虑下 cookie 的问题 怎么做 先这样
// 考虑把 axios 和 vuex 做绑定 也可以顺便放到 asyncDataHooks 里面
// 客户端和服务端要分开处理

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';

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
 * response 结果
 * @param config
 * @return {Promise<AxiosResponse<any>>}
 */
const onResponse = (res: AxiosResponse): Promise<AxiosResponse<any>> => {
  if (res.data && res.data.success === true) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res.data);
};

/**
 * 返回错误
 * @param config
 */
const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  if (!err.response) {
    console.log('网络问题');
  } else if (err.response.status >= 500) {
    console.log('500');
  } else if (err.response.status === 403) {
    console.log('403');
  }
  return Promise.reject(err);
};

export const createAxios = (): AxiosInstance => {
  const config = {
    baseURL: '/api',
    // timeout: 5000,
    withCredentials: true,
  };
  const http = axios.create(config);
  http.interceptors.request.use(onRequest, onRequestError);
  http.interceptors.response.use(onResponse, onResponseError);
  return http;
};

export const http = createAxios();
