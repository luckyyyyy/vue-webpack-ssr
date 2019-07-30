/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import { http } from '@/api';

export const login = (phone, code) => http.post('login', { phone, code });
