/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { AUTH_URL } from '@/config/auth';

/**
 * 判断是否是开发环境
 * @return {boolean}
 */

export const isDevelop = process.env.NODE_ENV !== 'production';

/**
 * 判断是否是node环境
 * @return {boolean}
 */

export const isServer = process.env.VUE_ENV === 'server';


export const resolveRedirectUri = (uri?: string | (string | null)[]): string => {
  if (typeof uri === 'string') {
    return uri;
  }
  return '/';
};

export const getRedirectUri = (uri?: string | (string | null)[]): string => {
  if (typeof uri === 'string') {
    return `${AUTH_URL}?redirect_uri=${encodeURIComponent(uri)}`;
  }
  return `${AUTH_URL}?redirect_uri=${encodeURIComponent('/')}`;
};


/**
 * 判断是否是微信中
 * @return {boolean}
 */
export const isInWechat = (userAgent?: string): boolean => {
  if (userAgent) {
    return /micromessenger/i.test(userAgent.toLowerCase());
  }
  return false;
};

/**
 * 判断是否是移动设备
 * @return {boolean}
 */
export const isMobileDevice = (userAgent?: string): boolean => {
  if (userAgent) {
    return /mobile/i.test(userAgent.toLowerCase());
  }
  return false;
};
