/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import { MStore } from '@/store';

declare global {
  interface Window {
    __INITIAL_STATE__: MStore;
  }
}
