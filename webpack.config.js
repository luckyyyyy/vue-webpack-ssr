/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const path = require('path');

const fullPath = s => path.join(__dirname, s);

module.exports = {
  clientEntry: fullPath('src/entry/client.ts'),
  serverEntry: fullPath('src/entry/server.ts'), // 一般不需要指定 除非SSR
  proxy: {
    '/api': {
      target: 'http://api.com',
    },
  },
  // autoOpenBrowser: false,
};
