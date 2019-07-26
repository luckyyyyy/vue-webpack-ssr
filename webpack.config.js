/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const path = require('path');

const fullPath = s => path.join(__dirname, s);

module.exports = {
  clientEntry: fullPath('src/entry/client.js'),
  serverEntry: fullPath('src/entry/server.js'), // 一般不需要指定 除非SSR
  proxy: {
    '/api': {
      target: 'http://xland-u.dev.perfma-inc.net',
      changeOrigin: true,
      secure: false,
    },
    '/login': {
      target: 'http://login-u.dev.perfma-inc.net',
      changeOrigin: true,
      secure: false,
    },
  },
  // autoOpenBrowser: false,
};
