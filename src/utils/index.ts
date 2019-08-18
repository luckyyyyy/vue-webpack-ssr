/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { AUTH_URL } from '@/config/auth';

export const isDevelop = process.env.NODE_ENV !== 'production';
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
