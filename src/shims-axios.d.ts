/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import axios from 'axios';

interface APIRespons<T = any> {
  data: T;
  success: boolean;
  message: string;
  code: string;
  extend: object;
}

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<APIRespons<T>> {

  }
}
