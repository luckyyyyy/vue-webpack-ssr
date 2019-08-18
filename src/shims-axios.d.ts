/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import axios from 'axios';
import { APIRespons } from '@/api';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<APIRespons<T>> {

  }
}
